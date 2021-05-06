import ProductDao from "@daos/Product/ProductDao";
import { IProduct } from "@entities/Product";
import { NOTFOUND } from "dns";
import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Types, Schema } from "mongoose";
import { SellerMW } from "../middleware";
const { BAD_REQUEST, CREATED, OK, NOT_FOUND } = StatusCodes;


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
        sellerId: Types.ObjectId | string,
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
                sellerId: (typeof req.body.sellerId === 'string') ? new Types.ObjectId(req.body.sellerId) : req.body.sellerId
            }
            await productDao.add(productData);
        } catch (error) {
            console.error(error);
        }
        res.status(200).json({}).end()
    }
)


/******************************************************************************
 *                      Get one Products - "GET /api/product/:id"
 ******************************************************************************/

router.get('/:id', async (req: Request, res: Response) => {
    console.log(req.params.id);
    if (req.params.id) {
        const products = await productDao.getOne(req.params.id);
        return res.status(OK).json(products);
    } else {
        return res.status(NOT_FOUND).json({'error': 'Product Not Found!'});
    }
});


export default router;
