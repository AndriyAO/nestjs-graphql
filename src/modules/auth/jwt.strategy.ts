import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: 'secret',
    });
  }

  public async validate(req, payload, done) {
    const isValid = await this.authService.validateUser(payload);
    //console.log(isValid);
    if (!isValid) {
      return done('Unauthorized', null);
    } else {
      return done(null, payload);
    }
  }
}
