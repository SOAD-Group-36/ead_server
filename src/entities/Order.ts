import { Address } from "cluster";
import { IProduct } from "./Product";
import { IUser } from "./User";
import { Document } from "mongoose";

export enum OrderStatus {
    Placed,
    Processed,
    Packed,
    Shipped,
    Delivered,
    Rejected,
    Returned,
    Received,
}

export interface IOrder {
    customer: IUser | null,
    product: IProduct | null,
    customerId: number,
    productId: number,
    quanity: number,
    amount: number,
    placedOn: Date,
    status: OrderStatus,
    address: Address,
}

/*
export class Order implements IOrder {
    public customer: IUser | null;
    public product: IProduct | null;
    public quanity: number;
    public amount: number;
    public placedOn: Date;
    public status: OrderStatus;
    public address: Address;
    public customerId: number;
    public productId: number;

    constructor(
        customer: IUser | number,
        product: IProduct | number,
        quanity: number,
        amount: number,
        placedOn: Date,
        status: OrderStatus,
        address: Address,
    ) {
        if (typeof customer === 'number' || typeof customer === 'undefined') {
            this.customer = null;
            this.customerId = customer;
        } else {
            this.customer = customer;
            this.customerId = customer.id;
        }
        if (typeof product === 'number' || typeof product === 'undefined') {
            this.product = null;
            this.productId = product;
        } else {
            this.product = product;
            this.productId = product.id;
        }
        this.quanity = quanity;
        this.amount = amount;
        this.status = status;
        this.placedOn = placedOn;
        this.address = address;
    }
}
*/

export interface DOrder  extends IOrder, Document{

}
