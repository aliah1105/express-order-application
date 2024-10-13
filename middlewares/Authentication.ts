import { Request, Response, NextFunction } from 'express';
import { validateSignature } from '../utils';

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    const validate = await validateSignature(req);
    if (validate) {
        next();
    }
    return res.status(401).json({
        status: "fail",
        message: "you dont have access to this route"
    })
}