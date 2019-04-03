import { MigrationInterface, QueryRunner } from 'typeorm';
import uuid from 'uuid/v1';

import { createHash, createSalt } from 'utils/crypto';

import { UserEntity } from 'modules/user';

export class InsertUser1554123918717 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const userRepository = queryRunner.connection.getRepository(UserEntity);

    const users = await Promise.all([
      (() => {
        const user = new UserEntity();

        user.sid = uuid();
        user.login = 'admin@example.com';
        user.lastName = 'Админский';
        user.firstName = 'Админ';
        user.middleName = 'Админович';
        user.salt = createSalt();
        user.passwordHash = createHash('123123', user.salt);

        return user;
      })(),
    ]);

    await userRepository.save(users);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.clearTable('public.user');
  }
}
