import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IYupService } from 'providers/yup';

import { createHash } from 'utils/crypto';

import { UserEntity } from './entity/user.entity';

export const IUserService = () => Inject('UserService');

export interface IUserService {
  findOneByLogin(payload: { login: string }): Promise<UserEntity>;
  findOneByLoginAndPassword(payload: { login: string, password: string }): Promise<UserEntity>;
  findOneByLoginAndSid(payload: { login: string, sid: string }): Promise<UserEntity>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @IYupService() private readonly yupService: IYupService,
  ) {
  }

  public async findOneByLogin(payload: { login: string }): Promise<UserEntity> {
    if (!payload.login) {
      throw new Error();
    }

    return this.userRepository.findOneOrFail({
      login: payload.login,
    });
  }

  public async findOneByLoginAndSid(payload: { login: string, sid: string }): Promise<UserEntity> {
    if (!payload.login || !payload.sid) {
      throw new Error();
    }

    return this.userRepository.findOneOrFail({
      login: payload.login,
      sid: payload.sid,
    });
  }

  public async findOneByLoginAndPassword(payload: { login: string, password: string }): Promise<UserEntity> {
    if (!payload.login || !payload.password) {
      throw new Error();
    }

    const entity = await this.findOneByLogin(payload);

    return this.userRepository.findOneOrFail({
      login: payload.login,
      passwordHash: createHash(payload.password, entity.salt),
    });
  }
}
