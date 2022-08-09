import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength } from 'class-validator';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';

import { User } from 'src/users/models/user.model';
import { Comment } from './comment.model';

interface TrackAttr {
  title: string;
  genre: string;
  userId: number;
  image: string;
  audio: string;
  plays: number;
}

@Table({ tableName: 'tracks' })
export class Track extends Model<Track, TrackAttr> {
  @Column({ type: DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true })
  @IsNumber({}, { message: 'Should be an integer number' })
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  @IsString({ message: 'Should be a string' })
  @MinLength(2, { message: 'Should contain at least 2 chars' })
  @ApiProperty({ example: 'Track title' })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @IsString({ message: 'Should be a string' })
  @MinLength(2, { message: 'Should contain at least 2 chars' })
  @ApiProperty({ example: 'Rock' })
  genre: string;

  @Column({ type: DataType.INTEGER })
  plays: number;

  @Column({ type: DataType.INTEGER })
  @IsNumber({}, { message: 'Should be an integer number' })
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.STRING, allowNull: false })
  @ApiProperty({ example: 'image.png' })
  image: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @ApiProperty({ example: 'track.mp3' })
  audio: string;

  @HasMany(() => Comment)
  comments: Array<Comment>;
}
