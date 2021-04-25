import { DSeller, ISeller } from '@entities/Seller';
import { Seller } from "@models/SellerModel";
// import { ObjectId } from "mongodb";

export interface ISellerDao {
    getOne: (email: string) => Promise<DSeller | null>;
    getAll: () => Promise<DSeller[]>;
    add: (seller: ISeller) => Promise<void>;
    // update: (seller: ISeller) => Promise<void>;
    delete: (id: string) => Promise<void>;
}

class SellerDao implements ISellerDao {


    /**
     * @param email
     */
    public async getOne(id: string): Promise<DSeller | null> {
        try {
            return await Seller.findOne({ "_id": id });
        } catch (error) {
            console.error(error);
            return null;
        }
    }


    /**
     *
     */
    public async getAll(): Promise<DSeller[]> {
        try {
            return await Seller.find({});
        } catch (error) {
            console.error(error);
            return [];
        }
    }


    /**
     *
     * @param seller
     */
    public async add(seller: ISeller): Promise<void> {
        try {
            await Seller.build(seller).save();
        } catch (error) {
            console.error(error);
        }
    }

    /**
     *
     * @param id
     */
    public async delete(id: string): Promise<void> {
        try {
            await Seller.findByIdAndDelete({ _id: id });
        } catch (error) {
            console.error(error);
        }
    }
}

export default SellerDao;
