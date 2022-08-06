import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

import { Role } from '../role';

export class AssignRoleDto {
  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'Should be a number' })
  readonly userId: number;

  @ApiProperty({ example: Role.ADMIN })
  @IsString({ message: 'Should be a string' })
  readonly value: string;
}
