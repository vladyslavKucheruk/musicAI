import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: false })
  @IsBoolean({ message: 'Should be a boolean value' })
  readonly isActivate?: boolean;
}
