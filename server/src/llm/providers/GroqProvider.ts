import { config } from '@/config';
import { Message } from '@/schemas/chatSchema';
import Groq from 'groq-sdk';
import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat.mjs';
import { ILlmProvider } from '../ILlmProvider';
import { PromptUtils } from '../PromptUtils';

export class GroqProvider implements ILlmProvider {
  private client: Groq;

  constructor() {
    this.client = new Groq({ apiKey: config.llm.apiKeyGroq });
  }

  async generateContent(userPrompt: string, history: Message[], context: string): Promise<string> {
    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: PromptUtils.buildSystemInstructions() },
      ...PromptUtils.mapHistory(history),
      { role: 'user', content: PromptUtils.buildStrictPrompt(userPrompt, context) }
    ];

    const chatCompletion = await this.client.chat.completions.create({
      model: config.llm.modelnameGroq,
      messages: messages,
      temperature: 0.2
    });

    return chatCompletion.choices[0]?.message?.content || "I couldn't generate a response.";
  }
}
