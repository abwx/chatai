<template>
  <div class="chat-container">
    <!-- 顶部下拉选择器 - 严格遵循 Radix Vue 官方格式 -->
    <DropdownMenuRoot>
      <!-- 触发器 -->
      <DropdownMenuTrigger as-child>
        <div class="model-selector">
          <div class="selector-left">
            <img
              v-if="selectedProvider?.avatar"
              class="provider-avatar"
              :src="selectedProvider.avatar"
              :alt="selectedProvider.title || selectedProvider.name"
              loading="lazy"
              referrerpolicy="no-referrer"
            />
            <div class="selector-text">
              <div class="selector-title">
                {{ selectedProvider?.title || '选择服务商' }}
              </div>
              <div class="selector-desc">
                {{ selectedModel || selectedProvider?.desc || '请选择模型' }}
              </div>
            </div>
          </div>
          <!-- 下拉箭头图标 -->
          <Icon icon="radix-icons:chevron-down" width="15" height="15" style="display: flex; align-items: center; justify-self: flex-end"></Icon>  
        </div>
      </DropdownMenuTrigger>

      <!-- 下拉内容容器（包含 Portal 官方推荐写法） -->
      <DropdownMenuPortal>
        <DropdownMenuContent 
          class="dropdown-content" 
          side="bottom" 
          align="start"
          :avoid-collisions="true"
          :side-offset="4"
        >
          <!-- 下拉菜单标题 -->
          <DropdownMenuLabel class="dropdown-label">服务商选择</DropdownMenuLabel>
          
          <!-- 分隔线 -->
          <DropdownMenuSeparator class="dropdown-separator" />
          
          <!-- 模型选项组 -->
          <template v-for="provider in providerStore.items" :key="provider.id">
            <DropdownMenuLabel class="dropdown-label provider-header">
              <img
                v-if="provider.avatar"
                class="provider-avatar-mini"
                :src="provider.avatar"
                :alt="provider.title"
              />
              <span class="provider-title-text">{{ provider.title }}</span>
            </DropdownMenuLabel>
            
            <DropdownMenuItem 
              v-for="modelName in provider.models" 
              :key="modelName"
              class="dropdown-item"
              :class="{ 'dropdown-item--active': selectedModel === modelName }"
              @select="() => selectModel(modelName)"
            >
              <div class="model-item-content">
                {{ modelName }}
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator class="dropdown-separator" />
          </template>

        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>

    <!-- 中间聊天内容区（可滚动） -->
    <div class="chat-content">
      <div class="chat-placeholder" v-if="!hasChatHistory">
        <p>请选择模型并输入问题开始对话</p>
      </div>
    </div>

    <!-- 底部输入框 -->
    <div class="input-container">
      <!-- 图片预览区域 -->
      <div v-if="selectedImage" class="selected-image-preview">
        <img
          :src="selectedImage.path"
          alt="Preview"
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
          placeholder="请输入内容"
          class="chat-input"
          @keydown.enter="handleSend"
        />
        <Button color="green" @click="handleSend" :disabled="(!inputText.trim() && !selectedImage && !selectedFile) || !selectedModel">
          <Icon icon="radix-icons:paper-plane" width="15" height="15"></Icon>
          发送问题
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Button from './Button.vue'
import { useRouter } from 'vue-router'
import { useConversationStore } from '../stores/conversation'
import { useMessageStore } from '../stores/message'
import { useProviderStore } from '../stores/provider'
// 严格按照你提供的 Radix Vue 导入格式
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'radix-vue'
import { initProviders } from '../db'

// 响应式数据
const selectedModel = ref<string>('')
const router = useRouter()  
const inputText = ref<string>('')
const hasChatHistory = ref<boolean>(false)

// 选中的附件
const selectedImage = ref<{ path: string; fileName: string } | null>(null)
const selectedFile = ref<{ path: string; fileName: string; size: number } | null>(null)

const conversationStore = useConversationStore()
const messageStore = useMessageStore()
const providerStore = useProviderStore()

// 查找当前选中模型所属的服务商
const selectedProvider = computed(() => {
  return providerStore.items.find(p => p.models.includes(selectedModel.value))
})

// 选择模型
const selectModel = (modelName: string) => {
  selectedModel.value = modelName
  hasChatHistory.value = false // 切换模型清空聊天状态
}

// 选择图片
const handleSelectImage = async () => {
  const result = await (window as any).app.selectImage()
  if (result) {
    selectedImage.value = result
    selectedFile.value = null
  }
}

// 选择文件
const handleSelectFile = async () => {
  const result = await (window as any).app.selectFile()
  if (result) {
    selectedFile.value = result
    selectedImage.value = null
  }
}

// 发送消息
const handleSend = async () => {
  console.log('发送消息:', inputText.value, '使用模型:', selectedModel.value)
  if ((!inputText.value.trim() && !selectedImage.value && !selectedFile.value) || !selectedModel.value) return
  
  const provider = providerStore.items.find(p => p.models.includes(selectedModel.value))
  const nowStr = new Date().toISOString()

  // 1. 创建会话
  const conversationId = await conversationStore.createConversation({
    providerId: provider?.id || 1,
    selectedModel: selectedModel.value,
    title: inputText.value || (selectedImage.value ? '[图片]' : '[文件]'),
    createdAt: nowStr,
    updatedAt: nowStr,
  })
  
  // 2. 向数据库添加第一条问题消息
  await messageStore.createMessage({
    conversationId: conversationId as number,
    content: inputText.value,
    type: 'question',
    imagePath: selectedImage.value?.path,
    filePath: selectedFile.value?.path,
    fileName: selectedFile.value?.fileName,
    createdAt: nowStr,
    updatedAt: nowStr,
  })

  // 3. 添加一条初始的 Loading 回答消息
  await messageStore.createMessage({
    conversationId: conversationId as number,
    content: '',
    type: 'answer',
    status: 'loading',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  hasChatHistory.value = true
  const messageContent = inputText.value
  inputText.value = ''
  
  router.push({
    path: '/message',
    query: {
      id: conversationId,
      model: selectedModel.value,
      title: messageContent || (selectedImage.value ? '[图片]' : '[文件]'),
    },
  })
}

onMounted(async () => {
  await initProviders()
  await providerStore.fetchProviders()
  // 默认选中第一个服务商的第一个模型
  if (providerStore.items.length > 0 && providerStore.items[0].models.length > 0) {
    selectedModel.value = providerStore.items[0].models[0]
  }
})
</script>

<style scoped lang="scss">
.chat-container {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: #fff;
  box-sizing: border-box;
}

/* 顶部模型选择器 */
.model-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 280px;
  padding: 8px 12px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  cursor: pointer;
  background-color: #fff;
  transition: all 0.2s ease;
  color: #333;
  gap: 10px;

  &:hover {
    border-color: #1677ff;
    background-color: #f8f9ff;
  }

  svg {
    color: #666;
    transition: color 0.2s;
    flex-shrink: 0;
  }

  &:hover svg {
    color: #1677ff;
  }
}

.selector-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.selector-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.selector-title {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.selector-desc {
  margin-top: 2px;
  font-size: 12px;
  color: #6b7280;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.provider-avatar {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid #eef2f7;
  background: #f8fafc;
  flex-shrink: 0;
}

/* Radix Vue 组件样式（使用 :deep 穿透） */
:deep(.dropdown-content) {
  width: 280px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  z-index: 1000;
  animation: slideDown 0.2s ease-out;
  overflow-y: auto;
  max-height: 400px;

  /* 隐藏滚动条但保留滚动功能 */
  /* Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }
  /* Firefox */
  scrollbar-width: none;
  /* IE and Edge */
  -ms-overflow-style: none;
}

:deep(.dropdown-label) {
  padding: 8px 12px 4px;
  font-size: 11px;
  color: #999;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.provider-header {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #fafafa;
  margin-top: 4px;
}

.provider-avatar-mini {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  object-fit: cover;
}

.provider-title-text {
  flex: 1;
}

.model-item-content {
  padding-left: 20px;
  font-size: 13px;
}

:deep(.dropdown-separator) {
  margin: 4px 0;
  border-top: 1px solid #f0f0f0;
  &:last-child {
    display: none;
  }
}

:deep(.dropdown-item) {
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: none;
  outline: none;

  &:hover,
  &[data-highlighted] {
    background-color: #f5f5f5;
    color: #1677ff;
  }

  &.dropdown-item--active {
    background-color: #e8f3ff;
    color: #1677ff;
    font-weight: 500;
  }
}

:deep(.dropdown-sub-trigger) {
  padding: 8px 12px;
  font-size: 14px;
  color: #333;
  width: 100%;
  text-align: left;
  border: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
    color: #1677ff;
  }
}

:deep(.dropdown-sub-content) {
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
}

:deep(.dropdown-arrow) {
  fill: #fff;
}

/* 中间聊天内容区 */
.chat-content {
  flex: 1;
  margin: 16px 0;
  overflow-y: auto;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #f0f0f0;
}

.chat-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
  font-size: 14px;
}

/* 底部输入框 */
.input-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px;
  background-color: #fff;
  border-top: 1px solid #e5e5e5;
  margin-top: auto;

  .selected-image-preview {
    position: relative;
    width: 100px;
    height: 100px;
    margin-bottom: 8px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
      border: 1px solid #e5e5e5;
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
      width: 20px;      height: 20px;
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

/* 下拉菜单展开动画 */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Provider 下拉项内容（基于 testData.ts 的字段展示） */
.provider-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-width: 0;
}

.provider-meta {
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
}

.provider-title {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  line-height: 1.2;
}

.provider-desc {
  margin-top: 2px;
  font-size: 12px;
  color: #6b7280;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  overflow: hidden;
}

.provider-models {
  margin-top: 3px;
  font-size: 12px;
  color: #9ca3af;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>