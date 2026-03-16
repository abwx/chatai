<template>
  <div class="sidebar-container">
    <!-- 左侧会话列表 -->
    <div class="conversation-list">
      <div
        v-for="(item, index) in conversationStore.items"
        :key="index"
        class="conversation-item"
        :class="{ active: Number(route.query.id) === item.id }"
        @click="selectConversation(item)"
        @contextmenu.prevent="(e) => showContextMenu(e, item.id)"
      >
        <!-- 模型名称 -->
        <div class="item-model">{{ item.selectedModel }}</div>
        <!-- 会话内容摘要 -->
        <div class="item-content">
          <VueMarkdown :source="item.title" />
        </div>
        <!-- 时间 -->
        <div class="item-time">{{ dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
        <div class="item-time">{{ dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
        <!-- 删除按钮 -->
        <div class="delete-btn" @click="(e) => handleDelete(e, item.id)">
          <Icon icon="radix-icons:trash" width="15" height="15"></Icon>
        </div>
      </div>
    </div>

    <!-- 右键菜单 -->
    <div
      v-if="contextMenu.visible"
      class="context-menu"
      :style="{ top: contextMenu.y + 'px', left: contextMenu.x + 'px' }"
      @click.stop
    >
      <div class="context-menu-item delete" @click="handleContextMenuDelete">
        <Icon icon="radix-icons:trash" width="14" height="14"></Icon>
        {{ t('sidebar.deleteConversation') || '删除对话' }}
      </div>
    </div>

    <!-- 底部按钮区 -->
    <div class="sidebar-footer">
      <Button color="green" @click="handleNewChat">
        <Icon icon="radix-icons:plus" width="15" height="15"></Icon>
        {{ t('sidebar.newChat') }}
      </Button>
      <Button color="blue" @click="handleConfig">
        <Icon icon="radix-icons:gear" width="15" height="15"></Icon>
        {{ t('sidebar.settings') }}
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from './Button.vue'
import { ConversationProps } from '../ts/type'
import { initProviders } from '../db'
import { onMounted, watch, ref, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConversationStore } from '../stores/conversation'
import dayjs from 'dayjs'
import VueMarkdown from 'vue-markdown-render'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const conversationStore = useConversationStore()

// 右键菜单状态
const contextMenu = ref({
  visible: false,
  x: 0,
  y: 0,
  selectedId: -1
})

// 显示右键菜单
const showContextMenu = (e: MouseEvent, id: number) => {
  contextMenu.value = {
    visible: true,
    x: e.clientX,
    y: e.clientY,
    selectedId: id
  }
}

// 关闭右键菜单
const closeContextMenu = () => {
  contextMenu.value.visible = false
}

// 菜单项：删除
const handleContextMenuDelete = async () => {
  if (contextMenu.value.selectedId !== -1) {
    await handleDelete(new Event('click'), contextMenu.value.selectedId)
    closeContextMenu()
  }
}

// 监听点击事件关闭菜单
const handleGlobalClick = () => {
  if (contextMenu.value.visible) {
    closeContextMenu()
  }
}

// 监听路由变化，刷新会话列表
watch(() => route.fullPath, () => {
  conversationStore.fetchConversations()
})

// 选中会话
const selectConversation = (item: ConversationProps) => {
  console.log('选中会话:', item)
  conversationStore.selectedId = item.id
  router.push({
    path: '/message',
    query: {
      id: item.id,
      model: item.selectedModel,
      title: item.title
    },
  })
}

// 删除会话
const handleDelete = async (e: Event, id: number) => {
  e.stopPropagation() // 防止触发选中
  
  // 添加确认步骤
  const confirmed = window.confirm(t('sidebar.deleteConfirm'))
  if (!confirmed) return

  await conversationStore.deleteConversation(id)
  // 如果删除的是当前选中的，跳回首页
  if (route.query.id === String(id)) {
    router.push('/')
  }
}

// 新建聊天
const handleNewChat = () => {
  console.log('新建聊天')
  conversationStore.selectedId = -1
  router.push('/') // 跳转到首页，显示 ProviderSelect
}

// 应用配置
const handleConfig = () => {
  console.log('应用配置')
  router.push('/setting')
}

onMounted(async ()=>{
  await initProviders()
  await conversationStore.fetchConversations()
  window.addEventListener('click', handleGlobalClick)
})

onUnmounted(() => {
  window.removeEventListener('click', handleGlobalClick)
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
    padding: 12px;
    border-bottom: 1px solid #e5e5e5;
    cursor: pointer;
    transition: background-color 0.2s;
    position: relative;

    &:hover {
      background-color: #e8e8e8;
      
      .delete-btn {
        display: flex;
      }
    }

    &.active {
      background-color: #e0e0e0;
      border-left: 3px solid #10b981;
    }

    .delete-btn {
      position: absolute;
      right: 12px;
      top: 12px;
      width: 24px;
      height: 24px;
      border-radius: 4px;
      display: none;
      align-items: center;
      justify-content: center;
      color: #ef4444;
      transition: background-color 0.2s;

      &:hover {
        background-color: #fee2e2;
      }
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

        :deep(p) {
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
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
    
    :deep(button) {
      flex: 1;
      padding: 8px;
      font-size: 13px;
    }
  }

  .context-menu {
    position: fixed;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 4px;
    z-index: 1000;
    min-width: 120px;
    border: 1px solid #e5e5e5;

    .context-menu-item {
      padding: 8px 12px;
      font-size: 13px;
      color: #333;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 4px;
      transition: background-color 0.2s;

      &:hover {
        background-color: #f3f4f6;
      }

      &.delete {
        color: #ef4444;
        
        &:hover {
          background-color: #fee2e2;
        }
      }
    }
  }
}
</style>