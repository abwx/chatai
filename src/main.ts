import { createApp } from 'vue'
// import './style.css'
import './assets/css/reset.css'
import App from './App.vue'
import { Icon } from "@iconify/vue";
import { createPinia } from 'pinia'
import router from './router'
import i18n from './i18n'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const pinia = createPinia()

const app = createApp(App)


app.component("Icon", Icon);
app.use(router)
app.use(pinia)
app.use(i18n)
app.use(ElementPlus)
app.mount('#app').$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
