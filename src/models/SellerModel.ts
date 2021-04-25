import * as mongoose from "mongoose";
import { ISeller, DSeller } from "@entities/Seller";
import {UserRoles} from "@entities/User";

interface ISellerModel extends mongoose.Model<DSeller>{
    build(attr: ISeller): DSeller
}

const SellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    pwdHash: { type: String, required: true },
    role: { type: String, enum: UserRoles, required: true, default: UserRoles.Seller},
})

SellerSchema.statics.build = function (attr: ISeller) {
    return new Seller(attr);
}

const Seller: ISellerModel = mongoose.model<any, ISellerModel>('Seller', SellerSchema);

export {Seller, ISellerModel, SellerSchema }
