import OrderDao from "@daos/Order/OrderDao";
import { IOrder, OrderStatus } from "@entities/Order";
import { Address } from "cluster";
import { NOTFOUND } from "dns";
import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Types, Schema } from "mongoose";
const { BAD_REQUEST, CREATED, OK, NOT_FOUND } = StatusCodes;


const router = Router();

const orderDao = new OrderDao()

/******************************************************************************
 *                      Get All Orders - "GET /api/order/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    const orders = await orderDao.getAll();
    return res.status(OK).json(orders);
});


/******************************************************************************
 *                         Add One - "POST /api/order/add"
 ******************************************************************************/

interface ICreateOrderRequest extends Request {
    body: {
        customerId: Types.ObjectId,
        productId: Types.ObjectId,
        quanity: number,
        amount: number,
        placedOn?: Date,
        status: OrderStatus,
        address: Address,
    }
}

router.post('/add', 
    async (req: ICreateOrderRequest, res: Response) => {
        try {
            const orderData: IOrder = {
                customerId: req.body.customerId,
                productId: req.body.productId,
                address: req.body.address,
                amount: req.body.amount,
                status: req.body.status,
                placedOn: req.body.placedOn,
                quanity: req.body.quanity,
                customer: null,
                product: null,
            }
            await orderDao.add(orderData);
        } catch (error) {
            console.error(error);
        }
        res.status(200).json({}).end()
    }
)


/******************************************************************************
 *                      Get one Orders - "GET /api/order/:id"
 ******************************************************************************/

router.get('/:id', async (req: Request, res: Response) => {
    console.log(req.params.id);
    if (req.params.id) {
        const orders = await orderDao.getOne(req.params.id);
        return res.status(OK).json(orders);
    } else {
        return res.status(NOT_FOUND).json({'error': 'Order Not Found!'});
    }
});


export default router;
