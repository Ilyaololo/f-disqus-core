import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-jwt';

import { JWT_SECRET_TOKEN } from 'config';

import { UserEntity } from 'modules/user';

import { IAuthService } from './auth.service';

import { extractor } from 'utils/jwt';

export interface JWT {
  login: string;
  sid: string;
}

export interface IJwtStrategy {
  validate(token: JWT): Promise<UserEntity>;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) implements IJwtStrategy {
  constructor(
    @IAuthService() private readonly authService: IAuthService,
  ) {
    super({
      jwtFromRequest: extractor,
      secretOrKey: JWT_SECRET_TOKEN,
    });
  }

  public async validate(jwt: JWT): Promise<UserEntity> {
    const user = await this.authService.validateUser(jwt);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
