import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../role';

export class CreateRoleDto {
  @ApiProperty({ example: Role.ADMIN })
  readonly value: string;

  @ApiProperty({ example: 'Role for admins, allows to manipulate with private data (users, roles etc.)' })
  readonly description: string;
}
