import { config } from '@/config';
import { vectorIndex } from '@/database/database';
import { Message } from '@/schemas/chatSchema';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';

const MAX_HISTORY = 12;
const genAi = new GoogleGenerativeAI(config.llm.geminiApiKey as string);
const model: GenerativeModel = genAi.getGenerativeModel({
  model: 'gemini-2.5-flash',
  systemInstruction:
    "You are Jelle's AI assistant. Use the provided context to answer questions about his career. Be professional but approachable."
});

export default class ResumeService {
  async processChatMessage(messages: Message[]): Promise<string> {
    const trimmedHistory = messages.slice(-MAX_HISTORY);

    const userMessages = trimmedHistory.filter(m => m.role === 'user');
    const lastUserMessage = userMessages[userMessages.length - 1].content;

    const queryResult = await vectorIndex.query({
      data: lastUserMessage,
      topK: 5,
      includeData: true
    });

    const context = queryResult.map(match => match.data).join('\n\n');

    const prompt = `
      Context from Jelle's resume and profile:
      ${context}

      Based on the context above, answer the user's question. 
      If the information isn't in the context, say you don't know rather than making it up.

      User Question: ${lastUserMessage}
    `;

    const result = await model.generateContent(prompt);

    return result.response.text();
  }
}
