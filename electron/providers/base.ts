import { app } from "electron";
import path from "node:path";
import fs from "node:fs";
import { ProviderMessage } from "./types";

export abstract class BaseProvider {
  protected async processMessages(messages: ProviderMessage[]) {
    const processedMessages: any[] = [];

    for (const m of messages) {
      const content: any[] = [];
      const systemMessages: any[] = [];

      // 处理文本
      if (m.content && typeof m.content === 'string') {
        content.push({ type: "text", text: m.content });
      } else if (Array.isArray(m.content)) {
        content.push(...m.content);
      }

      // 处理单张或多张图片
      const images = m.imagePaths || (m.imagePath ? [m.imagePath] : []);
      for (const imgPath of images) {
        let finalImageUrl = imgPath;
        if (imgPath.startsWith('local-file://')) {
          const fileName = imgPath.replace('local-file://', '');
          const uploadsDir = path.join(app.getPath('userData'), 'uploads');
          const fullPath = path.join(uploadsDir, fileName);
          if (fs.existsSync(fullPath)) {
            const buffer = fs.readFileSync(fullPath);
            const ext = path.extname(fullPath).slice(1);
            finalImageUrl = `data:image/${ext};base64,${buffer.toString('base64')}`;
          }
        }
        content.push({ type: "image_url", image_url: { url: finalImageUrl } });
      }

      // 子类可以根据需要重写文件处理逻辑（如 Aliyun 需要上传获取 fileId）
      const fileContext = await this.handleFileContext(m);
      if (fileContext) {
        systemMessages.push(fileContext);
      }

      if (systemMessages.length > 0) {
        processedMessages.push(...systemMessages);
      }

      processedMessages.push({
        role: m.role,
        content: content.length === 1 && content[0].type === 'text' ? content[0].text : content
      });
    }

    return processedMessages;
  }

  protected async handleFileContext(message: ProviderMessage): Promise<any | null> {
    // 默认不处理，子类按需实现
    return null;
  }
}
