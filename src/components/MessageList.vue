<template>
  <div class="chat-content">
    <!-- 表头：展示当前会话信息 -->
    <div class="message-header">
      <div class="header-title">{{ currentTitlle|| '-' }}</div>
      <div class="header-info">
        <span class="header-item">ID：{{ currentConversationId || '-' }}</span>
        <span class="header-item">模型：{{ currentModel || '-' }}</span>
      </div>
    </div>

    <!-- 消息列表 -->
    <div class="message-list" ref="messageListRef">
      <div
        v-for="(item, index) in messages"
        :key="index"
        class="message-item"
        :class="item.type === 'question' ? 'message-user' : 'message-assistant'"
      >
        <div class="message-bubble">
          <div class="message-text" v-if="item.status === 'loading'">
          <Icon icon="eos-icons:three-dots-loading"></Icon>
          </div>
          <div class="message-text" v-else>{{ item.content }}</div>
          <div class="message-time" v-if="item.createdAt">{{ dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
        </div>
      </div>
    </div>

    <!-- 底部输入框（和截图一致） -->
    <div class="input-container">
      <input
        v-model="inputText"
        type="text"
        placeholder="总结一下我前面几个问题，生成一个摘要"
        class="chat-input"
        @keydown.enter="handleSend"
      />
      <Button color="green" @click="handleSend">发送</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { MessageProps } from '../ts/type'
import { ref, nextTick, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '../db'
import dayjs from 'dayjs'
import { Icon } from '@iconify/vue'
import Button from './Button.vue'
import { providers } from '../testData'
  const route = useRoute()

  // 从路由读取当前会话 id 和模型（来自 ConversationList 的点击）
  const currentConversationId = computed(() => Number(route.query.id) || undefined)
  const currentModel = computed(() => route.query.model as string | undefined)
  const currentTitlle =computed(()=>route.query.title as string | undefined)

  // 消息列表数据
  const messages = ref<MessageProps[]>([])

  // 检查是否有处于 loading 状态的消息，如果有则继续从主进程获取回答
  const fetchMessages = async (id: number) => {
    const data = await db.messages.where('conversationId').equals(id).toArray()
    messages.value = data.sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
    
    // 检查是否有处于 loading 状态的消息，如果有则继续从主进程获取回答
    messages.value.forEach(msg => {
      if (msg.status === 'loading') {
        startChatStream(msg)
      }
    })

    nextTick(() => {
      scrollToBottom()
    })
  }

  // 调用主进程开始流式对话
  const startChatStream = (loadingMsg: MessageProps) => {
    const provider = providers.find(p => p.models.includes(currentModel.value || ''))
    
    // 构造历史消息
    const history = messages.value
      .filter(m => m.id !== loadingMsg.id && m.status !== 'loading')
      .map(m => ({
        role: m.type === 'question' ? 'user' : 'assistant',
        content: m.content
      }))

    // 发起 IPC 请求
    window.app.startChat({
      providerName: provider?.name || 'qianfan',
      selectedModel: currentModel.value || '',
      messageId: loadingMsg.id,
      messages: history,
    })
  }

  // 监听主进程的消息推送
  onMounted(() => {
    window.app.onUpdateMessage((payload) => {
      const { messageId, data } = payload
      const index = messages.value.findIndex(m => m.id === messageId)
      if (index === -1) return

      if (!data.is_end) {
        // 逐步累加内容，并去掉 loading 状态
        messages.value[index].content += data.result
        messages.value[index].status = 'streaming' as any
      } else {
        // 结束流式传输
        messages.value[index].status = 'finished'
        
        // 持久化到数据库
        db.messages.update(messageId, {
          content: messages.value[index].content,
          status: 'finished',
          updatedAt: new Date().toISOString()
        })
      }

      nextTick(() => {
        scrollToBottom()
      })
    })
  })

  // 监听会话 ID 变化
  watch(currentConversationId, (newId) => {
    if (newId) {
      fetchMessages(newId)
    } else {
      messages.value = []
    }
  }, { immediate: true })

  // 输入框内容
  const inputText = ref<string>('')

  // 消息列表 DOM 引用
  const messageListRef = ref<HTMLElement | null>(null)

  // 滚动到列表底部（带平滑动画）
  const scrollToBottom = () => {
    const el = messageListRef.value
    if (!el) return

    // 优先使用原生平滑滚动
    if (typeof el.scrollTo === 'function') {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth'
      })
    } else {
      // 兼容不支持 scrollTo 的情况
      el.scrollTop = el.scrollHeight
    }
  }

  // 发送消息
  const handleSend = async () => {
    if (!inputText.value.trim() || !currentConversationId.value) return

    const nowStr = new Date().toISOString()
    const content = inputText.value

    // 1. 创建问题消息并存入数据库
    const questionMessage = {
      conversationId: currentConversationId.value,
      content: content,
      type: 'question' as const,
      createdAt: nowStr,
      updatedAt: nowStr,
    }
    const questionId = await db.messages.add(questionMessage)
    messages.value.push({ ...questionMessage, id: questionId as number })
    
    inputText.value = ''
    
    // 2. 创建一个 Loading 状态的回答并存入数据库
    const loadingMessage = {
      conversationId: currentConversationId.value,
      content: '',
      type: 'answer' as const,
      status: 'loading' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const loadingId = await db.messages.add(loadingMessage)
    const finalLoadingMsg = { ...loadingMessage, id: loadingId as number }
    messages.value.push(finalLoadingMsg)

    // 3. 更新会话时间
    await db.conversations.update(currentConversationId.value, {
      updatedAt: nowStr
    })

    nextTick(() => {
      scrollToBottom()
    })

    // 4. 开始流式对话
    startChatStream(finalLoadingMsg)
  }
</script>
  
  <style scoped lang="scss">
  .chat-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px;
    background-color: #f9f9f9;
  }

  /* 顶部表头 */
  .message-header {
    padding: 8px 12px 12px;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 8px;

    .header-title {
      font-size: 14px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 4px;
    }

    .header-info {
      display: flex;
      gap: 16px;
      font-size: 12px;
      color: #6b7280;

      .header-item {
        white-space: nowrap;
      }
    }
  }
  
  /* 消息列表 */
  .message-list {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  
    // 隐藏滚动条（可选，和之前一致）
    &::-webkit-scrollbar {
      width: 0;
    }
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  /* 消息项通用样式 */
  .message-item {
    display: flex;
    max-width: 70%;
  
    // 用户消息：右侧对齐，绿色气泡
    &.message-user {
      align-self: flex-end;
      justify-content: flex-end;
  
      .message-bubble {
        background-color: #d9f7e9;
        border: 1px solid #b2e8d2;
      }
  
      .message-time {
        text-align: right;
      }
    }
  
    // 助手消息：左侧对齐，灰色气泡
    &.message-assistant {
      align-self: flex-start;
      justify-content: flex-start;
  
      .message-bubble {
        background-color: #e5e7eb;
        border: 1px solid #d1d5db;
      }
    }
  }
  
  /* 消息气泡 */
  .message-bubble {
    padding: 12px 16px;
    border-radius: 8px;
    word-break: break-word;
    line-height: 1.5;
  }
  
  /* 消息文本 */
  .message-text {
    font-size: 14px;
    line-height: 1.5;
    word-break: break-all;
  }



  /* 消息时间 */
  .message-time {
    font-size: 12px;
    color: #666;
  }
  
  /* 底部输入框 */
  .input-container {
    display: flex;
    gap: 8px;
    align-items: center;
    padding-top: 16px;
    border-top: 1px solid #e5e5e5;
  }
  
  .chat-input {
    flex: 1;
    padding: 10px 12px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
  
    &:focus {
      border-color: #1677ff;
    }
  }
  
  .send-btn {
    padding: 10px 20px;
    background-color: #4f46e5; // 紫色按钮，和截图一致
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  
    &:hover {
      background-color: #4338ca;
    }
  }
  </style>