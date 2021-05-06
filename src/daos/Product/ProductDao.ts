import { DProduct, IProduct } from '@entities/Product';
import { Product } from '@models/ProductModel';

export interface IProductDao {
    getOne: (id: string) => Promise<DProduct | null>;
    getAll: () => Promise<DProduct[]>;
    add: (user: DProduct) => Promise<void>;
    // update: (user: DProduct) => Promise<void>;
    delete: (id: string) => Promise<void>;
}

class ProductDao implements IProductDao {


    /**
     * @param id
     */
    public async getOne(id: string): Promise<DProduct | null> {
        try {
            return await Product.findById({ _id: id });
        } catch (error) {
            console.error(error);
            return null;
        }
    }


    public async getAll(): Promise<DProduct[]> {
        try {
            return await Product.find({}).limit(10);
        } catch (error) {
            console.error(error);
            return [];
        }
    }


    /**
     *
     * @param user
     */
    public async add(product: IProduct): Promise<void> {
        try {
            await Product.build(product).save();
        } catch (error) {
            console.error(error);
        }
    }


    // /**
    //  *
    //  * @param user
    //  */
    // public async update(user: IProduct): Promise<void> {
    //     return Promise.resolve(undefined);
    // }


    /**
     *
     * @param id
     */
    public async delete(id: string): Promise<void> {
        try{
            Product.findByIdAndDelete({_id: id});
        } catch (error){ 
            console.error(error)
        }
    }
}

export default ProductDao;
