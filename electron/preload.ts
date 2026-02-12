import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...

})
contextBridge.exposeInMainWorld('app', {
  setTitle: (title: string) => ipcRenderer.send('set-title', title),
   getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
  onCpuUsageUpdate: (callback:any) => {
    ipcRenderer.on('cpu-usage-update', (_, usage) => callback(usage));
  },
  offCpuUsageUpdate: (callback:any) => {
    ipcRenderer.off('cpu-usage-update', callback);
  },
})
// 2. 暴露系统版本信息（process 已显式导入）
contextBridge.exposeInMainWorld('versions', {
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: process.versions.electron
});
