import { Message } from '@/schemas/chatSchema';
import { ILlmProvider, LlmResponse, ProviderTier } from './ILlmProvider';

export default class LlmManager {
  private providers: ILlmProvider[];
  private readonly COOLDOWN_MS = 1000 * 60 * 60;
  private activeProvider: ILlmProvider | null;

  constructor(providers: ILlmProvider[]) {
    if (providers.length === 0) throw new Error('No providers were configured.');
    this.providers = providers;
    this.activeProvider = providers[0];
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
      this.activeProvider = null;
      throw new Error('All providers are currently down or in cooldown.');
    }

    const prioritizedProviders = [
      ...availableProviders.filter(p => p.tier === tier),
      ...availableProviders.filter(p => p.tier !== tier)
    ];

    for (const provider of prioritizedProviders) {
      try {
        const result = await provider.generateContent(messages);
        this.activeProvider = provider;
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
    return this.activeProvider?.getLlmModel() ?? 'None';
  }
}
