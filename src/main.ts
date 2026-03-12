import { createApp } from 'vue'
// import './style.css'
import './assets/css/reset.css'
import App from './App.vue'
import { Icon } from "@iconify/vue";
import { createPinia } from 'pinia'
import router from './router'
const pinia = createPinia()

const app = createApp(App)


app.component("Icon", Icon);
app.use(router)
app.use(pinia)
app.mount('#app').$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
