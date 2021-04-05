import { DUser, IUser } from '@entities/User';
import { IUserModel, User } from "@models/UserModel";

export interface IUserDao {
    getOne: (email: string) => Promise<DUser | null>;
    getAll: () => Promise<DUser[]>;
    add: (user: IUser) => Promise<void>;
    update: (user: IUser) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

class UserDao implements IUserDao {


    /**
     * @param email
     */
    public async getOne(email: string): Promise<DUser | null> {
        try {
            return await User.findOne({ "email": email });
        } catch (error) {
            console.error(error);
            return null;
        }
    }


    /**
     *
     */
    public async getAll(): Promise<DUser[]> {
        try {
            return await User.find({});
        } catch (error) {
            console.error(error);
            return [];
        }
    }


    /**
     *
     * @param user
     */
    public async add(user: IUser): Promise<void> {
        try {
            await User.build(user).save();
        } catch (error) {
            console.error(error);
        }
    }


    /**
     *
     * @param user
     */
    public async update(user: IUser): Promise<void> {
        // TODO
        return Promise.resolve(undefined);
    }


    /**
     *
     * @param id
     */
    public async delete(id: number): Promise<void> {
        try {
            await User.deleteOne({ "id": id });
        } catch (error) {
            console.error(error);
        }
    }
}

export default UserDao;
