import { NextFunction, Request, Response } from 'express';

export class Logger {
    public static logRequest(req: Request, res: Response, next: NextFunction) {
        console.info('[api]', req.method.toUpperCase(), req.url);
        next();
    }
}

export function accessControlAllowOrigin(allow: string) {
    return function (req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin', allow);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    }
}
