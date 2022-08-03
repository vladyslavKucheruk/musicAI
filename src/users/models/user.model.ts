import { ApiProperty } from '@nestjs/swagger';
import { Model, Table, Column, DataType, BelongsToMany } from 'sequelize-typescript';

import { Role } from 'src/roles/models/role.model';
import { UserRole } from 'src/roles/models/userRole.model';

interface UserAttr {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserAttr> {
  @ApiProperty({ example: 1 })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'test@gmail.com' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '123456' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: true, default: true })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActivate: boolean;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Array<Role>;
}
