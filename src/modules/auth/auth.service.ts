import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  createToken(userId: number, ttl?: number) {
    const user: JwtPayload = { userId };
    const expiresIn = ttl || 60 * 60;
    const secretOrKey = 'secret';
    const accessToken = jwt.sign(user, secretOrKey, { expiresIn });
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUser(payload: {
    email: string;
    password: string;
  }): Promise<boolean> {
    const user = await this.userService.findOne(payload);
    console.log(user);
    return !!user;
  }
}