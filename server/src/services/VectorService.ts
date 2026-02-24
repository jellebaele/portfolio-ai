import { vectorIndex } from '@/database/vectorDatabase';
import { Message } from '@/schemas/chatSchema';

export default class VectorService {
  private readonly SIMILARITY_THRESHOLD = 0.75;

  public async getRelevantContext(
    lastUserPrompt: string,
    historyBeforeLast: Message[]
  ): Promise<string> {
    const query = this.createSearchQuery(lastUserPrompt, historyBeforeLast);

    const queryResult = await vectorIndex.query({
      data: query,
      topK: 5,
      includeData: true,
      includeVectors: false
    });

    const filteredResults = queryResult.filter(
      match => (match.score ?? 0) >= this.SIMILARITY_THRESHOLD
    );

    if (filteredResults.length === 0) {
      return '';
    }

    return queryResult.map(match => match.data).join('\n\n');
  }

  private createSearchQuery(lastUserPrompt: string, historyBeforeLast: Message[]): string {
    const lastUserMessage = historyBeforeLast.filter(m => m.role === 'user').at(-1)?.content || '';
    const combinedQuery = `${lastUserMessage} ${lastUserPrompt}`.trim();

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

    return combinedQuery;
  }
}
