import { ChatRequestBody, ChatResponseDto, GetModelResponseDto } from '@/schemas/chatSchema';
import { resumeService } from '@/services';
import { Request, Response } from 'express';

export class ChatController {
  async handleChatMessage(
    req: Request<object, object, ChatRequestBody>,
    res: Response<ChatResponseDto>
  ) {
    const { messages } = req.body;

    const result = await resumeService.processChatMessage(messages);
    res.status(200).json(result);
  }

  handleGetActiveModel(req: Request<object, object, object>, res: Response<GetModelResponseDto>) {
    const result = resumeService.getActiveModel();
    res.status(200).json(result);
  }
}
