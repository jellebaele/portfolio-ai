import { ChatRequestBody, ChatResponseDto } from '@/schemas/chatSchema';
import { resumeService } from '@/services';
import { Request, Response } from 'express';

export class ChatController {
  async handleMessage(
    req: Request<object, object, ChatRequestBody>,
    res: Response<ChatResponseDto>
  ) {
    const { messages } = req.body;

    const result = await resumeService.processChatMessage(messages);
    res.status(200).json(result);
  }
}
