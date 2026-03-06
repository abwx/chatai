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
        v-for="(item, index) in messageStore.sortedMessages"
        :key="index"
        class="message-item"
        :class="item.type === 'question' ? 'message-user' : 'message-assistant'"
      >
        <div class="message-bubble">
          <div class="message-text" v-if="item.status === 'loading'">
          <Icon icon="eos-icons:three-dots-loading"></Icon>
          </div>
          <div class="message-text" v-else>
            <VueMarkdown :source="item.content" />
          </div>
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
import { useMessageStore } from '../stores/message'
import { useConversationStore } from '../stores/conversation'
import dayjs from 'dayjs'
import { Icon } from '@iconify/vue'
import Button from './Button.vue'
import { providers } from '../testData'
import VueMarkdown from 'vue-markdown-render'

const route = useRoute()
const messageStore = useMessageStore()
const conversationStore = useConversationStore()

// 从路由读取当前会话 id 和模型
const currentConversationId = computed(() => Number(route.query.id) || undefined)
const currentModel = computed(() => route.query.model as string | undefined)
const currentTitlle = computed(() => route.query.title as string | undefined)

// 监听会话 ID 变化，加载消息
watch(currentConversationId, async (newId) => {
  if (newId) {
    await messageStore.fetchMessagesByConversation(newId)
    
    // 检查是否有处于 loading 状态的消息，如果有则继续从主进程获取回答
    messageStore.sortedMessages.forEach(msg => {
      if (msg.status === 'loading') {
        startChatStream(msg)
      }
    })

    nextTick(() => {
      scrollToBottom()
    })
  } else {
    messageStore.items = []
  }
}, { immediate: true })

// 调用主进程开始流式对话
const startChatStream = (loadingMsg: MessageProps) => {
  const provider = providers.find(p => p.models.includes(currentModel.value || ''))
  
  // 构造历史消息（使用排序后的消息确保上下文顺序正确）
  const history = messageStore.sortedMessages
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
  window.app.onUpdateMessage(async (payload) => {
    const { messageId, data } = payload
    const index = messageStore.items.findIndex(m => m.id === messageId)
    if (index === -1) return

    if (!data.is_end) {
      // 逐步累加内容，并去掉 loading 状态
      messageStore.items[index].content += data.result
      messageStore.items[index].status = 'streaming'
    } else {
      // 结束流式传输
      const finalContent = messageStore.items[index].content
      const nowStr = new Date().toISOString()
      
      // 使用 store 的更新方法
      await messageStore.updateMessage(messageId, {
        content: finalContent,
        status: 'finished',
        updatedAt: nowStr
      })
      
      // 同时刷新会话列表排序
      await conversationStore.fetchConversations()
    }

    nextTick(() => {
      scrollToBottom()
    })
  })
})

// 输入框内容
const inputText = ref<string>('')

// 消息列表 DOM 引用
const messageListRef = ref<HTMLElement | null>(null)

// 滚动到列表底部
const scrollToBottom = () => {
  const el = messageListRef.value
  if (!el) return
  if (typeof el.scrollTo === 'function') {
    el.scrollTo({
      top: el.scrollHeight,
      behavior: 'smooth'
    })
  } else {
    el.scrollTop = el.scrollHeight
  }
}

// 发送消息
const handleSend = async () => {
  if (!inputText.value.trim() || !currentConversationId.value) return

  const nowStr = new Date().toISOString()
  const content = inputText.value

  // 1. 创建问题消息
  const questionId = await messageStore.createMessage({
    conversationId: currentConversationId.value,
    content: content,
    type: 'question',
    createdAt: nowStr,
    updatedAt: nowStr,
  })
  
  inputText.value = ''
  
  // 2. 创建一个 Loading 状态的回答
  const loadingId = await messageStore.createMessage({
    conversationId: currentConversationId.value,
    content: '',
    type: 'answer',
    status: 'loading',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
  
  const finalLoadingMsg = messageStore.items.find(m => m.id === loadingId)

  // 3. 刷新会话列表以更新排序
  await conversationStore.fetchConversations()

  nextTick(() => {
    scrollToBottom()
  })

  // 4. 开始流式对话
  if (finalLoadingMsg) {
    startChatStream(finalLoadingMsg)
  }
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

    :deep(p) {
      margin-bottom: 8px;
      &:last-child {
        margin-bottom: 0;
      }
    }

    :deep(pre) {
      background-color: #f1f5f9;
      padding: 8px;
      border-radius: 4px;
      overflow-x: auto;
      margin: 8px 0;
    }

    :deep(code) {
      font-family: monospace;
      background-color: rgba(0, 0, 0, 0.05);
      padding: 2px 4px;
      border-radius: 2px;
    }
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
