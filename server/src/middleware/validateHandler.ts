import ValidationError from '@/errors/ValidationError';
import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodObject } from 'zod';

export const validate =
  (schema: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.issues
          .map(details => `${details.path.join('.')}: ${details.message}`)
          .join(',');

        return next(new ValidationError(errorMessage));
      }

      next(error);
    }
  };
