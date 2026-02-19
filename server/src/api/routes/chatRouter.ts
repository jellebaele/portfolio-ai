import { ChatController } from 'api/controllers/chatController';
import { Router } from 'express';

const router = Router();
const chatController = new ChatController();

router.get('/', chatController.test);

export default router;
