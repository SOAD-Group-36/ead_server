import { IProduct } from '@entities/Product';



export interface IProductDao {
    getOne: (email: string) => Promise<IProduct | null>;
    getAll: () => Promise<IProduct[]>;
    add: (user: IProduct) => Promise<void>;
    update: (user: IProduct) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

class ProductDao implements IProductDao {


    /**
     * @param email
     */
    public getOne(email: string): Promise<IProduct | null> {
        // TODO
        return Promise.resolve(null);
    }


    /**
     *
     */
    public getAll(): Promise<IProduct[]> {
        // TODO
        return Promise.resolve([]);
    }


    /**
     *
     * @param user
     */
    public async add(user: IProduct): Promise<void> {
        // TODO
        return Promise.resolve(undefined);
    }


    /**
     *
     * @param user
     */
    public async update(user: IProduct): Promise<void> {
        // TODO
        return Promise.resolve(undefined);
    }


    /**
     *
     * @param id
     */
    public async delete(id: number): Promise<void> {
        // TODO
        return Promise.resolve(undefined);
    }
}

export default ProductDao;
