import { z } from 'zod';

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1)
});

export const ChatRequestSchema = z.object({
  body: z.object({
    messages: z.array(MessageSchema).min(1)
  })
});

export type ChatRequestBody = z.infer<typeof ChatRequestSchema>['body'];
export type Message = z.infer<typeof MessageSchema>;
