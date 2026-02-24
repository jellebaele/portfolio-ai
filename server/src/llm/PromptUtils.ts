import { Message } from '@/schemas/chatSchema';

export class PromptUtils {
  static buildSystemInstructions(): string {
    return `
      You are Jelle's professional AI assistant.
      Use the provided context to answer questions about his career.
      Be professional but approachable.

      STRICT RULES:
        1. Use ONLY the information provided in the "RESUME CONTEXT" section below.
        2. If the answer is not contained within the provided context, or if the user asks about general knowledge (history, math, politics, etc.), you MUST respond with: "I'm sorry, I only have information regarding Jelle's professional experience and portfolio."
        3. Do NOT use your own internal knowledge to answer questions. 
        4. If the context is empty, state that you don't have that information.
    `.trim();
  }

  static buildStrictPrompt(userPrompt: string, context: string, historyString?: string): string {
    const historyBlock = historyString
      ? `<CONVERSATION_HISTORY>\n${historyString}\n</CONVERSATION_HISTORY>`
      : '';

    return `
      <CONTEXT_RULES>
      - Answer the question ONLY using the information in <RESUME_DATA>.
      - If the answer isn't there, say: "I'm sorry, I don't have information about that in Jelle's portfolio." in the appropriate language.
      </CONTEXT_RULES>

      ${historyBlock}

      <RESUME_DATA>
      ${context || 'No relevant resume data found for this specific query.'}
      </RESUME_DATA>

      <USER_QUESTION>
      ${userPrompt}
      </USER_QUESTION>
    
      Please provide a professional answer based on the data above.
    `.trim();
  }

  static buildStandaloneSearchQueryPrompt(userPrompt: string, history: Message[]): string {
    const historyString = this.mapHistoryToString(history);

    return `
    Given the following conversation history and a follow-up question, 
    rephrase the follow-up question to be a standalone search query.
    
    - Do NOT answer the question.
    - If the follow-up is already a standalone question, return it as is.
    - Focus on technical keywords and the subject of the conversation.

    HISTORY:
    ${historyString}
    
    FOLLOW-UP: ${userPrompt}
    
    STANDALONE QUERY:`.trim();
  }

  static mapHistory(history: Message[]) {
    return history.map(m => ({
      role: m.role === 'user' ? ('user' as const) : ('assistant' as const),
      content: m.content
    }));
  }

  static mapHistoryToString(history: Message[]) {
    return history.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n');
  }
}
