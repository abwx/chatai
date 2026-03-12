import OpenAI from "openai";
import { BaseProvider } from "./base";
import { ChatOptions, IAIProvider, StreamChunk } from "./types";

export class QianfanProvider extends BaseProvider implements IAIProvider {
  constructor(private client: OpenAI) {
    super();
  }

  async chat(options: ChatOptions, onChunk: (chunk: StreamChunk) => void): Promise<void> {
    const processedMessages = await this.processMessages(options.messages);
    
    const response = await this.client.chat.completions.create({
      model: options.model || "ernie-4.0-8k",
      messages: processedMessages,
      stream: true,
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
