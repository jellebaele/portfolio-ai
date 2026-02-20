import { Message } from '@/schemas/chatSchema';
import { SupportedModels, SupportedProviders } from '@/schemas/envSchema';

export interface ILlmProvider {
  generateContent(userPrompt: string, history: Message[], context: string): Promise<LlmResponse>;
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
