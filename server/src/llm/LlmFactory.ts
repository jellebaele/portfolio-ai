import { SupportProviders } from '@/schemas/envSchema';
import { ILlmProvider } from './ILlmProvider';
import GeminiProvider from './providers/GeminiProvider';
import { GroqProvider } from './providers/GroqProvider';

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
        return new GeminiProvider();
      case 'groq':
        return new GroqProvider();
      default:
        throw new Error(`Unsupported LLM provider: ${provider}`);
    }
  }
}
