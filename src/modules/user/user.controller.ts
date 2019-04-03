import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { UserRecord } from './models/UserRecord';

import { IUserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    @IUserService() private readonly userService: IUserService,
  ) {
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  public async getUser(@Req() req: Request): Promise<UserRecord> {
    return new UserRecord(req.user);
  }
}
