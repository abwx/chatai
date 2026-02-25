<template>
  <div class="chat-container">
    <!-- 顶部下拉选择器 - 严格遵循 Radix Vue 官方格式 -->
    <DropdownMenuRoot>
      <!-- 触发器 -->
      <DropdownMenuTrigger as-child>
        <div class="model-selector">
          <span>{{ selectedModel || '选择模型' }}</span>
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
          <DropdownMenuLabel class="dropdown-label">模型选择</DropdownMenuLabel>
          
          <!-- 分隔线 -->
          <DropdownMenuSeparator class="dropdown-separator" />
          
          <!-- 模型选项组 -->
          <DropdownMenuGroup>
            <DropdownMenuItem 
              v-for="model in modelList" 
              :key="model.value"
              class="dropdown-item"
              :class="{ 'dropdown-item--active': selectedModel === model.label }"
              @select="() => selectModel(model.value)"
            >
              {{ model.label }}
              <!-- 选中项指示器 -->
              <DropdownMenuItemIndicator v-if="selectedModel === model.label">
                <Icon icon="radix-icons:check" width="14" height="14"></Icon>
              </DropdownMenuItemIndicator>
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
import { ref } from 'vue'
import Button from './Button.vue'
// 严格按照你提供的 Radix Vue 导入格式
import {
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from 'radix-vue'

// 模型列表数据
const modelList = [
  { label: '文心一言', value: 'wenxin' },
  { label: 'ERNIE-4.0-8K', value: 'ernie-4' },
  { label: 'ERNIE-3.5-8K', value: 'ernie-3.5' },
  { label: 'ERNIE-Speed-8K', value: 'ernie-speed' },
]

// 响应式数据
const selectedModel = ref<string>('')
const inputText = ref<string>('')
const hasChatHistory = ref<boolean>(false)

// 选择模型
const selectModel = (value: string) => {
  const targetModel = modelList.find((m) => m.value === value)
  if (targetModel) {
    selectedModel.value = targetModel.label
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
  justify-content: space-between;
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
</style>