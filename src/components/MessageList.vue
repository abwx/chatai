<template>
  <div class="chat-content">
    <!-- 表头：展示当前会话信息 -->
    <div class="message-header">
      <div class="header-title">{{ currentTitle || "-" }}</div>
      <div class="header-info">
        <span class="header-item">ID：{{ currentConversationId || "-" }}</span>
        <span class="header-item">模型：{{ currentModel || "-" }}</span>
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
          <div class="message-image" v-if="item.imagePath" @click="previewImageUrl = item.imagePath">
            <img :src="item.imagePath" alt="Uploaded image" />
          </div>
          <div class="message-file" v-if="item.filePath">
            <div class="file-icon">
              <Icon icon="bi:file-earmark-text" width="24" height="24" />
            </div>
            <div class="file-info">
              <div class="file-name">{{ item.fileName || '未知文件' }}</div>
              <div class="file-status">已上传</div>
            </div>
          </div>
          <div class="message-text" v-if="item.status === 'loading'">
            <Icon icon="eos-icons:three-dots-loading"></Icon>
          </div>
          <div
            class="message-text prose prose-sm max-w-none dark:prose-invert"
            v-else
          >
            <VueMarkdown
              :source="formatMarkdownContent(item.content)"
              :options="markdownOptions"
              :plugins="mdPlugins"
            />
          </div>
          <div class="message-time" v-if="item.createdAt">
            {{ dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
          </div>
        </div>
      </div>
    </div>

    <!-- 底部输入框（和截图一致） -->
    <div class="input-container">
      <!-- 图片预览区域 -->
      <div v-if="selectedImage" class="selected-image-preview">
        <img
          :src="selectedImage.path"
          alt="Preview"
          @click="previewImageUrl = selectedImage.path"
        />
        <div class="remove-image" @click="selectedImage = null">
          <Icon icon="radix-icons:cross-2" />
        </div>
      </div>
      <!-- 文件预览区域 -->
      <div v-if="selectedFile" class="selected-file-preview">
        <div class="file-icon">
          <Icon icon="bi:file-earmark-text" width="24" height="24" />
        </div>
        <div class="file-info">
          <div class="file-name">{{ selectedFile.fileName }}</div>
          <div class="file-size">{{ (selectedFile.size / 1024).toFixed(1) }} KB</div>
        </div>
        <div class="remove-file" @click="selectedFile = null">
          <Icon icon="radix-icons:cross-2" />
        </div>
      </div>
      <div class="input-wrapper">
        <button class="image-upload-btn" @click="handleSelectImage" title="上传图片">
          <Icon icon="radix-icons:image" width="20" height="20" />
        </button>
        <button class="file-upload-btn" @click="handleSelectFile" title="上传文件">
          <Icon icon="radix-icons:file" width="20" height="20" />
        </button>
        <input
          v-model="inputText"
          type="text"
          placeholder=""
          class="chat-input"
          @keydown.enter="handleSend"
        />
        <Button v-if="isStreaming" color="red" @click="handleStop"
          >停止回答</Button
        >
        <Button v-else color="green" @click="handleSend">发送</Button>
      </div>
    </div>

    <!-- 图片大图预览遮罩层 -->
    <div
      v-if="previewImageUrl"
      class="image-viewer-overlay"
      @click="previewImageUrl = null"
    >
      <div class="image-viewer-content">
        <img :src="previewImageUrl" alt="Full Preview" />
        <div class="close-viewer">
          <Icon icon="radix-icons:cross-2" width="24" height="24" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MessageProps } from "../ts/type";
import { ref, nextTick, computed, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useMessageStore } from "../stores/message";
import { useConversationStore } from "../stores/conversation";
import dayjs from "dayjs";
import { Icon } from "@iconify/vue";
import Button from "./Button.vue";
import { providers } from "../testData";
import VueMarkdown from "vue-markdown-render";
import MarkdownItAnchor from "markdown-it-anchor";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

/**
 * 格式化内容，处理一些 LLM 常见的 Markdown 格式问题
 */
const formatMarkdownContent = (content: string) => {
  if (!content) return "";
  let formatted = content.replace(/([^\n])\s*```/g, "$1\n\n```");
  formatted = formatted.replace(/```\s*([^\n])/g, "```\n\n$1");
  formatted = formatted.replace(/^(#{1,6})([^\s#\n])/gm, "$1 $2");
  return formatted;
};

const route = useRoute();
const messageStore = useMessageStore();
const conversationStore = useConversationStore();

// Markdown 渲染配置
const markdownOptions = {
  html: false,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: (str: string, lang: string) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        // 使用 hljs 渲染，并手动包装在必要的类名中
        const highlighted = hljs.highlight(str, { language: lang }).value;
        return `<pre class="hljs"><code>${highlighted}</code></pre>`;
      } catch (__) {}
    }
    return ""; // 使用默认转义
  },
};
// Markdown 插件配置（核心！）
const mdPlugins = [MarkdownItAnchor];
// 从路由读取当前会话 id 和模型
const currentConversationId = computed(
  () => Number(route.query.id) || undefined,
);
const currentModel = computed(() => route.query.model as string | undefined);
const currentTitle = computed(() => {
  const title = route.query.title;
  return Array.isArray(title) ? title[0] : (title as string | undefined);
});

// 监听会话 ID 变化，加载消息
watch(
  currentConversationId,
  async (newId) => {
    if (newId) {
      await messageStore.fetchMessagesByConversation(newId);

      // 获取当前主进程中正在活跃的请求 ID 列表
      const activeIds = await window.app.getActiveChatIds();

      // 检查是否有处于 loading 状态的消息
      messageStore.sortedMessages.forEach((msg) => {
        if (msg.status === "loading") {
          // 只有当该消息 ID 不在活跃列表中时，才发起新请求
          if (!activeIds.includes(msg.id)) {
            startChatStream(msg);
          } else {
            // 如果已经在活跃列表中，说明后台正在生成，我们将状态改为 streaming
            // 这样前端界面就能正确显示停止按钮，并等待数据推送
            msg.status = "streaming";
          }
        }
      });

      nextTick(() => {
        scrollToBottom();
      });
    } else {
      messageStore.items = [];
    }
  },
  { immediate: true },
);

// 调用主进程开始流式对话
const startChatStream = (loadingMsg: MessageProps) => {
  const provider = providers.find((p) =>
    p.models.includes(currentModel.value || ""),
  );

  // 构造历史消息（使用排序后的消息确保上下文顺序正确）
  const history = messageStore.sortedMessages
    .filter((m) => m.id !== loadingMsg.id && m.status !== "loading")
    .map((m) => ({
      role: m.type === "question" ? "user" : "assistant",
      content: m.content,
      imagePath: m.imagePath, // 包含图片
    }));

  // 发起 IPC 请求
  window.app.startChat({
    providerName: provider?.name || "qianfan",
    selectedModel: currentModel.value || "",
    messageId: loadingMsg.id,
    messages: history,
  });
};

// 监听主进程的消息推送
let unmountChat: (() => void) | null = null;
onMounted(() => {
  unmountChat = window.app.onUpdateMessage(async (payload) => {
    const { messageId, data } = payload;
    const index = messageStore.items.findIndex((m) => m.id === messageId);
    if (index === -1) return;

    if (!data.is_end) {
      // 逐步累加内容，并去掉 loading 状态
      messageStore.items[index].content += data.result;
      messageStore.items[index].status = "streaming";
    } else {
      // 结束流式传输
      const finalContent = messageStore.items[index].content;
      const nowStr = new Date().toISOString();

      // 使用 store 的更新方法
      await messageStore.updateMessage(messageId, {
        content: finalContent,
        status: "finished",
        updatedAt: nowStr,
      });

      // 同时刷新会话列表排序
      await conversationStore.fetchConversations();
    }

    nextTick(() => {
      scrollToBottom();
    });
  });
});

onUnmounted(() => {
  if (unmountChat) unmountChat();
});

// 输入框内容
const inputText = ref<string>("");

// 选中的图片
const selectedImage = ref<{ path: string; fileName: string } | null>(null);

// 选中的文件
const selectedFile = ref<{ path: string; fileName: string; size: number } | null>(null);

// 大图预览 URL
const previewImageUrl = ref<string | null>(null);

// 是否正在流式输出
const isStreaming = computed(() => {
  return messageStore.items.some(
    (m) => m.status === "loading" || m.status === "streaming",
  );
});

// 选择图片
const handleSelectImage = async () => {
  const result = await window.app.selectImage();
  if (result) {
    selectedImage.value = result;
    selectedFile.value = null; // 互斥选择，一次只能发一种附件（可选）
  }
};

// 选择文件
const handleSelectFile = async () => {
  const result = await window.app.selectFile();
  if (result) {
    selectedFile.value = result;
    selectedImage.value = null; // 互斥选择
  }
};

// 消息列表 DOM 引用
const messageListRef = ref<HTMLElement | null>(null);

// 滚动到列表底部
const scrollToBottom = () => {
  const el = messageListRef.value;
  if (!el) return;
  if (typeof el.scrollTo === "function") {
    el.scrollTo({
      top: el.scrollHeight,
      behavior: "smooth",
    });
  } else {
    el.scrollTop = el.scrollHeight;
  }
};

// 发送消息
const handleSend = async () => {
  if (
    (!inputText.value.trim() && !selectedImage.value && !selectedFile.value) ||
    !currentConversationId.value
  )
    return;

  const nowStr = new Date().toISOString();
  const content = inputText.value;
  // 存储本地文件协议路径
  const imagePath = selectedImage.value?.path; 
  const filePath = selectedFile.value?.path;
  const fileName = selectedFile.value?.fileName;

  // 1. 创建问题消息
  const questionId = await messageStore.createMessage({
    conversationId: currentConversationId.value,
    content: content,
    type: "question",
    imagePath: imagePath,
    filePath: filePath,
    fileName: fileName,
    createdAt: nowStr,
    updatedAt: nowStr,
  });

  inputText.value = "";
  selectedImage.value = null; 
  selectedFile.value = null; // 清除选中

  // 2. 创建一个 Loading 状态的回答
  const loadingId = await messageStore.createMessage({
    conversationId: currentConversationId.value,
    content: "",
    type: "answer",
    status: "loading",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const finalLoadingMsg = messageStore.items.find((m) => m.id === loadingId);

  // 3. 刷新会话列表以更新排序
  await conversationStore.fetchConversations();

  nextTick(() => {
    scrollToBottom();
  });

  // 4. 开始流式对话
  if (finalLoadingMsg) {
    startChatStream(finalLoadingMsg);
  }
};

// 停止回答
const handleStop = async () => {
  const activeMsg = messageStore.items.find(
    (m) => m.status === "loading" || m.status === "streaming",
  );
  if (activeMsg) {
    // 1. 通知主进程停止对话
    window.app.stopChat(activeMsg.id);

    // 2. 根据当前状态决定是删除还是保留内容
    if (activeMsg.status === "loading") {
      // 如果还没开始说话，直接删除该回答
      await messageStore.deleteMessage(activeMsg.id);
    } else {
      // 如果已经说了一半了，则停止生成，保留现有内容并标记为结束
      await messageStore.updateMessage(activeMsg.id, {
        status: "finished",
        updatedAt: new Date().toISOString(),
      });
    }

    // 3. 同时刷新会话列表摘要
    await conversationStore.fetchConversations();
  }
};
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
  max-width: 85%;
  margin-bottom: 4px;

  // 用户消息：右侧对齐，深色气泡
  &.message-user {
    align-self: flex-end;
    justify-content: flex-end;

    .message-bubble {
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 18px 18px 2px 18px;
    }

    .message-time {
      text-align: right;
      color: #94a3b8;
    }

    .message-text {
      color: white;
    }
  }

  // 助手消息：左侧对齐，白色气泡
  &.message-assistant {
    align-self: flex-start;
    justify-content: flex-start;

    .message-bubble {
      background-color: white;
      color: #1e293b;
      border: 1px solid #e2e8f0;
      border-radius: 18px 18px 18px 2px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }
  }
}

/* 消息气泡 */
.message-bubble {
    padding: 12px 20px;
    word-break: break-word;
    line-height: 1.6;

    .message-image {
      margin-bottom: 8px;
      cursor: zoom-in;
      img {
        max-width: 100%;
        max-height: 300px;
        border-radius: 8px;
        object-fit: contain;
        transition: opacity 0.2s;

        &:hover {
          opacity: 0.9;
        }
      }
    }

    .message-file {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      margin-bottom: 8px;
      width: 240px;

      .file-icon {
        color: #3b82f6;
      }

      .file-info {
        flex: 1;
        min-width: 0;
        .file-name {
          font-size: 14px;
          font-weight: 500;
          color: #1e293b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .file-status {
          font-size: 12px;
          color: #64748b;
        }
      }
    }
  }

/* 消息文本 */
.message-text {
  word-break: break-all;
  color: inherit;
  font-size: 15px;

  :deep(pre) {
    padding: 0 !important;
    background: #1e1e1e !important;
    margin: 1em 0;
    border-radius: 8px;
    overflow: hidden;
  }

  :deep(pre code.hljs) {
    padding: 1.25em;
    display: block;
    overflow-x: auto;
    font-size: 13px;
    line-height: 1.5;
  }

  :deep(code:not(.hljs)) {
    background-color: rgba(0, 0, 0, 0.08);
    color: #e11d48;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.9em;
    font-family:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }

  &.prose {
    // 覆盖 tailwind typography 的一些默认边距
    :deep(p) {
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    }
    :deep(ul),
    :deep(ol) {
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    }
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
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px;
  background-color: #fff;
  border-top: 1px solid #e5e5e5;

  .selected-image-preview {
    position: relative;
    width: 100px;
    height: 100px;
    margin-bottom: 8px;
    cursor: zoom-in;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
      border: 1px solid #e5e5e5;
    }

    &:hover img {
      opacity: 0.9;
    }

    .remove-image {
      position: absolute;
      top: -6px;
      right: -6px;
      width: 20px;
      height: 20px;
      background: #ef4444;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 12px;
    }
  }

  .selected-file-preview {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    margin-bottom: 8px;
    position: relative;

    .file-icon {
      color: #64748b;
    }

    .file-info {
      flex: 1;
      min-width: 0;
      .file-name {
        font-size: 13px;
        font-weight: 500;
        color: #334155;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .file-size {
        font-size: 11px;
        color: #94a3b8;
      }
    }

    .remove-file {
      width: 20px;
      height: 20px;
      color: #94a3b8;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s;

      &:hover {
        color: #ef4444;
      }
    }
  }

  .input-wrapper {
    display: flex;
    gap: 8px;
    align-items: center;
  }
}

.image-upload-btn,
.file-upload-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f5f9;
    color: #1e293b;
  }
}

.chat-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3b82f6;
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

/* 大图查看器样式 */
.image-viewer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: zoom-out;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease-out;

  .image-viewer-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 100%;
      max-height: 90vh;
      object-fit: contain;
      border-radius: 4px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
      animation: scaleUp 0.2s ease-out;
    }

    .close-viewer {
      position: absolute;
      top: -40px;
      right: -40px;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
      }
    }
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleUp {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>
