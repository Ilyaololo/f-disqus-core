import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JWT_SECRET_TOKEN } from 'config';

import { UserModule } from 'modules/user';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secretOrPrivateKey: JWT_SECRET_TOKEN,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
  exports: [PassportModule, AuthService],
})
export class AuthModule {
}
