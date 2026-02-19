import { catchAsync } from '@/middleware/errorHandler';
import { Router } from 'express';
import { ChatController } from '../controllers/chatController';

const router = Router();
const chatController = new ChatController();

router.get('/', catchAsync(chatController.test));

export default router;
