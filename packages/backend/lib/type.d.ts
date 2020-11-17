import { Request, Response } from 'express';
export declare type ContextType = {
    me?: {
        id: string;
    };
    req: Request;
    res: Response;
};
