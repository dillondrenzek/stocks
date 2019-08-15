import { NextFunction, Request, Response } from 'express';

export class Logger {
    public static logRequest(req: Request, res: Response, next: NextFunction) {
        console.info('[api]', req.method.toUpperCase(), req.url);
        next();
    }
}
