import express, { Request, Response } from 'express';
import { getVendorProfile, loginVendor } from '../controllers';
import { authentication } from '../middlewares';

const router = express.Router();

router.post('/login', loginVendor);

router.use(authentication)
router.get('/profile', getVendorProfile);
// router.patch('/profile', loginVendor);
// router.patch('/service', loginVendor);


export { router as VendorRouter };