import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength } from 'class-validator';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { User } from 'src/users/models/user.model';
import { Track } from './track.model';

interface CommentAttr {
  userId: number;
  trackId: number;
  text: string;
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, CommentAttr> {
  @Column({ type: DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true })
  @IsNumber({}, { message: 'Should be an integer number' })
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  @IsString({ message: 'Should be a string' })
  @MinLength(1, { message: 'Should contain at least 1 char' })
  @ApiProperty({ example: 'Comment text' })
  text: string;

  @ForeignKey(() => User)
  @IsNumber({}, { message: 'Should be an integer number' })
  @ApiProperty({ example: 1 })
  userId: number;

  @ForeignKey(() => Track)
  @IsNumber({}, { message: 'Should be an integer number' })
  @ApiProperty({ example: 1 })
  trackId: number;

  @BelongsTo(() => Track)
  track: Track;

  @BelongsTo(() => User)
  user: User;
}
