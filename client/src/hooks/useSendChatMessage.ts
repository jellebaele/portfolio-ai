import type ChatMessage from '@/models/chatMessage';
import { chatService } from '@/services';
import { useMutation } from '@tanstack/react-query';

export const useSendChatMessage = (onResponseCallback?: (aiMessage: ChatMessage) => void) => {
  return useMutation({
    mutationFn: (messages: ChatMessage[]) => chatService.sendChatMessage(messages),

    onSuccess: response => {
      const aiMsg: ChatMessage = {
        id: response.id,
        role: response.role,
        content: response.data
      };
      if (onResponseCallback) onResponseCallback(aiMsg);
    },

    onError: error => {
      console.error('Chat mutation error:', error);
      const errorMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content:
          " I'm sorry, I'm having trouble connecting to my brain right now. Please try again later."
      };

      if (onResponseCallback) onResponseCallback(errorMsg);
    }
  });
};
