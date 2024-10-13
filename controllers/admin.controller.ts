import { Request, Response, NextFunction } from 'express';
import { CreateVendorInput } from '../dto';
import { Vendor } from '../models/vendor.model';
import { generateSalt, hashPassword } from '../utils';

export const findVendor = async (id: string | undefined, email?: string) => {
    if (email) {
        return await Vendor.findOne({ email });
    }
    else {
        return await Vendor.findById(id);
    }
}

export const createVendor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, address, email, foodType, ownerName, password, phone, pinCode } = <CreateVendorInput>req.body;

        const vendorExist = await findVendor(email);
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
        return res.status(500).json({ status: "fail", error: error.message });
    }
}

export const getVendors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vendors = await Vendor.find();
        if (vendors !== null) {
            return res.status(200).json({
                status: "success",
                data: vendors
            });
        }
        return res.status(404).json({
            message: "No vendors found"
        });
    } catch (error: any) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
}

export const getVendorById = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    try {
        const vendor = await findVendor(userId);

        if (vendor !== null) {
            return res.status(200).json({
                status: "success",
                data: vendor
            });
        }
        return res.status(404).json({
            status: "fail",
            message: "Vendor does not exist",
        });
    } catch (error: any) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
}