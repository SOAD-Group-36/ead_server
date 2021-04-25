import StatusCodes from 'http-status-codes';
import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import { pwdSaltRounds } from '@shared/constants';
import SellerDao from '@daos/Seller/SellerDao';
import { paramMissingError } from '@shared/constants';
import { UserRoles } from '@entities/User';
import { ISeller } from '@entities/Seller';

import SellerAuthRouter from './Auth';

const router = Router();
router.use('/auth', SellerAuthRouter);

const sellerDao = new SellerDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;


interface ICreateSellerRequest extends Request {
    body: {
        name: string,
        email: string,
        password: string,
    }
}


/******************************************************************************
 *                      Get All Sellers - "GET /api/seller/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    const sellers = await sellerDao.getAll();
    return res.status(OK).json(sellers);
});


/******************************************************************************
 *                      Get one Seller - "GET /api/seller/:sellerId"
 ******************************************************************************/

router.get('/:id', async (req: Request, res: Response) => {
    const sellers = await sellerDao.getOne(req.params.id);
    return res.status(OK).json(sellers);
});



/******************************************************************************
 *                       Add One - "POST /api/seller/add"
 ******************************************************************************/

router.post('/add', async (req: ICreateSellerRequest, res: Response) => {
    const seller = req.body;
    console.log(req.body);
    if (!seller) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    if (!req.body.password) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const pwdHash = bcrypt.hashSync(req.body.password, pwdSaltRounds);
    const sellerData: ISeller = {
        name: seller.name,
        email: seller.email,
        role: UserRoles.Seller,
        pwdHash: pwdHash,
    };
    await sellerDao.add(sellerData);
    return res.status(CREATED).end();
});


/******************************************************************************
 *                    Delete - "DELETE /api/seller/delete/:id"
 ******************************************************************************/

router.delete('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    await sellerDao.delete(id);
    return res.status(OK).end();
});



/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
