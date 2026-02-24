import { Message } from '@/schemas/chatSchema';
import { Mistral } from '@mistralai/mistralai';
import { ILlmProvider, LlmConfig, LlmResponse, ProviderTier } from '../ILlmProvider';

export default class MistralProvider implements ILlmProvider {
  public tier: ProviderTier;
  private client: Mistral;
  private llmConfig: LlmConfig;

  constructor(llmConfig: LlmConfig) {
    this.tier = llmConfig.tier;
    this.llmConfig = llmConfig;
    this.client = new Mistral({ apiKey: llmConfig.apiKey });
  }

  async generateContent(messages: Message[]): Promise<LlmResponse> {
    const response = await this.client.chat.complete({
      model: this.llmConfig.modelName || 'mistral-small-latest',
      messages: messages.map(m => ({
        role: m.role as 'system' | 'user' | 'assistant',
        content: m.content
      })),
      temperature: 0.7
    });

    const content = response.choices?.[0]?.message?.content;

    return {
      aiResponse: typeof content === 'string' ? content : "I couldn't generate a response.",
      provider: 'mistral',
      modelName: this.llmConfig.modelName
    };
  }

  getLlmModel(): string {
    return this.llmConfig.modelName;
  }
}
