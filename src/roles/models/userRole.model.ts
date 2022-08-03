import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { User } from 'src/users/models/user.model';
import { Role } from './role.model';

@Table({ tableName: 'user-role', createdAt: false, updatedAt: false })
export class UserRole extends Model<UserRole> {
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;
}
