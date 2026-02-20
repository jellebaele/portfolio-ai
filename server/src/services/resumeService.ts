import { Message } from '@/schemas/chatSchema';

const MAX_HISTORY = 12;

export default class ResumeService {
  async processChatMessage(messages: Message[]) {
    const trimmedHistory = messages.slice(-MAX_HISTORY);

    const userMessages = trimmedHistory.filter(m => m.role === 'user');
    const lastUserMessage = userMessages[userMessages.length - 1].content;

    return lastUserMessage;
  }
}
