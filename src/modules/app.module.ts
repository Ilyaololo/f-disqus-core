import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { YupModule } from 'providers/yup';

import { AuthModule } from 'modules/auth';
import { UserModule } from 'modules/user';

@Module({
  imports: [
    TypeOrmModule.forRoot(),

    YupModule.register(),

    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
