import type { ChatResponseDto, GetActiveModelResponseDto } from '@/models/chatDto';
import type ChatMessage from '@/models/chatMessage';
import axios, { type AxiosInstance } from 'axios';

export default class ChatService {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL_CHAT_API,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  public async sendChatMessage(messages: ChatMessage[]): Promise<ChatResponseDto> {
    const response = await this.httpClient.post<ChatResponseDto>('/api/v1/chat', { messages });

    if (response.status !== 200) {
      throw new Error('Failed to fetch AI response');
    }

    return response.data;
  }

  public async getActiveModel(): Promise<GetActiveModelResponseDto> {
    const response = await this.httpClient.get('/api/v1/chat/current-model');

    if (response.status !== 200) {
      throw new Error('Failed to fetch response');
    }

    return response.data;
  }
}
