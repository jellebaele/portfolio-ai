import { Message } from '@/schemas/chatSchema';
import Groq from 'groq-sdk';
import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat.mjs';
import { ILlmProvider, LlmConfig, LlmResponse } from '../ILlmProvider';
import { PromptUtils } from '../PromptUtils';

export class GroqProvider implements ILlmProvider {
  private client: Groq;
  private llmConfig: LlmConfig;

  constructor(llmConfig: LlmConfig) {
    this.client = new Groq({ apiKey: llmConfig.apiKey });
    this.llmConfig = llmConfig;
  }

  async generateContent(
    userPrompt: string,
    history: Message[],
    context: string
  ): Promise<LlmResponse> {
    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: PromptUtils.buildSystemInstructions() },
      ...PromptUtils.mapHistory(history),
      { role: 'user', content: PromptUtils.buildStrictPrompt(userPrompt, context) }
    ];

    const chatCompletion = await this.client.chat.completions.create({
      model: this.llmConfig.modelName,
      messages: messages,
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
