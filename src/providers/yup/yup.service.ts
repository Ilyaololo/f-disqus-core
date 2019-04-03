import { BadRequestException, Inject } from '@nestjs/common';
import * as Yup from 'yup';

export const IYupService = () => Inject('YupService');

export interface IYupService {
  validate(value: any, schema: Yup.Schema<any>, options?: Yup.ValidateOptions): Promise<any>;
}

export class YupService implements IYupService {
  public async validate(value: any, schema: Yup.Schema<any>, options?: Yup.ValidateOptions): Promise<any> {
    try {
      return await schema.validate(value, options);
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
