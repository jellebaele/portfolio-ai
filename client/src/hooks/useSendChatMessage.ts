import type ChatMessage from '@/models/chatMessage';
import { chatService } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export const useSendChatMessage = (onResponseCallback?: (aiMessage: ChatMessage) => void) => {
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (messages: ChatMessage[]) => chatService.sendChatMessage(messages),

    onSuccess: response => {
      const aiMsg: ChatMessage = {
        id: response.id,
        role: response.role,
        content: response.data,
        meta: {
          llmModel: response.meta.llmModel,
          provider: response.meta.provider
        }
      };
      if (onResponseCallback) onResponseCallback(aiMsg);
    },

    onError: error => {
      console.error('Chat mutation error:', error);
      const errorMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: t('common.errors.connection')
      };

      if (onResponseCallback) onResponseCallback(errorMsg);
    }
  });
};
