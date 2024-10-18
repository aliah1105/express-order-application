import { Request, Response, NextFunction } from 'express';
import { findVendor } from './admin.controller';
import { LoginVendorInput } from '../dto';
import { generateSignature, validatePassword } from '../utils';
import { Vendor } from '../models/vendor.model';

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
        else {
            return res.status(404).json({
                status: "fail",
                message: "vendor does not exist"
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
        const { name, phone, address, foodType } = req.body;
        const user = req.user;
        if (user) {
            const existingVendor = await findVendor(user._id);
            if (existingVendor !== null) {
                existingVendor.name = name;
                existingVendor.phone = phone;
                existingVendor.address = address;
                existingVendor.foodType = foodType;

                const changedResult = await existingVendor.save();
                return res.json({
                    status: "success", 
                    "message": "vendor updated successfully",
                    vendor: changedResult
                });
            }
            return res.json({
                status: "success",
                data: existingVendor
            });
        }
        else {
            return res.status(404).json({
                status: "fail",
                message: "vendor does not exist"
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            status: "error",
            error: error.message
        });
    }
}

export const updateVendorService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (user) {
            const existingVendor = await findVendor(user._id);
            if (existingVendor !== null) {
                existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
                const changedResult = await existingVendor.save();
                return res.json({
                    status: "success", 
                    "message": "vendor service updated successfully",
                    vendor: changedResult
                });
            }
            return res.json({
                status: "success",
                data: existingVendor
            });
        }
        else {
            return res.status(404).json({
                status: "fail",
                message: "vendor does not exist"
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            status: "error",
            error: error.message
        });
    }
}