import { Address } from "cluster";
import { IProduct } from "./Product";
import { IUser } from "./User";
import { Document, Types } from "mongoose";

export enum OrderStatus {
    Placed = 'Placed',
    Processed = 'Processed',
    Packed = 'Packed',
    Shipped = 'Shipped',
    Delivered = 'Delivered',
    Rejected = 'Rejected',
    Returned = 'Returned',
    Received = 'Received',
}

export interface IOrder {
    customer: IUser | null,
    product: IProduct | null,
    customerId: Types.ObjectId,
    productId: Types.ObjectId,
    quanity: number,
    amount: number,
    placedOn?: Date,
    status: OrderStatus,
    address: Address,
}
export interface DOrder extends IOrder, Document {

}
