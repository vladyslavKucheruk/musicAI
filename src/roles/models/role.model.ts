import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';
import { UserRole } from './userRole.model';

interface RoleAttr {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleAttr> {
  @ApiProperty({ example: 1 })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'USER' })
  @Column({ type: DataType.STRING })
  value: string;

  @ApiProperty({ example: 'Role assigned to each new user' })
  @Column({ type: DataType.STRING })
  description: string;

  @BelongsToMany(() => User, () => UserRole)
  users: Array<User>;
}
