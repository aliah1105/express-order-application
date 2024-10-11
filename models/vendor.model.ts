import mongoose, { Schema, Document, Model, Mongoose } from 'mongoose';

interface VendorDocument extends Document {
    name: string;
    ownerName: string;
    foodType: [string];
    pinCode: string;
    address: string;
    phone: number | string;
    email: string;
    password: string;
    salt: string;
    serviceAvailable: boolean;
    coverImages: [string],
    rating: number,
    // foods: any
}

const vendorSchema = new Schema({
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodType: { type: [String] },
    address: { type: String },
    pinCode: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    serviceAvailable: { type: Boolean },
    coverImagesame: { type: [String] },
    rating: { type: Number },
    // foods: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: 'food'
    // }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    }
});

const Vendor = mongoose.model<VendorDocument>('Vendor', vendorSchema);

export { Vendor }