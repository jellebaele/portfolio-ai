import { Message } from '@/schemas/chatSchema';
import { ILlmProvider } from './ILlmProvider';

export default class LlmManager implements ILlmProvider {
  private providers: ILlmProvider[];
  private currentIndex: number;

  constructor(providers: ILlmProvider[]) {
    if (providers.length === 0) throw new Error('No providers were configured.');
    this.providers = providers;
    this.currentIndex = 0;
  }

  public async generateContent(
    userPrompt: string,
    history: Message[],
    context: string
  ): Promise<string> {
    const totalAmountOfProviders = this.providers.length;

    for (let i = 0; i < totalAmountOfProviders; i++) {
      const attemptIndex = (this.currentIndex + i) % totalAmountOfProviders;
      const provider = this.providers[attemptIndex];

      try {
        const result = await provider.generateContent(userPrompt, history, context);
        this.currentIndex = attemptIndex;
        return result;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.warn(`Provider at index ${attemptIndex} failed. Trying next...`);
      }
    }

    throw new Error('All LLM providers are currently exhausted.');
  }
}
