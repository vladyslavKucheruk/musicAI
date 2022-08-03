import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: '123456' })
  readonly password?: string;

  @ApiProperty({ example: false })
  readonly isActivate?: boolean;
}
