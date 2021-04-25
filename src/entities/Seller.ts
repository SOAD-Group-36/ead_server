import {Document} from "mongoose";
import {IUser, UserRoles} from "@entities/User";

export interface ISeller extends IUser{
    id?: any;
    name: string;
    email: string;
    pwdHash: string;
    role: UserRoles;
}

export interface DSeller extends ISeller, Document{
    
}
