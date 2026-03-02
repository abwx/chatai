<template>
  <div class="sidebar-container">
    <!-- 左侧会话列表 -->
    <div class="conversation-list">
      <div
        v-for="(item, index) in conversations"
        :key="index"
        class="conversation-item"
        @click="selectConversation(item)"
      >
        <!-- 模型名称 -->
        <div class="item-model">{{ item.selectedModel }}</div>
        <!-- 会话内容摘要 -->
        <div class="item-content">{{ item.title }}</div>
        <!-- 时间 -->
        <div class="item-time">{{ item.createdAt }}</div>
        <div class="item-time">{{ item.updatedAt }}</div>
      </div>
    </div>

    <!-- 底部按钮区 -->
    <div class="sidebar-footer">
      <Button color="green" @click="handleNewChat">
        <Icon icon="radix-icons:plus" width="15" height="15"></Icon>
        新建聊天
      </Button>
      <Button color="blue" @click="handleConfig">
        <Icon icon="radix-icons:gear" width="15" height="15"></Icon>
        应用配置
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from './Button.vue'
import { useRouter } from 'vue-router'
import { ConversationProps } from '../ts/type'
import { conversations } from '../testData'
const router = useRouter()


// 选中会话
const selectConversation = (item: ConversationProps) => {
  console.log('选中会话:', item)
  // 把会话 id 和模型一起通过路由参数传给右侧 MessageList
  router.push({
    path: '/message',
    query: {
      id: item.id,
      model: item.selectedModel,
    },
  })
  // 这里可以添加切换会话的逻辑，比如把选中的会话内容传递给父组件
}

// 新建聊天
const handleNewChat = () => {
  console.log('新建聊天')
  router.push('/')
  // 这里可以添加新建会话的逻辑
}

// 应用配置
const handleConfig = () => {
  console.log('应用配置')
  router.push('/setting')
  // 这里可以添加打开配置面板的逻辑
}
</script>

<style scoped lang="scss">
.sidebar-container {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e5e5e5;

  .conversation-list {
    flex: 1;
    overflow-y: auto;
    padding: 12px 0;
// 核心：隐藏滚动条但保留滚动功能
  /* Chrome / Safari / Edge / Opera */
  &::-webkit-scrollbar {
    width: 0; /* 隐藏滚动条宽度 */
    height: 0;
  }
  
  /* Firefox */
  scrollbar-width: none;
  
  /* IE / Edge 旧版本 */
  -ms-overflow-style: none;
    .conversation-item {
      padding: 12px 16px;
      cursor: pointer;
      transition: background-color 0.2s;
      border-bottom: 1px solid #eee;

      &:hover {
        background-color: #e8e8e8;
      }

      .item-model {
        font-size: 13px;
        color: #666;
        margin-bottom: 4px;
        font-weight: 500;
      }

      .item-content {
        font-size: 14px;
        color: #333;
        margin-bottom: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .item-time {
        font-size: 12px;
        color: #999;
        text-align: right;
      }
    }
  }

  .sidebar-footer {
    padding: 12px;
    border-top: 1px solid #e5e5e5;
    display: flex;
    gap: 8px;
    justify-content: space-between;

    .footer-btn {
      flex: 1;
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.2s;

      &.primary {
        background-color: #1677ff;
        color: #fff;

        &:hover {
          background-color: #4096ff;
        }
      }

      &:not(.primary) {
        background-color: #fff;
        color: #333;
        border: 1px solid #d9d9d9;

        &:hover {
          background-color: #f5f5f5;
        }
      }
    }
  }
}
</style>