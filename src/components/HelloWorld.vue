<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{ msg: string }>()

const nodeVersion = window.versions?.node ?? ''
function setTitle() {
  window.app?.setTitle('Hello Electron')
}
async function getSystemInfo() {
  const res = await window.app?.getSystemInfo()
  platform.value = res.platform
  arch.value = res.arch
}
const platform = ref('')
const arch = ref('')
const cpuUsage = ref(0)
function handleCpu(usage: number) {
  cpuUsage.value = usage
}
onMounted(() => {
  window.app?.onCpuUsageUpdate(handleCpu)
})
onUnmounted(() => {
  window.app?.offCpuUsageUpdate(handleCpu)
})
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">

    <button type="button" @click="setTitle()">设置窗口标题</button>
    <button type="button" @click="getSystemInfo()">获取系统信息</button>
     <div>Node版本：{{ nodeVersion }}</div>
     <div>平台：{{ platform }}</div>
     <div>架构：{{ arch }}</div>
   <h3>实时CPU使用率监控（主进程推送）</h3>
    <div style="font-size: 24px; margin-top: 20px; color: #2c3e50;">
      当前CPU使用率：{{ cpuUsage }}%
    </div>
  </div>

 
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

