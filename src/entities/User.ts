import {Document} from "mongoose";
export enum UserRoles { 
    Standard = "Standard",
    Admin = "Admin",
    Seller = "Seller",
    Logistics = "Logistics",
}

export interface IUser{
    id?: any;
    name: string;
    email: string;
    pwdHash: string;
    role: UserRoles;
}

export interface DUser extends IUser, Document{
    
}
