import { DynamicModule, Global, Module } from '@nestjs/common';

import { YupService } from './yup.service';

@Global()
@Module({})
export class YupModule {
  public static register(options: any = {}): DynamicModule {
    return {
      module: YupModule,
      providers: [
        YupService,
      ],
      exports: [YupService],
    };
  }
}
