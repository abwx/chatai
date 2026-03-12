export interface ProviderMessage {
  role: string;
  content: any; // 可以是字符串或多模态数组
  imagePath?: string;
  imagePaths?: string[];
  filePath?: string;
  fileName?: string;
}

export interface ChatOptions {
  model: string;
  messages: ProviderMessage[];
  signal?: AbortSignal;
}

export interface StreamChunk {
  content: string;
  isEnd: boolean;
  isError?: boolean;
  errorMessage?: string;
}

export interface IAIProvider {
  chat(options: ChatOptions, onChunk: (chunk: StreamChunk) => void): Promise<void>;
}
