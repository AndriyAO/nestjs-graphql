import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find({ relations: ['profile'] });
    } catch (err) {
      return err;
    }
  }

  async find(id: number): Promise<User> {
    try {
      return await this.userRepository.findOne(
        { id: id },
        { relations: ['profile'] },
      );
    } catch (err) {
      return err;
    }
  }

  public async findOne(options?: object): Promise<User | null> {
    try {
      return await this.userRepository.findOne(options);
    } catch (err) {
      return err;
    }
  }

  async insert(user: User): Promise<User> {
    try {
      const data = this.userRepository.create(user);
      return await this.userRepository.save(data, { reload: true });
    } catch (err) {
      return err;
    }
  }

  // чи потрібно повертати об'єкт при видалені?
  async delete(id: number): Promise<User> {
    try {
      const data = await this.userRepository.findOne(
        { id: id },
        { relations: ['profile'] },
      );
      await this.userRepository.delete(id);
      return data;
    } catch (err) {
      return err;
    }
  }

  async update(newUser: User): Promise<User> {
    try {
      let user;
      if (newUser.password) {
        //виводити повідомлення
        user = await this.userRepository.findOne(newUser);
        return user;
      }
      Object.assign(user, newUser);
      user = this.userRepository.create(user);
      return await this.userRepository.save(user, { reload: true });
    } catch (err) {
      return err;
    }
  }
}
