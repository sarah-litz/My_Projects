import express from 'express';
export declare function getMe(req: express.Request): Promise<{
    id: string;
} | undefined>;
