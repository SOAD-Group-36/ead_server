import * as mongoose from "mongoose";
import { IProduct, DProduct } from "@entities/Product";
import {SellerSchema} from "./SellerModel";
interface IProductModel extends mongoose.Model<DProduct> {
    build(attr: IProduct): DProduct
}

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    sellerId: {type: mongoose.Schema.Types.ObjectId },
    seller: SellerSchema,
    stock: { type: Number, required: true },
})

ProductSchema.statics.build = function (attr: IProduct) {
    return new Product(attr);
}

const Product: IProductModel = mongoose.model<any, IProductModel>('Product', ProductSchema);

export { Product, IProductModel };
