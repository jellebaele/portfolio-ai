import { ratelimitConfig } from '@/config';
import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
  });

  return app;
};
