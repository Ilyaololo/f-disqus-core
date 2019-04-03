import { BadRequestException, Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import * as Yup from 'yup';

import { DOMAIN, TLS } from 'config';

import { IUserService, UserRecord } from 'modules/user';
import { IYupService } from 'providers/yup';

import { LoginDto } from './dto/login.dto';

import { IAuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @IAuthService() private readonly authService: IAuthService,
    @IUserService() private readonly userService: IUserService,
    @IYupService() private readonly yupService: IYupService,
  ) {
  }

  @Post('/login')
  public async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<any> {
    try {
      await this.yupService.validate(loginDto, Yup.object({
        login: Yup.string().max(256),
        password: Yup.string().max(256),
      }));

      const entity = await this.userService.findOneByLoginAndPassword(loginDto);

      const jwt = await this.authService.createToken(entity);

      res.cookie(TLS, jwt, {
        domain: DOMAIN,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        path: '/',
      });

      res.json(new UserRecord(entity));
    } catch (err) {
      console.error(err);

      throw new BadRequestException();
    }
  }
}
