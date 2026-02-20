import { config } from '@/config';
import { Message } from '@/schemas/chatSchema';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { ILlmProvider } from '../ILlmProvider';

export default class GeminiProvider implements ILlmProvider {
  private model: GenerativeModel;

  constructor(systemInstruction: string) {
    const genAi = new GoogleGenerativeAI(config.llm.apiKey as string);

    this.model = genAi.getGenerativeModel({
      model: config.llm.primaryModel,
      systemInstruction: systemInstruction
    });
  }
  async generateContent(userPrompt: string, history: Message[], context: string): Promise<string> {
    const chatHistory = this.formatChatHistory(history);
    const prompt = this.buildPrompt(chatHistory, context, userPrompt);
    const aiContent = await this.model.generateContent(prompt);
    return aiContent.response.text();
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
