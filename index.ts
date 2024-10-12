import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { AdminRouter, VendorRouter } from './routes/index';
import mongoose from 'mongoose';
import { DB_URL } from './config';
import { connectDb } from './utils/dbConnection';

dotenv.config({ path: __dirname + '.env' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', AdminRouter)
app.use('/vendor', VendorRouter);

// db connection


app.listen(PORT, async () => {
    console.log(`app listening on port ${PORT}`);
    await connectDb()
});