import { vectorIndex } from '@/database/vectorDatabase';
import LlmManager from '@/llm/LlmManager';
import { PromptUtils } from '@/llm/PromptUtils';
import { Message } from '@/schemas/chatSchema';

export default class VectorService {
  private llm: LlmManager;
  private readonly SIMILARITY_THRESHOLD = 0.65;

  constructor(llm: LlmManager) {
    this.llm = llm;
  }

  public async getRelevantContext(
    lastUserPrompt: string,
    historyBeforeLast: Message[]
  ): Promise<string> {
    const searchableQuery = await this.generateStandaloneQuery(lastUserPrompt, historyBeforeLast);

    const queryResult = await vectorIndex.query({
      data: searchableQuery,
      topK: 7,
      includeData: true
    });

    const filteredResults = queryResult.filter(
      match => (match.score ?? 0) >= this.SIMILARITY_THRESHOLD
    );

    if (filteredResults.length === 0) return '';
    return filteredResults.map(match => match.data).join('\n\n');
  }

  private async generateStandaloneQuery(
    lastUserPrompt: string,
    historyBeforeLast: Message[]
  ): Promise<string> {
    if (historyBeforeLast.length === 0) return lastUserPrompt;

    const messages = PromptUtils.buildStandaloneSearchQueryPrompt(
      lastUserPrompt,
      historyBeforeLast
    );
    const response = await this.llm.generateContent(messages, 'fast');

    return response.aiResponse;
  }
}
