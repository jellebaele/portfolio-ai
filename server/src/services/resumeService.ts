import { redis } from '@/database/redis';
import { llmProvider } from '@/llm';
import { ILlmProvider } from '@/llm/ILlmProvider';
import { PromptUtils } from '@/llm/PromptUtils';
import { ChatResponseDto, GetModelResponseDto, Message } from '@/schemas/chatSchema';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import VectorService from './VectorService';

export default class ResumeService {
  private llm: ILlmProvider;
  private vectoryService: VectorService;
  private readonly MAX_HISTORY = 12;
  private readonly CACHE_TTL = 60 * 60 * 24; // 24 hours

  constructor(llm: ILlmProvider, vectorService: VectorService) {
    this.llm = llm;
    this.vectoryService = vectorService;
  }

  public async processChatMessage(messages: Message[]): Promise<ChatResponseDto> {
    const trimmedHistory = messages.slice(-this.MAX_HISTORY);
    const lastUserPrompt = trimmedHistory.filter(m => m.role === 'user').at(-1)?.content || '';
    const historyBeforeLast = trimmedHistory.slice(0, -1);

    const cacheKey = this.getCacheKey(lastUserPrompt, trimmedHistory.slice(-3, -1));
    const cached = await redis.get<ChatResponseDto>(cacheKey);
    if (cached) return this.formatMessage(cached.data, cached.meta.llmModel, cached.meta.provider);

    const context = await this.vectoryService.getRelevantContext(lastUserPrompt, historyBeforeLast);
    const promptMessages = PromptUtils.buildChatMessagePrompt(
      lastUserPrompt,
      context,
      historyBeforeLast
    );

    const { aiResponse, provider, modelName } = await this.llm.generateContent(promptMessages);

    const response = this.formatMessage(aiResponse, modelName, provider);
    await redis.set<ChatResponseDto>(cacheKey, response, { ex: this.CACHE_TTL });

    return response;
  }

  public getActiveModel(): GetModelResponseDto {
    return {
      status: 'success',
      llmModel: llmProvider.getLlmModel()
    };
  }

  private getCacheKey(userPrompt: string, history: Message[]) {
    const prompt = JSON.stringify({
      content: userPrompt,
      history: history.map(h => `${h.role}:${h.content}`).join('\n')
    });

    return crypto.createHash('md5').update(prompt).digest('hex');
  }

  private formatMessage(data: string, modelName: string, provider: string): ChatResponseDto {
    return {
      id: uuidv4(),
      role: 'assistant',
      data: data,
      status: 'success',
      meta: {
        llmModel: modelName,
        provider: provider
      }
    };
  }
}
