import { Message } from '@/schemas/chatSchema';
import {
  SupportedGeminiModels,
  SupportedGroqModels,
  SupportProviders as SupportedProviders
} from '@/schemas/envSchema';

export interface ILlmProvider {
  generateContent(userPrompt: string, history: Message[], context: string): Promise<string>;
}

export interface LlmConfig {
  type: SupportedProviders;
  modelName: SupportedGeminiModels | SupportedGroqModels;
  apiKey: string;
}
