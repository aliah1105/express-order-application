import { Request, Response, NextFunction } from 'express';
import { findVendor } from './admin.controller';
import { LoginVendorInput } from '../dto';
import { validatePassword } from '../utils';

export const loginVendor = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <LoginVendorInput>req.body;
    try {
        const user = await findVendor(email);
        if (user) {
            const validateUser = await validatePassword(password, user.password, user.salt);
            if (validateUser) {
                return res.json({ status: "success", message: "Logged in successfully", data: user });
            }
            return res.json({ status: "fail", message: "Invalid password" });
        }
        else {
            return res.json({ status: "fail", message: "Invalid email or password" });
        }
    }
    catch (error: any) {
        return res.status(500).json(
            {
                status: "fail",
                error: error.message
            }
        );
    }
}