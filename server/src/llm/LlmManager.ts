import { Message } from '@/schemas/chatSchema';
import { ILlmProvider, LlmResponse, ProviderTier } from './ILlmProvider';

export default class LlmManager {
  private providers: ILlmProvider[];
  private currentIndex: number;
  private readonly COOLDOWN_MS = 1000 * 60 * 60;

  constructor(providers: ILlmProvider[]) {
    if (providers.length === 0) throw new Error('No providers were configured.');
    this.providers = providers;
    this.currentIndex = 0;
  }

  public async generateContent(
    messages: Message[],
    tier: ProviderTier = 'smart'
  ): Promise<LlmResponse> {
    const now = Date.now();

    const availableProviders = this.providers.filter(
      p => !p.disabledUntil || now > p.disabledUntil
    );

    if (availableProviders.length === 0) {
      throw new Error('All providers are currently down or in cooldown.');
    }

    const prioritizedProviders = [
      ...availableProviders.filter(p => p.tier === tier),
      ...availableProviders.filter(p => p.tier !== tier)
    ];

    for (const provider of prioritizedProviders) {
      try {
        const result = await provider.generateContent(messages);
        return result;
      } catch (error) {
        console.error(error);
        console.warn(`Provider '${provider.getLlmModel()}' failed. Trying next...`);
        provider.disabledUntil = Date.now() + this.COOLDOWN_MS;
      }
    }

    throw new Error('All LLM providers are currently exhausted.');
  }

  public getLlmModel(): string {
    const activeProvider = this.providers[this.currentIndex];
    return activeProvider.getLlmModel();
  }
}
