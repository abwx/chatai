import { app, BrowserWindow, ipcMain, dialog, protocol, net, Menu, MenuItemConstructorOptions } from "electron";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import OpenAI from "openai";
import fs from 'fs'  
import crypto from 'crypto'
import { ProviderFactory } from "./providers/factory";
import { ProviderMessage } from "./providers/types";


// 设置输出编码为 UTF-8，解决 Windows 终端中文乱码问题
if (process.platform === 'win32') {
  process.stdout.setDefaultEncoding('utf8');
  process.stderr.setDefaultEncoding('utf8');
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

// 菜单翻译
const menuTranslations: Record<string, any> = {
  zh: {
    edit: '编辑',
    undo: '撤销',
    redo: '重做',
    cut: '剪切',
    copy: '复制',
    paste: '粘贴',
    selectAll: '全选',
    view: '视图',
    reload: '重新加载',
    toggleDevTools: '开发者工具',
    window: '窗口',
    minimize: '最小化',
    close: '关闭',
    help: '帮助',
    debug: '调试',
    actualSize: '实际大小',
    zoomIn: '放大',
    zoomOut: '缩小',
    toggleFullScreen: '切换全屏',
    zoom: '缩放'
  },
  en: {
    edit: 'Edit',
    undo: 'Undo',
    redo: 'Redo',
    cut: 'Cut',
    copy: 'Copy',
    paste: 'Paste',
    selectAll: 'Select All',
    view: 'View',
    reload: 'Reload',
    toggleDevTools: 'Toggle Developer Tools',
    window: 'Window',
    minimize: 'Minimize',
    close: 'Close',
    help: 'Help',
    debug: 'Debug',
    actualSize: 'Actual Size',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    toggleFullScreen: 'Toggle Full Screen',
    zoom: 'Zoom'
  }
};

function createMenu(locale: string = 'zh') {
  const t = menuTranslations[locale] || menuTranslations.zh;
  const template: MenuItemConstructorOptions[] = [
    {
      label: t.edit,
      submenu: [
        { label: t.undo, role: 'undo' },
        { label: t.redo, role: 'redo' },
        { type: 'separator' },
        { label: t.cut, role: 'cut' },
        { label: t.copy, role: 'copy' },
        { label: t.paste, role: 'paste' },
        { label: t.selectAll, role: 'selectAll' }
      ]
    },
    {
      label: t.view,
      submenu: [
        { label: t.reload, role: 'reload' },
        { label: t.toggleDevTools, role: 'toggleDevTools' },
        { type: 'separator' },
        { label: t.actualSize, role: 'resetZoom' },
        { label: t.zoomIn, role: 'zoomIn' },
        { label: t.zoomOut, role: 'zoomOut' },
        { type: 'separator' },
        { label: t.toggleFullScreen, role: 'togglefullscreen' }
      ]
    },
    {
      label: t.debug,
      submenu: [
        {
          label: t.toggleDevTools,
          accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click: () => {
            win?.webContents.toggleDevTools();
          }
        }
      ]
    },
    {
      label: t.window,
      submenu: [
        { label: t.minimize, role: 'minimize' },
        { label: t.zoom, role: 'zoom' },
        { label: t.close, role: 'close' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC?? '', "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });
  // 核心代码：打开开发者工具
  win.webContents.openDevTools({
    mode: "right", // 可选：right（右侧）、bottom（底部）、detach（独立窗口）
  });
  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
// 建议把千帆应用的 API Key 放到环境变量 QIANFAN_API_KEY 中
// 这里只是演示，可以先直接写死测试，再改成从 env 读取
const client = new OpenAI({
   baseURL: 'https://qianfan.baidubce.com/v2',
    apiKey: 'bce-v3/ALTAK-bWi3NLXT3E7X32Fjj8LL5/3b0d63ecfcc9c65a744e7c147fa1cec6dec073dd'
});

const openai = new OpenAI(
  {
      // 若没有配置环境变量，请用百炼API Key将下行替换为：apiKey: "sk-xxx",
      apiKey: 'sk-41562ac6a2c64c428a7219eba7e928d2',
      baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
  }
);


async function main() {
  try {
    const response = await client.chat.completions.create({
      model: "ernie-4.5-21b-a3b",
      messages: [{ "role": "user", "content": "你是谁" }],
      max_tokens: 50, 
      stream: true,
    });

    for await (const chunk of response) {
      process.stdout.write(chunk.choices[0]?.delta?.content || '');

    }
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}
async function mainAliyun() {
  const completion = await openai.chat.completions.create({
      model: "qwen3.5-plus",  //此处以qwen-plus为例，可按需更换模型名称。模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
      messages: [
        { role: "system", content: "你是一一个小孩子 要叫我妈妈" },
        { role: "user", content: "李白多少岁去世的" },
    ],
    stream: true,
    // 目的：在最后一个chunk中获取本次请求的Token用量。
    stream_options: { include_usage: true },
  });
  for await (const chunk of completion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}
async function mainAliyunImage() {
  const completion = await openai.chat.completions.create({
      model: "qwen3.5-plus",  //此处以qwen-plus为例，可按需更换模型名称。模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
      messages: [
        { role: "system", content: "你是一一个小孩子 要叫我妈妈" },
        { role: "user" , content: [{
          type: "image_url",
          image_url: {
            "url": "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20241022/emyrja/dog_and_girl.jpeg"
          }
        },
        {
          type: "text",
          text: "图中描绘的是什么景象?"
        }
      ] },
    ],
    stream: true,
    // 目的：在最后一个chunk中获取本次请求的Token用量。
    stream_options: { include_usage: true },
  });
  for await (const chunk of completion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}
async function mainAliyunFile() {
  try {
    // 1. 第一步：上传本地文件（对应 Python 的 client.files.create）
    // 注意：阿里云百炼兼容 OpenAI 文件上传格式，需用 FormData 提交
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.resolve(__dirname, "../src/assets/test.txt"); // 本地文件路径（同Python的test.txt）
    const fileStat = fs.statSync(filePath); // 获取文件信息

    // 构建 FormData（Node.js 环境需手动构造，OpenAI 包会自动处理）
    const fileUploadResponse = await openai.files.create({
      file: fs.createReadStream(filePath), // 读取本地文件流
      purpose: "file-extract" as any, // 文件用途：文件解析（和Python保持一致）
    });


    // 2. 第二步：调用模型解析上传的文件（可选，模仿图文对话的交互逻辑）
    const fileId = fileUploadResponse.id; // 获取上传后的文件ID
    const completion = await openai.chat.completions.create({
      model: "qwen-long", // 阿里云百炼模型（和图片接口一致）
      messages: [
        { 
          role: "system", 
          content: "你是一个文件解析助手，帮我解析上传的文件内容并总结" 
        },
        {
          role: "system",
          content: `fileid://${fileId}`
        },
        { 
          role: "user", 
         
              content: "帮我解析并总结这个文件的核心内容"
       
          
        }
      ],
      stream: true, // 流式输出（和图片接口保持一致）
      stream_options: { include_usage: true }, // 返回Token用量
    });

    // 3. 流式输出解析结果（和图片接口的遍历逻辑一致）
  
    for await (const chunk of completion) {
      process.stdout.write(chunk.choices[0]?.delta?.content || '');
    }

  } catch (error) {
    // 错误处理（和图片接口保持一致）
    console.error('操作失败：', error);
   
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  // 注册自定义协议以安全地加载本地文件
  protocol.handle('local-file', (request) => {
    const url = request.url.replace('local-file://', '');
    const decodedUrl = decodeURIComponent(url);
    const uploadsDir = path.join(app.getPath('userData'), 'uploads');
    const fullPath = path.join(uploadsDir, decodedUrl);
    
    if (!fullPath.startsWith(uploadsDir)) {
      return new Response('Access Denied', { status: 403 });
    }
    
    return net.fetch(pathToFileURL(fullPath).toString());
  });

  createMenu(); // 初始化菜单
  createWindow();
});

// 存储活跃的请求控制器，用于中断对话
const abortControllers = new Map<number, AbortController>();

ipcMain.on("start-chat", async (event, data) => {
  const target = BrowserWindow.fromWebContents(event.sender);
  if (data.title) {
    target?.setTitle(String(data.title));
  }

  const { providerName, selectedModel, messageId, messages } = data;
  
  // 为当前请求创建控制器
  const controller = new AbortController();
  abortControllers.set(messageId, controller);

  try {
    // 读取最新的配置 (增加更严谨的 try-catch)
    let userConfigs: any = {};
    if (fs.existsSync(configPath)) {
      try {
        userConfigs = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      } catch (e) {
        console.error('Config parse error:', e);
      }
    }

    const provider = ProviderFactory.create(providerName, {
      dashscope: openai,
      qianfan: client,
      userConfigs: userConfigs.modelProviders || []
    });

    await provider.chat({
      model: selectedModel,
      messages: messages as ProviderMessage[],
      signal: controller.signal
    }, (chunk) => {
      win?.webContents.send('update-message', {
        messageId: messageId,
        data: {
          is_end: chunk.isEnd,
          result: chunk.content,
          is_error: chunk.isError,
          error_message: chunk.errorMessage
        }
      });
    });
  } catch (error: any) {
    // 如果是主动取消，不发送错误消息
    if (error.name === 'AbortError') {
      console.log('Chat aborted by user:', messageId);
    } else {
      console.error('Chat Error:', error);
      win?.webContents.send('update-message', {
        messageId: messageId,
        data: {
          is_end: true,
          result: '',
          is_error: true,
          error_message: error.message
        }
      });
    }
  } finally {
    // 结束后移除控制器
    abortControllers.delete(messageId);
  }
});

ipcMain.on("stop-chat", (event, messageId) => {
  const controller = abortControllers.get(messageId);
  if (controller) {
    controller.abort();
    abortControllers.delete(messageId);
    
    // 通知前端已停止
    win?.webContents.send('update-message', {
      messageId: messageId,
      data: {
        is_end: true,
        result: ''
      }
    });
  }
});

let cpuTimer: ReturnType<typeof setInterval> | null = null;
function startCpuBroadcast() {
  let lastUsage = process.cpuUsage();
  let lastTime = process.hrtime.bigint();
  cpuTimer = setInterval(() => {
    const usage = process.cpuUsage();
    const now = process.hrtime.bigint();
    const deltaMicros =
      usage.user - lastUsage.user + (usage.system - lastUsage.system);
    const deltaMillis = Number((now - lastTime) / BigInt(1_000_000));
    const percent =
      deltaMillis > 0 ? (deltaMicros / (deltaMillis * 1000)) * 100 : 0;
    lastUsage = usage;
    lastTime = now;
    win?.webContents.send("cpu-usage-update", Number(percent.toFixed(2)));
  }, 1000);
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
    arch: process.arch,
  };
});

ipcMain.handle("get-active-chat-ids", () => {
  return Array.from(abortControllers.keys());
});

ipcMain.on("update-menu-locale", (event, locale) => {
  createMenu(locale);
});

// 配置文件路径
const configPath = path.join(app.getPath('userData'), 'config.json');

// 读取配置
ipcMain.handle("get-config", () => {
  if (fs.existsSync(configPath)) {
    try {
      const data = fs.readFileSync(configPath, 'utf-8');
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to read config:', e);
      return {};
    }
  }
  return {};
});

// 保存配置
ipcMain.handle("save-config", (event, config) => {
  try {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    return { success: true };
  } catch (e) {
    console.error('Failed to save config:', e);
    return { success: false, error: String(e) };
  }
});

ipcMain.handle("select-image", async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [
      { name: "Images", extensions: ["jpg", "png", "gif", "jpeg", "webp"] },
    ],
  });

  if (canceled || filePaths.length === 0) return null;

  const filePath = filePaths[0];
  const uploadsDir = path.join(app.getPath("userData"), "uploads");

  // 1. 确保目录存在
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // 2. 生成唯一文件名 (hash + ext) 以避免命名冲突
  const ext = path.extname(filePath);
  const fileHash = crypto.createHash('md5').update(filePath + Date.now()).digest('hex');
  const fileName = `${fileHash}${ext}`;
  const destPath = path.join(uploadsDir, fileName);

  // 3. 复制文件到应用目录
  fs.copyFileSync(filePath, destPath);

  // 4. 返回前端可用的 local-file 协议路径
  const localUrl = `local-file://${fileName}`;

  return {
    path: localUrl,
    fileName: fileName
  };
});

ipcMain.handle("select-file", async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [
      { name: "All Files", extensions: ["*"] },
      { name: "Documents", extensions: ["pdf", "docx", "txt", "md", "csv", "xlsx"] },
    ],
  });

  if (canceled || filePaths.length === 0) return null;

  const filePath = filePaths[0];
  const uploadsDir = path.join(app.getPath("userData"), "uploads");

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const ext = path.extname(filePath);
  const originalName = path.basename(filePath);
  const fileHash = crypto.createHash('md5').update(filePath + Date.now()).digest('hex');
  const fileName = `${fileHash}${ext}`;
  const destPath = path.join(uploadsDir, fileName);

  fs.copyFileSync(filePath, destPath);

  const stats = fs.statSync(destPath);

  return {
    path: `local-file://${fileName}`,
    fileName: originalName,
    size: stats.size
  };
});
