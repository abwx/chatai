"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(
      channel,
      (event, ...args2) => listener(event, ...args2)
    );
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
  startChat: (data) => electron.ipcRenderer.send("start-chat", data),
  onUpdateMessage: (callback) => {
    electron.ipcRenderer.removeAllListeners("update-message");
    const subscription = (_event, value) => callback(value);
    electron.ipcRenderer.on("update-message", subscription);
    return () => electron.ipcRenderer.removeListener("update-message", subscription);
  },
  selectImage: () => electron.ipcRenderer.invoke("select-image"),
  selectFile: () => electron.ipcRenderer.invoke("select-file"),
  stopChat: (messageId) => electron.ipcRenderer.send("stop-chat", messageId),
  getActiveChatIds: () => electron.ipcRenderer.invoke("get-active-chat-ids"),
  updateMenuLocale: (locale) => electron.ipcRenderer.send("update-menu-locale", locale),
  saveConfig: (config) => electron.ipcRenderer.invoke("save-config", config),
  getConfig: () => electron.ipcRenderer.invoke("get-config")
});
