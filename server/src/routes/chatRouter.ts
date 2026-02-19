import { Router } from 'express';
import { ChatController } from '../controllers/chatController';

const router = Router();
const chatController = new ChatController();

router.get('/', chatController.test);

export default router;
