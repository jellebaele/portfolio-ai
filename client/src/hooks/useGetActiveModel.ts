import { chatService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const useGetActiveModel = () => {
  return useQuery({
    queryKey: ['chat-intial-state'],
    queryFn: async () => {
      const response = await chatService.getActiveModel();
      return response;
    },
    staleTime: Infinity
  });
};
