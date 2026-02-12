import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })
    // 核心代码：打开开发者工具
  win.webContents.openDevTools({
    mode: 'right' // 可选：right（右侧）、bottom（底部）、detach（独立窗口）
  })
  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
ipcMain.on('set-title', (event, title) => {
  const target = BrowserWindow.fromWebContents(event.sender)
  target?.setTitle(String(title))
})


let cpuTimer: ReturnType<typeof setInterval> | null = null
function startCpuBroadcast() {
  let lastUsage = process.cpuUsage()
  let lastTime = process.hrtime.bigint()
  cpuTimer = setInterval(() => {
    const usage = process.cpuUsage()
    const now = process.hrtime.bigint()
    const deltaMicros = (usage.user - lastUsage.user) + (usage.system - lastUsage.system)
    const deltaMillis = Number((now - lastTime) / BigInt(1_000_000))
    const percent = deltaMillis > 0 ? (deltaMicros / (deltaMillis * 1000)) * 100 : 0
    lastUsage = usage
    lastTime = now
    win?.webContents.send('cpu-usage-update', Number(percent.toFixed(2)))
  }, 1000)
}
app.whenReady().then(startCpuBroadcast)
app.on('window-all-closed', () => {
  if (cpuTimer) {
    clearInterval(cpuTimer)
    cpuTimer = null
  }
})
ipcMain.handle('get-system-info', () => {
  return {
    platform: process.platform,
    arch: process.arch,
  }
})
  
