import express from 'express';
import bodyParser from 'body-parser';
import { AdminRouter, VendorRouter } from './routes/index';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', AdminRouter)
app.use('/vendor', VendorRouter);




app.listen(PORT, () => {
    console.clear();
    console.log(`app listening on port ${PORT}`);
});