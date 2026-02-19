import { ChatRequestBody } from '@/schemas/chatSchema';
import { Request, Response } from 'express';

const MAX_HISTORY = 12;

export class ChatController {
  async handleMessage(req: Request<object, object, ChatRequestBody>, res: Response) {
    const { messages } = req.body;

    const trimmedHistory = messages.slice(-MAX_HISTORY);
    console.log(trimmedHistory);

    res.status(200).json({ message: 'ok' });
  }
}
