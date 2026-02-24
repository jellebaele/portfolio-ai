import { Message } from '@/schemas/chatSchema';
import { SupportedModels, SupportedProviders } from '@/schemas/envSchema';

export interface ILlmProvider {
  readonly tier: ProviderTier;
  generateContent(messages: Message[]): Promise<LlmResponse>;
  getLlmModel(): string;
}

export interface LlmConfig {
  tier: ProviderTier;
  type: SupportedProviders;
  modelName: SupportedModels;
  apiKey: string;
}

export interface LlmResponse {
  aiResponse: string;
  provider: SupportedProviders;
  modelName: SupportedModels;
}

export type ProviderTier = 'fast' | 'smart';
