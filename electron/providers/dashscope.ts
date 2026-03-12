import { app } from "electron";
import path from "node:path";
import fs from "node:fs";
import OpenAI from "openai";
import { BaseProvider } from "./base";
import { ChatOptions, IAIProvider, StreamChunk, ProviderMessage } from "./types";

export class DashscopeProvider extends BaseProvider implements IAIProvider {
  constructor(private client: OpenAI) {
    super();
  }

  protected async handleFileContext(message: ProviderMessage): Promise<any | null> {
    if (message.filePath) {
      try {
        const fileName = message.filePath.replace('local-file://', '');
        const uploadsDir = path.join(app.getPath('userData'), 'uploads');
        const fullPath = path.join(uploadsDir, fileName);

        if (fs.existsSync(fullPath)) {
          // 上传文件到阿里云
          const fileUploadResponse = await this.client.files.create({
            file: fs.createReadStream(fullPath),
            purpose: "file-extract" as any,
          });
          
          return {
            role: "system",
            content: `fileid://${fileUploadResponse.id}`
          };
        }
      } catch (fileError) {
        console.error('File upload to Aliyun failed:', fileError);
      }
    }
    return null;
  }

  async chat(options: ChatOptions, onChunk: (chunk: StreamChunk) => void): Promise<void> {
    const processedMessages = await this.processMessages(options.messages);
    
    const response = await this.client.chat.completions.create({
      model: options.model || "qwen-plus",
      messages: processedMessages,
      stream: true,
      stream_options: { include_usage: true },
    }, { signal: options.signal });

    for await (const chunk of response) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        onChunk({ content, isEnd: false });
      }
    }
    
    onChunk({ content: '', isEnd: true });
  }
}
