<template>
  <div class="chat-content">
    <!-- 表头：展示当前会话信息 -->
    <div class="message-header">
      <div class="header-title">当前会话</div>
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
          <div class="message-text">{{ item.content }}</div>
          <div class="message-time" v-if="item.createdAt">{{ item.createdAt }}</div>
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
import { ref, nextTick, computed } from 'vue'
import { useRoute } from 'vue-router'
import { messages } from '../testData'
  import Button from './Button.vue'
  const route = useRoute()

  // 从路由读取当前会话 id 和模型（来自 ConversationList 的点击）
  const currentConversationId = computed(() => route.query.id as string | undefined)
  const currentModel = computed(() => route.query.model as string | undefined)

  // 模拟消息列表数据（和截图完全一致）
  
  // 输入框内容
  const inputText = ref<string>('')

  // 时间格式化：2026-02-25 08:30:09
  const formatDateTime = (date: Date) => {
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`)
    const year = date.getFullYear()
    const month = pad(date.getMonth() + 1)
    const day = pad(date.getDate())
    const hour = pad(date.getHours())
    const minute = pad(date.getMinutes())
    const second = pad(date.getSeconds())
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }

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
  const handleSend = () => {
    if (!inputText.value.trim()) return

    const now = new Date()
    const nowStr = formatDateTime(now)

    // 添加新消息到列表
    messages.push({
      type: 'question',
      content: inputText.value,
      createdAt: nowStr,
      id: messages.length + 1,
      conversationId: 1,
      updatedAt: nowStr,
    })
    inputText.value = ''

    // 等 DOM 更新后再滚动到底部
    nextTick(() => {
      scrollToBottom()
    })
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
    color: #333;
    margin-bottom: 4px;
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