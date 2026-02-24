import { vectorIndex } from '@/database/vectorDatabase';
import { Message } from '@/schemas/chatSchema';

export default class VectorService {
  public async getRelevantContext(
    lastUserPrompt: string,
    historyBeforeLast: Message[]
  ): Promise<string> {
    const query = this.createSearchQuery(lastUserPrompt, historyBeforeLast);

    const queryResult = await vectorIndex.query({
      data: query,
      topK: 5,
      includeData: true
    });
    return queryResult.map(match => match.data).join('\n\n');
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
