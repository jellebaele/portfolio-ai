import { redis } from '@/database/redis';
import { vectorIndex } from '@/database/vectorDatabase';
import { ILlmProvider } from '@/llm/ILlmProvder';
import { ChatResponseDto, Message } from '@/schemas/chatSchema';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const MAX_HISTORY = 12;

export default class ResumeService {
  private llm: ILlmProvider;

  constructor(llm: ILlmProvider) {
    this.llm = llm;
  }

  async processChatMessage(messages: Message[]): Promise<ChatResponseDto> {
    const trimmedHistory = messages.slice(-MAX_HISTORY);

    const userPrompts = trimmedHistory.filter(m => m.role === 'user');
    const lastUserPrompt = userPrompts[userPrompts.length - 1];
    const promptHistory = trimmedHistory.slice(0, trimmedHistory.length - 1);

    const cachedResponse = await redis.get<string>(
      this.getCacheKey(lastUserPrompt.content, lastUserPrompt.role)
    );
    if (cachedResponse) {
      console.log('Serving from cache');
      return this.formatMessage(cachedResponse);
    }

    // AI models are bad at parsing javascript objects, make string:
    const chatHistoryString = promptHistory
      .map(m => `${m.role === 'user' ? 'Question' : 'Answer'}: ${m.content}`)
      .join('\n');

    const queryResult = await vectorIndex.query({
      data: lastUserPrompt.content,
      topK: 5,
      includeData: true
    });

    const context = queryResult.map(match => match.data).join('\n\n');

    const prompt = `
      You are Jelle's professional AI assistant.

      CONVERSATION LOG:
      ${chatHistoryString}

      RELEVANT RESUME CONTEXT:
      ${context}

      INSTRUCTION:
      Answer the user's "Current Question" based on the Resume Context and the conversation history above.
      If the answer isn't in the context, say you don't know.

      CURRENT QUESTION: ${lastUserPrompt.content}
    `;

    const aiResponse = await this.llm.generateContent(prompt);
    await redis.set(this.getCacheKey(aiResponse, 'assistant'), aiResponse);

    return this.formatMessage(aiResponse);
  }

  private getCacheKey(data: string, role: 'assistant' | 'user') {
    const prompt = JSON.stringify({ content: data, role: role });
    return crypto.createHash('md5').update(prompt).digest('hex');
  }

  private formatMessage(data: string): ChatResponseDto {
    return {
      id: uuidv4(),
      role: 'assistant',
      data: data,
      status: 'success'
    };
  }
}
