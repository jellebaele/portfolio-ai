import { vectorIndex } from '@/database/database';
import { ILlmProvider } from '@/llm/ILlmProvder';
import { ChatResponseDto, Message } from '@/schemas/chatSchema';
import { v4 as uuidv4 } from 'uuid';

const MAX_HISTORY = 12;

export default class ResumeService {
  private llm: ILlmProvider;

  constructor(llm: ILlmProvider) {
    this.llm = llm;
  }

  async processChatMessage(messages: Message[]): Promise<ChatResponseDto> {
    const trimmedHistory = messages.slice(-MAX_HISTORY);

    const userMessages = trimmedHistory.filter(m => m.role === 'user');
    const lastUserMessage = userMessages[userMessages.length - 1].content;
    const previousMessages = trimmedHistory.slice(0, trimmedHistory.length - 1);

    // AI models are bad at parsing javascript objects, make string:
    const chatHistoryString = previousMessages
      .map(m => `${m.role.toUpperCase()}: ${m.content}`)
      .join('\n');

    const queryResult = await vectorIndex.query({
      data: lastUserMessage,
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

      CURRENT QUESTION: ${lastUserMessage}
    `;

    const result = await this.llm.generateContent(prompt);

    return {
      id: uuidv4(),
      role: 'assistant',
      data: result,
      status: 'success'
    };
  }
}
