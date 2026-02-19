import { ratelimitConfig } from '@/config';
import cors from 'cors';
import express, { Express } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import apiRouter from '../routes';

export const setupServer = (): Express => {
  const app: Express = express();

  const limiter = rateLimit(ratelimitConfig);

  app.use(cors());
  app.use(helmet());
  app.use(morgan('combined'));
  app.use(limiter);
  app.use(express.json());
  app.disable('x-powered-by');

  app.use('/api/v1', apiRouter);

  app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).json({ message: err.message });
  });

  return app;
};
