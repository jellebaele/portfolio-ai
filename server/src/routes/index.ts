import { Router } from 'express';
import chatRouter from './chatRouter';

const apiRouter = Router();

apiRouter.use('/chat', chatRouter);

export default apiRouter;
