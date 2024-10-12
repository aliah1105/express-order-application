import mongoose from "mongoose";
import { DB_URL } from '../config';


export const connectDb = async () => {
    try {
        await mongoose.connect(
            DB_URL,
        );
        console.log("MongoDB connected successfully!");
    } catch (error: any) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
}