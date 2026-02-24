import { Message } from '@/schemas/chatSchema';
import Groq from 'groq-sdk';
import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat.mjs';
import { ILlmProvider, LlmConfig, LlmResponse, ProviderTier } from '../ILlmProvider';

export class GroqProvider implements ILlmProvider {
  public readonly tier: ProviderTier;
  private client: Groq;
  private llmConfig: LlmConfig;

  constructor(llmConfig: LlmConfig) {
    this.tier = llmConfig.tier;
    this.client = new Groq({ apiKey: llmConfig.apiKey });
    this.llmConfig = llmConfig;
  }

  async generateContent(messages: Message[]): Promise<LlmResponse> {
    const groqMessages: ChatCompletionMessageParam[] = messages.map(m => ({
      role: m.role,
      content: m.content
    }));

    const chatCompletion = await this.client.chat.completions.create({
      model: this.llmConfig.modelName,
      messages: groqMessages,
      temperature: 0.2
    });

    return {
      aiResponse: chatCompletion.choices[0]?.message?.content || "I couldn't generate a response.",
      provider: this.llmConfig.type,
      modelName: this.llmConfig.modelName
    };
  }

  public getLlmModel(): string {
    return this.llmConfig.modelName;
  }
}
