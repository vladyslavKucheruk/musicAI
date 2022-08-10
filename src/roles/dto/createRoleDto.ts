import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Role } from '../role';

export class CreateRoleDto {
  @ApiProperty({ example: Role.ADMIN, enum: ['ADMIN', 'USER'] })
  @IsString({ message: 'Should be a string' })
  readonly value: string;

  @ApiProperty({ example: 'Role for admins, allows to manipulate with private data (users, roles etc.)' })
  @IsString({ message: 'Should be a string' })
  readonly description: string;
}
