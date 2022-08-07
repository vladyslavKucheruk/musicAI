import { ApiProperty } from '@nestjs/swagger';

export class AddCommentDto {
  @ApiProperty({ example: 1 })
  readonly userId: number;

  @ApiProperty({ example: 1 })
  readonly trackId: number;

  @ApiProperty({ example: 'test comment' })
  readonly text: string;
}
