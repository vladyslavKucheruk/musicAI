import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../role';

export class AssignRoleDto {
  @ApiProperty({ example: 1 })
  readonly userId: number;

  @ApiProperty({ example: Role.ADMIN })
  readonly value: string;
}
