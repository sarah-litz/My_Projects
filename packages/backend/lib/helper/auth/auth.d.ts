import { Response } from 'express';
import { User } from '../../models/User';
export declare const sendRefreshToken: (res: Response, token: string) => void;
export declare const createAccessToken: (user: User) => string;
export declare const createRefreshToken: (user: User) => string;
