import express, { Request, Response } from 'express';
import { getVendorProfile, loginVendor, updateVendorProfile, updateVendorService } from '../controllers';
import { authentication } from '../middlewares';

const router = express.Router();

router.post('/login', loginVendor);

router.use(authentication)
router.get('/profile', getVendorProfile);
router.patch('/profile', updateVendorProfile);
router.patch('/service', updateVendorService);


export { router as VendorRouter };