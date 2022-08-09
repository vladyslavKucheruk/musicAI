import { Body, Controller, Get, HttpStatus, Param, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-custom.guard';
import { RolesAuthGuard } from 'src/auth/guards/roles-auth.guard';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { Role } from 'src/roles/role';
import { AddCommentDto } from './dto/addCommentDto';
import { CreateTrackDto } from './dto/createTrackDto';
import { TracksService } from './tracks.service';

@ApiTags('Tracks')
@Controller('tracks')
export class TracksController {
  constructor(private trackService: TracksService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Get all available tracks' })
  allTracks() {
    return this.trackService.findAll();
  }

  @Get('popular')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Get popular tracks' })
  popularTracks() {
    return this.trackService.findPopular();
  }

  @Get('search')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Search tracks by title' })
  searchTracks(@Query() query: any) {
    return this.trackService.searchByTitle(query.title);
  }

  @Get('recently-played/:userId')
  @UseGuards(JwtAuthGuard)
  recentlyPlayed() {
    return 'Unavailable now';
  }

  @Post('upload')
  @Roles(Role.ADMIN)
  @UseGuards(RolesAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Add one listen to particular track' })
  listen(@Param('id') id: number) {
    return this.trackService.listen(id);
  }

  @Post('comment')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Comment track' })
  addComment(@Body() dto: AddCommentDto) {
    return this.trackService.addComment(dto);
  }
}
