import { createWebHashHistory, createRouter } from 'vue-router'

import Home from '../views/home/index.vue'
import ProviderSelect from '../components/ProviderSelect.vue'
import MessageList from '../components/MessageList.vue'
import Setting from '../views/setting/index.vue'

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      // 默认首页右侧显示 ProviderSelect
      { path: '', component: ProviderSelect },
      // 点击会话列表后，右侧显示 MessageList
      { path: 'message', component: MessageList },
      // 点击“应用配置”按钮后，右侧显示 Setting 页面
      { path: 'setting', component: Setting },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router