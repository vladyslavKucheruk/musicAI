import { ApiProperty } from '@nestjs/swagger';

export class PaginatedDto {
  @ApiProperty({ readOnly: false, required: false })
  limit: number;

  @ApiProperty({ readOnly: false, required: false })
  offset: number;
}
