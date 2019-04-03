import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IUserService, UserEntity } from 'modules/user';

import { JWT } from './jwt.strategy';

export const IJwtService = () => Inject('JwtService');

export const IAuthService = () => Inject('AuthService');

export interface IJwtService extends JwtService {
}

export interface IAuthService {
  createToken(payload: JWT): Promise<string>;
  validateUser(payload: JWT): Promise<UserEntity>;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @IJwtService() private readonly jwtService: IJwtService,
    @IUserService() private readonly userService: IUserService,
  ) {
  }

  public async createToken(payload: JWT): Promise<string> {
    if (!payload.login || !payload.sid) {
      throw new Error();
    }

    return this.jwtService.sign({
      login: payload.login,
      sid: payload.sid,
    });
  }

  public async validateUser(payload: JWT): Promise<UserEntity> {
    if (!payload.login || !payload.sid) {
      throw new Error();
    }

    return this.userService.findOneByLoginAndSid(payload);
  }
}
