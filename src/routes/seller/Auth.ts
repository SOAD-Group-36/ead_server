import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';

import SellerDao from '@daos/Seller/SellerDao';
import { JwtService } from '@shared/JwtService';
import { paramMissingError, loginFailedErr, cookieProps, IRequest } from '@shared/constants';

const router = Router();
const sellerDao = new SellerDao();
const jwtService = new JwtService();
const { BAD_REQUEST, OK, UNAUTHORIZED } = StatusCodes;



/******************************************************************************
 *                      Login Seller - "POST /api/seller/auth/login"
 ******************************************************************************/

router.post('/login', async (req: IRequest, res: Response) => {
    // Check email and password present
    const { email, password } = req.body;
    if (!(email && password)) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    // Fetch seller
    const seller = await sellerDao.getOne(email);
    if (!seller) {
        return res.status(UNAUTHORIZED).json({
            error: loginFailedErr,
        });
    }
    // Check password
    const pwdPassed = await bcrypt.compare(password, seller.pwdHash);
    if (!pwdPassed) {
        return res.status(UNAUTHORIZED).json({
            error: loginFailedErr,
        });
    }
    // Setup Admin Cookie
    const jwt = await jwtService.getJwt({
        id: seller.id,
        role: seller.role,
    });
    const { key, options } = cookieProps;
    res.cookie(key, jwt, options);
    // Return
    return res.status(OK).end();
});



/******************************************************************************
 *                      Logout - "GET /api/seller/auth/logout"
 ******************************************************************************/

router.get('/logout', (req: Request, res: Response) => {
    const { key, options } = cookieProps;
    res.clearCookie(key, options);
    return res.status(OK).end();
});



/******************************************************************************
 *                                 Export Router
 ******************************************************************************/

export default router;
