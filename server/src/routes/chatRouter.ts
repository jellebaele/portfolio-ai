import { chatController } from '@/controllers';
import { catchAsync } from '@/middleware/errorHandler';
import { validate } from '@/middleware/validateHandler';
import { Router } from 'express';
import { ChatRequestSchema } from '../schemas/chatSchema';

const router = Router();

router.post('/', validate(ChatRequestSchema), catchAsync(chatController.handleChatMessage));
router.get('/current-model', chatController.handleGetActiveModel);

export default router;
