import { redis } from '@/database/redis';
import { vectorIndex } from '@/database/vectorDatabase';
import { ILlmProvider } from '@/llm/ILlmProvider';
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
    const lastUserPrompt = trimmedHistory.filter(m => m.role === 'user').at(-1);

    if (!lastUserPrompt) throw new Error('No user message found');

    const cacheKey = this.getCacheKey(lastUserPrompt.content, trimmedHistory.slice(-3, -1));
    const cached = await redis.get<string>(cacheKey);
    if (cached) return this.formatMessage(cached);

    const context = await this.getRelevantContext(lastUserPrompt.content);
    const aiResponse = await this.llm.generateContent(
      lastUserPrompt.content,
      trimmedHistory.slice(0, trimmedHistory.length - 1),
      context
    );

    await redis.set(cacheKey, aiResponse, { ex: CACHE_TTL });

    return this.formatMessage(aiResponse);
  }

  private getCacheKey(userPrompt: string, history: Message[]) {
    const prompt = JSON.stringify({
      content: userPrompt,
      history: history.map(h => `${h.role}:${h.content}`).join('\n')
    });

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
}
