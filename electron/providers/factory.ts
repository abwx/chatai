import OpenAI from "openai";
import { DashscopeProvider } from "./dashscope";
import { QianfanProvider } from "./qianfan";
import { IAIProvider } from "./types";

export class ProviderFactory {
  static create(providerName: string, clients: { dashscope: OpenAI, qianfan: OpenAI }): IAIProvider {
    switch (providerName) {
      case 'dashscope':
        return new DashscopeProvider(clients.dashscope);
      case 'qianfan':
        return new QianfanProvider(clients.qianfan);
      default:
        throw new Error(`Unsupported provider: ${providerName}`);
    }
  }
}
