import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5174, // 使用 5174 端口，避免与 5173 冲突
    host: '0.0.0.0',
    open: true,
    strictPort: true, // 如果端口被占用，直接报错而不是自动切换到其他端口（如 5173）
  },
  plugins: [
    vue(),
    tailwindcss(),
    
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main.ts',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      // Ployfill the Electron and Node.js API for Renderer process.
      // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: process.env.NODE_ENV === 'test'
        // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
        ? undefined
        : {},
    }),
  ],
  // 新增：解决Vite依赖预构建失败的核心配置
  optimizeDeps: {
    // 排除预构建失败的依赖（重点是openai，补充electron相关避免兼容问题）
    exclude: ['openai', 'electron'],
    // 可选：强制预构建时使用esbuild处理CommonJS依赖
    esbuildOptions: {
      target: 'es2020',
    },
  },
  // 新增：构建配置，兼容CommonJS依赖
  build: {
    commonjsOptions: {
      include: [/node_modules/, /electron/], // 确保node_modules里的CommonJS依赖被正确处理
    },
    rollupOptions: {
      // 告诉Rollup不要处理electron和openai（由Electron主进程直接加载）
      external: ['electron', 'openai'],
    },
  },
  // 可选：解决开发环境下的文件系统访问限制
})