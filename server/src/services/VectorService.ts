import { vectorIndex } from '@/database/vectorDatabase';
import { ILlmProvider } from '@/llm/ILlmProvider';
import { PromptUtils } from '@/llm/PromptUtils';
import { Message } from '@/schemas/chatSchema';

export default class VectorService {
  private llm: ILlmProvider;
  private readonly SIMILARITY_THRESHOLD = 0.65;

  constructor(llm: ILlmProvider) {
    this.llm = llm;
  }

  public async getRelevantContext(
    lastUserPrompt: string,
    historyBeforeLast: Message[]
  ): Promise<string> {
    const searchableQuery = await this.generateStandaloneQuery(lastUserPrompt, historyBeforeLast);
    console.log(`🔍 Original: "${lastUserPrompt}" -> Rewritten: "${searchableQuery}"`);

    const queryResult = await vectorIndex.query({
      data: searchableQuery,
      topK: 7,
      includeData: true
    });

    const filteredResults = queryResult.filter(
      match => (match.score ?? 0) >= this.SIMILARITY_THRESHOLD
    );

    console.log(`Vectorsearch results: ${filteredResults.map(match => match.data).join('\n\n')}`);
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
    const response = await this.llm.generateContent(messages);

    return response.aiResponse;
  }
}
