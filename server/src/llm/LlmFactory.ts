import { ILlmProvider, LlmConfig } from './ILlmProvider';
import GeminiProvider from './providers/GeminiProvider';
import { GroqProvider } from './providers/GroqProvider';

export default class LlmFactory {
  static create(llmConfig: LlmConfig): ILlmProvider {
    switch (llmConfig.type) {
      case 'gemini':
        return new GeminiProvider(llmConfig);
      case 'groq':
        return new GroqProvider(llmConfig);
      default:
        throw new Error(`Unsupported LLM provider: ${llmConfig.type}`);
    }
  }
}
