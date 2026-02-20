import { redis } from '@/database/redis';
import { vectorIndex } from '@/database/vectorDatabase';
import { ILlmProvider } from '@/llm/ILlmProvder';
import { ChatResponseDto, Message } from '@/schemas/chatSchema';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const MAX_HISTORY = 12;
const CACHE_TTL = 60 * 60 * 24; // 24 hours

export default class ResumeService {
  private llm: ILlmProvider;

  constructor(llm: ILlmProvider) {
    this.llm = llm;
  }

  async processChatMessage(messages: Message[]): Promise<ChatResponseDto> {
    const trimmedHistory = messages.slice(-MAX_HISTORY);
    const lastUserPrompt = trimmedHistory.filter(m => m.role === 'user')[trimmedHistory.length - 1];

    if (!lastUserPrompt) throw new Error('No user message found');

    // AI models are bad at parsing javascript objects, make string:
    const chatHistory = this.formatChatHistory(trimmedHistory.slice(0, trimmedHistory.length - 1));
    const cacheKey = this.getCacheKey(lastUserPrompt.content, chatHistory);

    const cached = await redis.get<string>(cacheKey);
    if (cached) return this.formatMessage(cached);

    const context = await this.getRelevantContext(lastUserPrompt.content);

    const prompt = this.buildPrompt(chatHistory, context, lastUserPrompt.content);
    const aiResponse = await this.llm.generateContent(prompt);

    await redis.set(cacheKey, aiResponse, { ex: CACHE_TTL });

    return this.formatMessage(aiResponse);
  }

  private getCacheKey(data: string, history: string) {
    const prompt = JSON.stringify({ content: data, history: history });
    return crypto.createHash('md5').update(prompt).digest('hex');
  }

  private async getRelevantContext(query: string): Promise<string> {
    const queryResult = await vectorIndex.query({
      data: query,
      topK: 5,
      includeData: true
    });
    return queryResult.map(match => match.data).join('\n\n');
  }

  private formatMessage(data: string): ChatResponseDto {
    return {
      id: uuidv4(),
      role: 'assistant',
      data: data,
      status: 'success'
    };
  }

  private formatChatHistory(history: Message[]) {
    return history
      .map(m => `${m.role === 'user' ? 'Question' : 'Answer'}: ${m.content}`)
      .join('\n');
  }

  private buildPrompt(chatHistory: string, context: string, question: string) {
    return `
      You are Jelle's professional AI assistant.

      CONVERSATION LOG:
      ${chatHistory}

      RELEVANT RESUME CONTEXT:
      ${context}

      INSTRUCTION:
      Answer the user's "Current Question" based on the Resume Context and the conversation history above.
      If the answer isn't in the context, say you don't know.

      CURRENT QUESTION: ${question}
    `;
  }
}
