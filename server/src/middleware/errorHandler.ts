import { isProduction } from '@/config';
import AppError from '@/errors/AppError';
import { NextFunction, Request, RequestHandler, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;

  if (err instanceof AppError) statusCode = (err as AppError).statusCode || 500;

  if (statusCode === 500) {
    console.log('INTERNAL_ERROR', err.stack);
  }

  res.status(statusCode).json({
    status: statusCode >= 500 ? 'error' : 'fail',
    message: isProduction ? 'Internal server error' : err.message || 'Internal server error',
    ...(isProduction ? {} : { stack: err.stack, name: err.name })
  });
};

export const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
