import type ChatMessage from '@/models/chatMessage';
import { chatService } from '@/services';
import { useMutation } from '@tanstack/react-query';

export const useSendChatMessage = (onSuccessCallback?: (aiMessage: ChatMessage) => void) => {
  return useMutation({
    mutationFn: (messages: ChatMessage[]) => chatService.sendChatMessage(messages),

    onSuccess: response => {
      const aiMsg: ChatMessage = {
        id: response.id,
        role: response.role,
        content: response.data
      };
      if (onSuccessCallback) onSuccessCallback(aiMsg);
    },

    onError: error => console.error('Chat mutation error:', error)
  });
};
