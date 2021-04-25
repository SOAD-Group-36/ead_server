import { Router } from 'express';
import UserRouter from './Users';
import AuthRouter from './Auth';
import SellerRouter from './seller/Seller';
import ProductRouter from './product/Product';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/auth', AuthRouter);
router.use('/seller', SellerRouter);
router.use('/product', ProductRouter);

// Export the base-router
export default router;
