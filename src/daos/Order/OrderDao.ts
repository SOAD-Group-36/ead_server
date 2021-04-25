import { IOrder, DOrder } from '@entities/Order';



export interface IOrderDao {
    getOne: (email: string) => Promise<DOrder | null>;
    getAll: () => Promise<DOrder[]>;
    add: (user: IOrder) => Promise<void>;
    // update: (user: IOrder) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

class OrderDao implements IOrderDao {


    /**
     * @param email
     */
    public getOne(email: string): Promise<DOrder | null> {
        // TODO
        return Promise.resolve(null);
    }


    /**
     *
     */
    public getAll(): Promise<DOrder[]> {
        // TODO
        return Promise.resolve([]);
    }


    /**
     *
     * @param user
     */
    public async add(user: IOrder): Promise<void> {
        // TODO
        return Promise.resolve(undefined);
    }


    /**
     *
     * @param user
     */
    public async update(user: IOrder): Promise<void> {
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

export default OrderDao;
