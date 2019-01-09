import { User } from '../user.entity';

export interface IUserService {
  findAll(): Promise<User[]>;
  find(id: number): Promise<User>;
  findOne(user: User): Promise<User>;
  insert(user: User): Promise<User>;
  delete(id: number): Promise<User>;
  update(newUser: User): Promise<User>;
}
