import { NextFunction, Request, Response } from 'express';
import moment from 'moment';

export class Logger {
    public static logRequests(req: Request, res: Response, next: NextFunction) {
        const date = moment().format('HH:MM:SS');
        console.info(`[${date}]`, '[api]', req.method.toUpperCase(), req.url);
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
