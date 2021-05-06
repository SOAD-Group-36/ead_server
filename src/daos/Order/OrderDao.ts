import { IOrder, DOrder } from '@entities/Order';
import { Order } from '@models/OrderModel';



export interface IOrderDao {
    getOne: (email: string) => Promise<DOrder | null>;
    getAll: () => Promise<DOrder[]>;
    add: (order: IOrder) => Promise<void>;
    // update: (order: IOrder) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

class OrderDao implements IOrderDao {


    /**
     * @param id
     */
    public async getOne(id: string): Promise<DOrder | null> {
        try {
            return await Order.findOne({_id: id});
        } catch (error) {
            console.error(error);
            return null;
        }
    }


    /**
     *
     */
    public async getAll(): Promise<DOrder[]> {
        try {
            return await Order.find({}).limit(10);
        } catch (error) {
            console.error(error);
            return [];
        }
    }


    /**
     *
     * @param order
     */
    public async add(order: IOrder): Promise<void> {
        try {
            await Order.build(order).save();
        } catch (error) {
            console.error(error);
        }
    }


    /**
     *
     * @param order
     */
    public async update(order: IOrder): Promise<void> {
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
