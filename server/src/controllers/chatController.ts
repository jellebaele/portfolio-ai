import { ChatRequestBody } from '@/schemas/chatSchema';
import { resumeService } from '@/services';
import { Request, Response } from 'express';

export class ChatController {
  async handleMessage(req: Request<object, object, ChatRequestBody>, res: Response) {
    const { messages } = req.body;

    const response = resumeService.processChatMessage(messages);

    res.status(200).json({ status: 'success', data: response });
  }
}
