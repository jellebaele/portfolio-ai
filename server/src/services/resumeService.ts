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

    const result = await model.generateContent(prompt);

    return result.response.text();
  }
}
