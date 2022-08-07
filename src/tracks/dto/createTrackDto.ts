import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({ example: 'Matter' })
  readonly title: string;

  @ApiProperty({ example: 'Rock' })
  readonly genre: string;

  @ApiProperty({ example: 1 })
  readonly userId: number;

  @ApiProperty({ example: 'image.png' })
  readonly image: string;

  @ApiProperty({ example: 'audio.mp3' })
  readonly audio: string;
}
