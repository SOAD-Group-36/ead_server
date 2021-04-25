import { ISeller } from "./Seller";
import {Document, Schema} from "mongoose";

export interface IProduct {
    id?: any;
    name: string;
    description: string;
    price: number;
    seller?: ISeller | null;
    sellerId: Schema.Types.ObjectId;
    stock: number;
}

export interface DProduct extends IProduct, Document{

}

// export class Product implements IProduct {
//     public id: number;
//     public name: string;
//     public description: string;
//     public price: number;
//     public seller: IUser | null;
//     public sellerId: number;
//     public stock: number;

//     constructor(
//         name: string,
//         description: string,
//         price: number,
//         seller: number | IUser,
//         stock: number,
//         id?: number,
//     ) {
//         this.name = name || '';
//         this.description = description || '';
//         this.price = price;
//         this.stock = stock;
//         if (typeof seller === 'number' || typeof seller === 'undefined') {
//             this.seller = null;
//             this.sellerId = seller;
//         } else {
//             this.seller = seller;
//             this.sellerId = seller.id;
//         }
//         this.id = id || -1;

//     }
// }
