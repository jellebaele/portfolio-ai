import { Message } from '@/schemas/chatSchema';

export interface ILlmProvider {
  generateContent(userPrompt: string, history: Message[], context: string): Promise<string>;
}
