import OpenAI from "openai";
import { DashscopeProvider } from "./dashscope";
import { QianfanProvider } from "./qianfan";
import { IAIProvider } from "./types";

export class ProviderFactory {
  static create(providerName: string, clients: { dashscope: OpenAI, qianfan: OpenAI, userConfigs?: any[] }): IAIProvider {
    if (!providerName) {
      throw new Error("Provider name is required");
    }

    // 获取用户自定义配置 (统一转为小写匹配)
    const userConfig = clients.userConfigs?.find(c => c.id?.toLowerCase() === providerName.toLowerCase())?.config;

    switch (providerName.toLowerCase()) {
      case 'dashscope':
      case 'aliyun': {
        const client = userConfig?.accessKey ? new OpenAI({
          apiKey: userConfig.accessKey,
          baseURL: userConfig.baseUrl || "https://dashscope.aliyuncs.com/compatible-mode/v1"
        }) : clients.dashscope;
        return new DashscopeProvider(client);
      }
      case 'qianfan':
      case 'baidu': {
        const client = userConfig?.accessKey ? new OpenAI({
          apiKey: userConfig.accessKey,
          baseURL: userConfig.baseUrl || 'https://qianfan.baidubce.com/v2'
        }) : clients.qianfan;
        return new QianfanProvider(client);
      }
      case 'openai': {
        if (!userConfig?.accessKey) {
          throw new Error("OpenAI API Key is required. Please configure it in settings.");
        }
        const client = new OpenAI({
          apiKey: userConfig.accessKey,
          baseURL: userConfig.baseUrl || "https://api.openai.com/v1"
        });
        return new DashscopeProvider(client); // OpenAI 兼容接口可以使用 DashscopeProvider 逻辑
      }
      default:
        throw new Error(`Unsupported provider: "${providerName}". Current supported providers are: aliyun (dashscope), baidu (qianfan), and openai.`);
    }
  }
}
