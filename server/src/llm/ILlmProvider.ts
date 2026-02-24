import { Message } from '@/schemas/chatSchema';
import { SupportedModels, SupportedProviders } from '@/schemas/envSchema';

export interface ILlmProvider {
  generateContent(messages: Message[]): Promise<LlmResponse>;
  getLlmModel(): string;
}

export interface LlmConfig {
  type: SupportedProviders;
  modelName: SupportedModels;
  apiKey: string;
}

export interface LlmResponse {
  aiResponse: string;
  provider: SupportedProviders;
  modelName: SupportedModels;
}
