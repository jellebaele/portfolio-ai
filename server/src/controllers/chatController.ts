import { Request, Response } from 'express';

export class ChatController {
  test = (req: Request, res: Response) => {
    res.status(200).send();
  };
}
