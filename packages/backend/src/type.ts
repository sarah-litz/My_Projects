import { Request, Response } from 'express';

export type ContextType = {
  me?: { id: string };
  req: Request;
  res: Response;
};
