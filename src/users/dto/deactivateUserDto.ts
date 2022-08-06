import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class DeactivateUserDto {
  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'Should be a number' })
  readonly userId: number;

  @ApiProperty({ example: 'Cheater' })
  @IsString({ message: 'Should be a string' })
  readonly reason: string;
}
