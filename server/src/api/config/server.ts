import cors from 'cors';
import express, { Express } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import apiRouter from '../routes';

export const setupServer = (): Express => {
  const app: Express = express();

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56 // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  });

  app.use(cors());
  app.use(helmet());
  app.use(limiter);
  app.use(express.json());
  app.disable('x-powered-by');

  app.use('/api/v1', apiRouter);

  app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).json({ message: err.message });
  });

  return app;
};
