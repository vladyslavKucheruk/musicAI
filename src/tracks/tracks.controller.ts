import { Body, Controller, Get, HttpStatus, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AddCommentDto } from './dto/addCommentDto';
import { CreateTrackDto } from './dto/createTrackDto';
import { TracksService } from './tracks.service';

@ApiTags('Tracks')
@Controller('tracks')
export class TracksController {
  constructor(private trackService: TracksService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Get all available tracks' })
  allTracks() {
    return this.trackService.findAll();
  }

  @Get('popular')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Get popular tracks' })
  popularTracks() {
    this.trackService.findPopular();
  }

  @Get('search')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Search tracks by title' })
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
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiOperation({ summary: 'Upload new track' })
  uploadTrack(@UploadedFiles() files: { image: Express.Multer.File; audio: Express.Multer.File }, @Body() dto: CreateTrackDto) {
    return this.trackService.create(dto, files.image, files.audio);
  }

  @Post('listen')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Add one listen to particular track' })
  listen(@Param('id') id: number) {
    return this.trackService.listen(id);
  }

  @Post('comment')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Comment track' })
  addComment(@Body() dto: AddCommentDto) {
    return this.trackService.addComment(dto);
  }
}
