"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  }
  // You can expose other APTs you need here.
  // ...
});
electron.contextBridge.exposeInMainWorld("app", {
  setTitle: (title) => electron.ipcRenderer.send("set-title", title),
  getSystemInfo: () => electron.ipcRenderer.invoke("get-system-info"),
  onCpuUsageUpdate: (callback) => {
    electron.ipcRenderer.on("cpu-usage-update", (_, usage) => callback(usage));
  },
  offCpuUsageUpdate: (callback) => {
    electron.ipcRenderer.off("cpu-usage-update", callback);
  }
});
electron.contextBridge.exposeInMainWorld("versions", {
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: process.versions.electron
});
