import * as mongoose from "mongoose";
import { IOrder, DOrder, OrderStatus } from "@entities/Order";
import {SellerSchema} from "./SellerModel";
import {ProductSchema} from "./ProductModel";
import {UserSchema} from "./UserModel";
import { Address } from "@entities/Address";
interface IOrderModel extends mongoose.Model<DOrder> {
    build(attr: IOrder): DOrder
}

const OrderSchema = new mongoose.Schema({
    customer: UserSchema,
    customerId: {type: mongoose.Types.ObjectId },
    product: ProductSchema,
    productId: {type: mongoose.Types.ObjectId },
    amoung: { type: Number, required: true },
    status: {type: String, enum: OrderStatus, required: true, default: OrderStatus.Placed},
    address: { type: Address, required: true },
})

OrderSchema.statics.build = function (attr: IOrder) {
    return new Order(attr);
}

const Order: IOrderModel = mongoose.model<any, IOrderModel>('Order', OrderSchema);

export { Order, IOrderModel };
