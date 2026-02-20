import { ChatRequestBody } from '@/schemas/chatSchema';
import { resumeService } from '@/services';
import { Request, Response } from 'express';
import { v4 } from 'uuid';

export class ChatController {
  async handleMessage(req: Request<object, object, ChatRequestBody>, res: Response) {
    const { messages } = req.body;

    const response = await resumeService.processChatMessage(messages);

    res.status(200).json({ id: v4(), data: response, role: 'assistant' });
  }
}
