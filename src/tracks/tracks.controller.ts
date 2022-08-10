import { Body, Controller, Get, HttpStatus, Param, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-custom.guard';
import { RolesAuthGuard } from 'src/auth/guards/roles-auth.guard';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { Role } from 'src/roles/role';
import { AddCommentDto } from './dto/addCommentDto';
import { CreateTrackDto } from './dto/createTrackDto';
import { PaginatedDto } from './dto/paginatedDto';
import { TracksService } from './tracks.service';

@ApiTags('Tracks')
@Controller('tracks')
export class TracksController {
  constructor(private trackService: TracksService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Get all available tracks' })
  allTracks(@Query() query: PaginatedDto) {
    return this.trackService.findAll(query.limit, query.offset);
  }

  @Get('popular')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Get popular tracks' })
  popularTracks(@Query() query: PaginatedDto) {
    return this.trackService.findPopular(query.limit, query.offset);
  }

  @Get('search')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Search tracks by title' })
  searchTracks(@Query() query: { title: string; limit: number; offset: number }) {
    return this.trackService.searchByTitle(query.title, query.limit, query.offset);
  }

  @Get('recently-played/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
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
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiOperation({ summary: 'Upload new track' })
  uploadTrack(@UploadedFiles() files: { image: Express.Multer.File; audio: Express.Multer.File }, @Body() dto: CreateTrackDto) {
    return this.trackService.create(dto, files.image, files.audio);
  }

  @Post('listen/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Add one listen to particular track' })
  listen(@Param('id') id: number) {
    return this.trackService.listen(id);
  }

  @Post('comment')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Comment track' })
  addComment(@Body() dto: AddCommentDto) {
    return this.trackService.addComment(dto);
  }
}
