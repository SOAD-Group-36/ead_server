import ProductDao from "@daos/Product/ProductDao";
import { IProduct } from "@entities/Product";
import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema } from "mongoose";
import { SellerMW } from "../middleware";
const { BAD_REQUEST, CREATED, OK } = StatusCodes;


const router = Router();

const productDao = new ProductDao()

/******************************************************************************
 *                      Get All Products - "GET /api/product/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    const products = await productDao.getAll();
    return res.status(OK).json(products);
});


/******************************************************************************
 *                         Add One - "POST /api/product/add"
 ******************************************************************************/

interface ICreateProductRequest extends Request {
    body: {
        name: string,
        description: string,
        price: number,
        sellerId: Schema.Types.ObjectId | string,
        stock: number,
    }
}

router.post('/add', SellerMW,
    async (req: ICreateProductRequest, res: Response) => {
        try {
            const productData: IProduct = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock,
                sellerId: (typeof req.body.sellerId === 'string') ? new Schema.Types.ObjectId(req.body.sellerId) : req.body.sellerId
            }
            await productDao.add(productData);
        } catch (error) {
            console.error(error);
        }
    }
)


export default router;
