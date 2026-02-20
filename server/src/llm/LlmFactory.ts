import { config } from '@/config';
import { SupportProviders } from '@/schemas/envSchema';
import { ILlmProvider } from './ILlmProvider';
import GeminiProvider from './providers/GeminiProvider';
import { SYSTEM_INSTRUCTION } from './systemInstruction';

export default class LlmFactory {
  private static instance: ILlmProvider;

  static create(provider: SupportProviders): ILlmProvider {
    if (!LlmFactory.instance) {
      return LlmFactory.build(provider);
    }

    return this.instance;
  }

  private static build(provider: SupportProviders): ILlmProvider {
    switch (provider) {
      case 'gemini':
        return new GeminiProvider(SYSTEM_INSTRUCTION);
      default:
        throw new Error(`Unsupported LLM provider: ${config.llm.provider}`);
    }
  }
}
