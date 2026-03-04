import { config, isProduction } from '@/config';
import cors from 'cors';
import express, { Express } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler';
import apiRouter from './routes';

export const createApp = (): Express => {
  const app: Express = express();

  // Security & Logging
  app.use(helmet());
  app.use(cors());
  app.use(morgan(isProduction ? 'combined' : 'dev'));
  app.use(rateLimit(config.ratelimit));

  // Parsers
  app.use(express.json());
  app.disable('x-powered-by');

  // Routes
  app.use('/api/v1', apiRouter);

  app.use(errorHandler);

  return app;
};
