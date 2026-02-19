import { catchAsync } from '@/middleware/errorHandler';
import { validate } from '@/middleware/validateHandler';
import { Router } from 'express';
import { ChatController } from '../controllers/chatController';
import { ChatRequestSchema } from '../schemas/chatSchema';

const router = Router();
const chatController = new ChatController();

router.post('/', validate(ChatRequestSchema), catchAsync(chatController.handleMessage));

export default router;
