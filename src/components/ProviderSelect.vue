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
              <div class="selector-desc" v-if="selectedProvider?.desc">
                {{ selectedProvider.desc }}
              </div>
            </div>
          </div>
          <!-- 下拉箭头图标 -->
          <Icon icon="radix-icons:chevron-down" width="15" height="15"></Icon>
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
          <DropdownMenuGroup>
            <DropdownMenuItem 
              v-for="model in providers" 
              :key="model.id"
              class="dropdown-item"
              :class="{ 'dropdown-item--active': selectedModel === model.name }"
              @select="() => selectModel(model.name)"
            >
              <div class="provider-item">
                <img
                  v-if="model.avatar"
                  class="provider-avatar"
                  :src="model.avatar"
                  :alt="model.title || model.name"
                  loading="lazy"
                  referrerpolicy="no-referrer"
                />
                <div class="provider-meta">
                  <div class="provider-title">{{ model.title }}</div>
                  <div class="provider-desc" v-if="model.desc">{{ model.desc }}</div>
                  <div class="provider-models" v-if="model.models?.length">
                    {{ model.models.slice(0, 3).join(' / ') }}<span v-if="model.models.length > 3"> ...</span>
                  </div>
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>

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
      <input
        v-model="inputText"
        type="text"
        placeholder="请输入内容"
        class="chat-input"
        @keydown.enter="handleSend"
      />
      <Button color="green" @click="handleSend" :disabled="!inputText.trim() || !selectedModel">
        <Icon icon="radix-icons:paper-plane" width="15" height="15"></Icon>
        发送
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Button from './Button.vue'
import { providers } from '../testData'
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
import { db } from '../db'
// 模型列表数据


// 响应式数据
const selectedModel = ref<string>('')
const inputText = ref<string>('')
const hasChatHistory = ref<boolean>(false)

const selectedProvider = computed(() => providers.find((p) => p.name === selectedModel.value))

// 选择模型
const selectModel = (value: string) => {
  const targetModel = providers.find((m) => m.name === value)
  if (targetModel) {
    selectedModel.value = targetModel.name
    hasChatHistory.value = false // 切换模型清空聊天状态
  }
}

// 发送消息
const handleSend = () => {
  if (!inputText.value.trim() || !selectedModel.value) return
  
  console.log('发送消息:', inputText.value, '使用模型:', selectedModel.value)
  hasChatHistory.value = true
  inputText.value = ''
}
async function initData() {
  await db.providers.bulkAdd(providers)
}
onMounted(() => {
  initData()
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
  justify-content: flex-start;
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
}

:deep(.dropdown-label) {
  padding: 0 12px 4px;
  font-size: 12px;
  color: #999;
  font-weight: 500;
}

:deep(.dropdown-separator) {
  margin: 4px 0;
  border-top: 1px solid #f0f0f0;
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
  gap: 8px;
  align-items: center;
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
    box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.1);
  }
}

.send-btn {
  padding: 10px 20px;
  background-color: #1677ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 14px;

  &:hover:not(:disabled) {
    background-color: #4096ff;
  }

  &:disabled {
    background-color: #c9c9c9;
    cursor: not-allowed;
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