import { Request, Response, NextFunction } from 'express';
import { findVendor } from './admin.controller';
import { LoginVendorInput } from '../dto';
import { generateSignature, validatePassword } from '../utils';

export const loginVendor = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <LoginVendorInput>req.body;
    try {
        const user = await findVendor('', email);
        if (user) {
            const validateUser = await validatePassword(password, user.password, user.salt);
            if (validateUser) {
                const payload = {
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    foodType: user.foodType,
                }
                const signature = generateSignature(payload);
                return res.json(signature);
                // return res.json({ status: "success", message: "Logged in successfully", data: user });
            }
            return res.status(401).json({ status: "fail", message: "Invalid password" });
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

export const getVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (user) {
            const existUser = await findVendor(user._id);
            return res.json({
                status: "success",
                data: existUser
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            status: "error",
            error: error.message
        });
    }
}

export const updateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {

    }
}

export const updateVendorService = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {

    }
}