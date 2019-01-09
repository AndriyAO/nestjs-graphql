import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { PassportModule } from '@nestjs/passport';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Query()
  async login(@Args('user') body: any): Promise<any> {
    if (!body.email || !body.password) {
      return 'Missing email or password.';
    }

    try {
      const user = await this.userService.findOne({
        where: {
          email: body.email,
        },
      });
      if (!user) return 'Incorrect username.';

      const isMatch = user.compareHash(body.password);
      //console.log(isMatch)
      if (!isMatch) {
        return 'Incorrect password.';
      } else {
        const result = this.authService.createToken(user.id);
        return result.accessToken;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Query()
  async register(@Args('user') body: User): Promise<String> {
    try {
    if (!(body && body.email && body.password)) {
      return 'Missing email or password.';
    }

    let user = await this.userService.findOne({email: body.email});

    if (user) {
      return 'Username exists';
    } else {
      user = await this.userService.insert(body);
    }

    return await this.authService.createToken(user.id).accessToken;
} catch (err) {
  return err;
}
  }
}
