import { Request, Response, NextFunction } from 'express';
import { CreateVendorInput } from '../dto';
import { Vendor } from '../models/vendor.model';
import { generateSalt, hashPassword } from '../utils';

export const createVendor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, address, email, foodType, ownerName, password, phone, pinCode } = <CreateVendorInput>req.body;

        const vendorExist = await Vendor.findOne({ email });

        if (vendorExist !== null) {
            return res.json({ message: "vendor with this email address is exist" });
        }

        const salt = await generateSalt();

        const hashesPassword = await hashPassword(password, salt);

        const vendor = await Vendor.create({
            name,
            ownerName,
            email,
            password: hashesPassword,
            address,
            foodType,
            phone,
            pinCode,
            salt,
            rating: 0,
            coverImages: [],
            serviceAvailable: false
        });

        return res.status(201).json({
            status: "success",
            data: vendor
        });
    } catch (error: any) {
        return res.status(500).json({ "error": error.message });
    }
}

export const getVendors = async (req: Request, res: Response, next: NextFunction) => { }

export const getVendorById = async (req: Request, res: Response, next: NextFunction) => { }