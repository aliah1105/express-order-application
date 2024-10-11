import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { AdminRouter, VendorRouter } from './routes/index';
import mongoose from 'mongoose';
import { DB_URL } from './config';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', AdminRouter)
app.use('/vendor', VendorRouter);

// db connection
mongoose.connect(DB_URL)
    .then(() => {
        console.log('database connected');
    })
    .catch((err) => {
        console.log('somethig went wrong in connection: ', err);
    });


app.listen(PORT, () => {
    // console.clear();
    console.log(`app listening on port ${PORT}`);
});