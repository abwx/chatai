import { ipcRenderer, contextBridge } from "electron";
import { CreateChatProps, OnUpdatedCallback, AppConfig } from "../src/ts/type";
// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) =>
      listener(event, ...args),
    );
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },

  // You can expose other APTs you need here.
  // ...
});
contextBridge.exposeInMainWorld("app", {
  startChat: (data: CreateChatProps) => ipcRenderer.send("start-chat", data),
  onUpdateMessage: (callback: OnUpdatedCallback) => {
    // 强制移除旧监听器，防止 HMR 导致重复
    ipcRenderer.removeAllListeners("update-message");
    const subscription = (_event: any, value: any) => callback(value);
    ipcRenderer.on("update-message", subscription);
    return () => ipcRenderer.removeListener("update-message", subscription);
  },
  selectImage: () => ipcRenderer.invoke("select-image"),
  selectFile: () => ipcRenderer.invoke("select-file"),
  stopChat: (messageId: number) => ipcRenderer.send("stop-chat", messageId),
  getActiveChatIds: () => ipcRenderer.invoke("get-active-chat-ids"),
});
