import type { ChatResponseDto } from '@/models/chatDto';
import type ChatMessage from '@/models/chatMessage';

export default class ChatService {
  public async sendChatMessage(messages: ChatMessage[]): Promise<ChatResponseDto> {
    const response = await fetch('http://localhost:5000/api/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messages })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch AI response');
    }

    const result = await response.json();
    return result;
  }
}
