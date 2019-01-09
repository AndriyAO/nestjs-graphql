import { User } from '../user.entity';

export interface IUserResolver{
    users(): Promise<User[]>;
    insertUsers(user: User): Promise<User>;
}