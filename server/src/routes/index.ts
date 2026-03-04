import { Router } from 'express';
import chatRouter from './chatRouter';
import healthRouter from './healthRouter';

const apiRouter = Router();

apiRouter.use('/chat', chatRouter);
apiRouter.use('/health', healthRouter);

export default apiRouter;
