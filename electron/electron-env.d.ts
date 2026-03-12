/// <reference types="vite-plugin-electron/electron-env" />
import { CreateChatProps, OnUpdatedCallback, AppConfig } from '../src/ts/type'

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    APP_ROOT: string
    /** /dist/ or /public/ */
    VITE_PUBLIC: string
  }
}

// Used in Renderer process, expose in `preload.ts`
declare global {
  interface Window {
    ipcRenderer: import('electron').IpcRenderer
    versions: {
      node: string
      chrome: string
      electron: string
    }
    app: {
      startChat: (data: CreateChatProps) => void;
      onUpdateMessage: (callback: OnUpdatedCallback) => () => void;
      selectImage: () => Promise<{ path: string; fileName: string } | null>;
      selectFile: () => Promise<{ path: string; fileName: string; size: number } | null>;
      stopChat: (messageId: number) => void;
      getActiveChatIds: () => Promise<number[]>;
    }
  }
}

export {}
