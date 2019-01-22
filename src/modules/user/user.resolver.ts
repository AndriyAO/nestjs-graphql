import { UserService } from './user.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.entity';
import { UseGuards } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver('Users')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query()
  @UseGuards(GqlAuthGuard)
  async getUsers() {
    return await this.userService.findAll();
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async getOneUser(@Args('id') id: number) {
    return await this.userService.find(id);
  }

  @Mutation()
  async insertUsers(@Args('input') user: User) {
    return await this.userService.insert(user);
  }

  @Mutation()
  async deleteUser(@Args('id') id: number) {
    return await this.userService.delete(id);
  }

  @Mutation()
  async updateUser(@Args('user') user: User) {
    return await this.userService.update(user);
  }
}
