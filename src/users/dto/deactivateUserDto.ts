import { ApiProperty } from '@nestjs/swagger';

export class DeactivateUserDto {
  @ApiProperty({ example: 1 })
  readonly userId: number;

  @ApiProperty({ example: 'Cheater' })
  readonly reason: string;
}
