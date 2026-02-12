import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs")
    }
  });
  win.webContents.openDevTools({
    mode: "right"
    // 可选：right（右侧）、bottom（底部）、detach（独立窗口）
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
ipcMain.on("set-title", (event, title) => {
  const target = BrowserWindow.fromWebContents(event.sender);
  target == null ? void 0 : target.setTitle(String(title));
});
let cpuTimer = null;
function startCpuBroadcast() {
  let lastUsage = process.cpuUsage();
  let lastTime = process.hrtime.bigint();
  cpuTimer = setInterval(() => {
    const usage = process.cpuUsage();
    const now = process.hrtime.bigint();
    const deltaMicros = usage.user - lastUsage.user + (usage.system - lastUsage.system);
    const deltaMillis = Number((now - lastTime) / BigInt(1e6));
    const percent = deltaMillis > 0 ? deltaMicros / (deltaMillis * 1e3) * 100 : 0;
    lastUsage = usage;
    lastTime = now;
    win == null ? void 0 : win.webContents.send("cpu-usage-update", Number(percent.toFixed(2)));
  }, 1e3);
}
app.whenReady().then(startCpuBroadcast);
app.on("window-all-closed", () => {
  if (cpuTimer) {
    clearInterval(cpuTimer);
    cpuTimer = null;
  }
});
ipcMain.handle("get-system-info", () => {
  return {
    platform: process.platform,
    arch: process.arch
  };
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
