import { Message } from '@/schemas/chatSchema';
import { ILlmProvider, LlmResponse, ProviderTier } from './ILlmProvider';

export default class LlmManager {
  private providers: ILlmProvider[];
  private currentIndex: number;

  constructor(providers: ILlmProvider[]) {
    if (providers.length === 0) throw new Error('No providers were configured.');
    this.providers = providers;
    this.currentIndex = 0;
  }

  public async generateContent(
    messages: Message[],
    tier: ProviderTier = 'smart'
  ): Promise<LlmResponse> {
    const priotizedProviders = [
      ...this.providers.filter(p => p.tier === tier),
      ...this.providers.filter(p => p.tier !== tier)
    ];

    console.log(priotizedProviders);

    const totalAmountOfProviders = priotizedProviders.length;

    for (let i = 0; i < totalAmountOfProviders; i++) {
      const attemptIndex = (this.currentIndex + i) % totalAmountOfProviders;
      const provider = priotizedProviders[attemptIndex];

      try {
        const result = await provider.generateContent(messages);
        this.currentIndex = attemptIndex;
        return result;
      } catch (error) {
        console.error(error);
        console.warn(`Provider at index ${attemptIndex} failed. Trying next...`);
      }
    }

    throw new Error('All LLM providers are currently exhausted.');
  }

  public getLlmModel(): string {
    const activeProvider = this.providers[this.currentIndex];
    return activeProvider.getLlmModel();
  }
}
