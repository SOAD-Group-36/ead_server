import * as mongoose from "mongoose";
import { IUser, DUser, UserRoles } from "@entities/User";

interface IUserModel extends mongoose.Model<DUser> {
    build(attr: IUser): DUser
}

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    pwdHash: { type: String, required: true },
    role: { type: String, enum: UserRoles, required: true, default: UserRoles.Standard},
});


UserSchema.statics.build = function (attr: IUser) {
    return new User(attr);
}

const User: IUserModel = mongoose.model<any, IUserModel>('User', UserSchema);

export { User, IUserModel };
