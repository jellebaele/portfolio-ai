import { config } from '@/config';
import { ILlmProvider } from './ILlmProvder';
import GeminiProvider from './providers/GeminiProvider';
import { SYSTEM_INSTRUCTION } from './systemInstruction';

export default class LlmFactory {
  private static instance: ILlmProvider;

  static create(): ILlmProvider {
    if (!LlmFactory.instance) {
      return LlmFactory.build();
    }

    return this.instance;
  }

  private static build(): ILlmProvider {
    switch (config.llm.provider) {
      case 'gemini':
        return new GeminiProvider(SYSTEM_INSTRUCTION);
      default:
        throw new Error(`Unsupported LLM provider: ${config.llm.provider}`);
    }
  }
}
