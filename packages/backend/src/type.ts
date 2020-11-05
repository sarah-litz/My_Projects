import { Request, Response } from 'express';

export type ContextType = {
  /**
   * The current user's details (if logged in)
   */
  me?: {
    id: string;
  };
  req: Request;
  res: Response;
};
