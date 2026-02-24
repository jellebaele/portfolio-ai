import { redis } from '@/database/redis';
import { vectorIndex } from '@/database/vectorDatabase';
import { llmProvider } from '@/llm';
import { ILlmProvider } from '@/llm/ILlmProvider';
import { ChatResponseDto, GetModelResponseDto, Message } from '@/schemas/chatSchema';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const MAX_HISTORY = 12;
const CACHE_TTL = 60 * 60 * 24; // 24 hours

export default class ResumeService {
  private llm: ILlmProvider;

  constructor(llm: ILlmProvider) {
    this.llm = llm;
  }

  public async processChatMessage(messages: Message[]): Promise<ChatResponseDto> {
    const trimmedHistory = messages.slice(-MAX_HISTORY);
    const lastUserPrompt = trimmedHistory.filter(m => m.role === 'user').at(-1)?.content || '';
    const historyBeforeLast = trimmedHistory.slice(0, -1);

    const cacheKey = this.getCacheKey(lastUserPrompt, trimmedHistory.slice(-3, -1));
    const cached = await redis.get<ChatResponseDto>(cacheKey);
    if (cached) return this.formatMessage(cached.data, cached.meta.llmModel, cached.meta.provider);

    const context = await this.getRelevantContext(
      this.createSearchQuery(lastUserPrompt, historyBeforeLast)
    );
    const { aiResponse, provider, modelName } = await this.llm.generateContent(
      lastUserPrompt,
      trimmedHistory.slice(0, trimmedHistory.length - 1),
      context
    );

    const response = this.formatMessage(aiResponse, modelName, provider);
    await redis.set<ChatResponseDto>(cacheKey, response, { ex: CACHE_TTL });

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

  // TODO move to appropriate class
  private async getRelevantContext(query: string): Promise<string> {
    const queryResult = await vectorIndex.query({
      data: query,
      topK: 5,
      includeData: true
    });
    return queryResult.map(match => match.data).join('\n\n');
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private createSearchQuery(lastUserPrompt: string, historyBeforeLast: Message[]): string {
    const searchQuery = lastUserPrompt;

    // OPTION TO LOOK INTO:
    // if (historyBeforeLast.length > 0) {
    //   const rewritePrompt = PromptUtils.buildStandaloneQueryPrompt(
    //     lastUserPrompt,
    //     historyBeforeLast
    //   );

    //   // We call the LLM once just to get the search terms
    //   const rewriteResponse = await this.llm.generateContent(rewritePrompt, [], '');
    //   searchQuery = rewriteResponse.aiResponse;
    // }

    return searchQuery;
  }
}
