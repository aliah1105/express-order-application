import { Request } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { VendorPayload } from '../dto';
import { APP_SECRET } from '../config';
import { AuthDto } from '../dto/auth.dto';

declare global {
    namespace Express {
        interface Request {
            user?: AuthDto
        }
    }
}

export const generateSalt = async () => {
    return await bcrypt.genSalt();
}

export const hashPassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
}

export const validatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
    return await hashPassword(enteredPassword, salt) === savedPassword;
}

export const generateSignature = (payload: VendorPayload) => {
    return jwt.sign(payload, APP_SECRET, { expiresIn: '1d' });
}

export const validateSignature = async (req: Request) => {
    const signature = req.get('Authorization');
    if (signature) {
        const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET) as AuthDto;
        req.user = payload;
        return true;
    }
    return false;
}