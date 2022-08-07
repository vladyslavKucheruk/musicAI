import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { User } from 'src/users/models/user.model';
import { Track } from './models/track.model';
import { Comment } from './models/comment.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [TracksService],
  controllers: [TracksController],
  imports: [SequelizeModule.forFeature([User, Track, Comment]), FilesModule],
})
export class TracksModule {}
