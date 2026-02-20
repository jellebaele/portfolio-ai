import { z } from 'zod';

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1)
});

export const ChatRequestSchema = z.object({
  body: z.object({
    messages: z.array(MessageSchema).min(1)
  })
});

export interface ChatResponseDto {
  id: string;
  role: 'assistant';
  data: string;
  status: 'success' | 'fail';
}

export type ChatRequestBody = z.infer<typeof ChatRequestSchema>['body'];
export type Message = z.infer<typeof MessageSchema>;
