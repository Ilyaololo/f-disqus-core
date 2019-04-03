import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({
    type: 'uuid',
    unique: true,
  })
  public sid!: string;

  @Column({
    type: 'text',
  })
  public login!: string;

  @Column({
    type: 'text',
    name: 'first_name',
    nullable: true,
  })
  public firstName!: string;

  @Column({
    type: 'text',
    name: 'last_name',
    nullable: true,
  })
  public lastName!: string;

  @Column({
    type: 'text',
    name: 'middle_name',
    nullable: true,
  })
  public middleName!: string;

  @Column({
    type: 'bytea',
  })
  public salt!: string;

  @Column({
    type: 'bytea',
    name: 'password_hash',
  })
  public passwordHash!: string;

  @Column({
    type: 'timestamp with time zone',
    name: 'created_at',
    default: 'now()',
  })
  public createdAt!: number | string;

  @Column({
    type: 'timestamp with time zone',
    name: 'updated_at',
    default: 'now()',
  })
  public updatedAt!: number | string;
}
