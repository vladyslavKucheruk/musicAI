import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'email@gmail.com' })
  @IsString({ message: 'Should be a string' })
  @IsEmail({}, { message: 'Should be formatted is an email' })
  readonly email: string;

  @ApiProperty({ example: '123456' })
  @IsString({ message: 'Should be a string' })
  @MinLength(6, { message: 'Should contain at least 6 symbols' })
  readonly password: string;
}
