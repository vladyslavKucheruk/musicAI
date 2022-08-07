import { Body, Controller, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { AddCommentDto } from './dto/addCommentDto';
import { CreateTrackDto } from './dto/createTrackDto';
import { TracksService } from './tracks.service';

@Controller('tracks')
export class TracksController {
  constructor(private trackService: TracksService) {}

  @Get()
  allTracks() {
    return this.trackService.findAll();
  }

  @Get('popular')
  popularTracks() {
    this.trackService.findPopular();
  }

  @Get('search')
  search(@Query('title') title: string) {
    return this.trackService.searchByTitle(title);
  }

  @Get('recently-played/:userId')
  recentlyPlayed() {
    return 'Unavailable now';
  }

  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  uploadTrack(@UploadedFiles() files: { image: Express.Multer.File; audio: Express.Multer.File }, @Body() dto: CreateTrackDto) {
    return this.trackService.create(dto, files.image, files.audio);
  }

  @Post('listen')
  listen(@Param('id') id: number) {
    return this.trackService.listen(id);
  }

  @Post('comment')
  addComment(@Body() dto: AddCommentDto) {
    return this.trackService.addComment(dto);
  }
}
