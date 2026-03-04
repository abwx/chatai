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
        <div class="item-time">{{ dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
        <div class="item-time">{{ dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
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
import { ConversationProps } from '../ts/type'
import { db,initProviders } from '../db'
import { onMounted,ref,watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'

const router = useRouter()
const route = useRoute()
const conversations = ref<ConversationProps[]>([])

// 获取会话列表
const fetchConversations = async () => {
  const data = await db.conversations.toArray()
  // 按更新时间倒序排列，新活跃的在上面
  conversations.value = data.sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )
}

// 监听路由变化，刷新会话列表（例如从首页发送消息后跳转过来）
watch(() => route.fullPath, () => {
  fetchConversations()
})

// 选中会话
const selectConversation = (item: ConversationProps) => {
  console.log('选中会话:', item)
  router.push({
    path: '/message',
    query: {
      id: item.id,
      model: item.selectedModel,
      title: item.title
    },
  })
}

// 新建聊天
const handleNewChat = () => {
  console.log('新建聊天')
  router.push('/') // 跳转到首页，显示 ProviderSelect
}

// 应用配置
const handleConfig = () => {
  console.log('应用配置')
  router.push('/setting')
}

onMounted(async ()=>{
  await initProviders()
  await fetchConversations()
})
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