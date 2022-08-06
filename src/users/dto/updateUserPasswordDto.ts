import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateUserPasswordDto {
  @ApiProperty({ example: '123456' })
  @IsString({ message: 'Should be a string' })
  @MinLength(6, { message: 'Should contain at least 6 symbols' })
  readonly password: string;
}
