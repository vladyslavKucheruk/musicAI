import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { FilesService } from 'src/files/files.service';
import { AddCommentDto } from './dto/addCommentDto';
import { CreateTrackDto } from './dto/createTrackDto';
import { Comment } from './models/comment.model';
import { Track } from './models/track.model';
import { File } from 'src/files/file.types';

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(Track) private trackRepository: typeof Track,
    @InjectModel(Comment) private commentRepository: typeof Comment,
    private filesService: FilesService,
  ) {}

  async create(dto: CreateTrackDto, image: Express.Multer.File, audio: Express.Multer.File): Promise<any> {
    const imageName = this.filesService.uploadFile(image[0], File.IMAGE);
    const audioName = this.filesService.uploadFile(audio[0], File.AUDIO);
    const track = await this.trackRepository.create({ ...dto, plays: 0, image: imageName, audio: audioName });
    return track;
  }

  async findAll(limit = 10, offset = 0): Promise<Array<Track>> {
    const tracks = await this.trackRepository.findAll({ include: { all: true }, limit, offset });
    return tracks;
  }

  async findPopular(limit = 10, offset = 0): Promise<Array<Track>> {
    const tracks = await this.trackRepository.findAll({ order: [['plays', 'DESC']], include: { all: true }, limit, offset });
    return tracks;
  }

  async searchByTitle(title: string, limit = 10, offset = 0): Promise<Array<Track>> {
    const tracks = await this.trackRepository.findAll({
      where: { title: { [Op.substring]: title } },
      include: { all: true },
      limit,
      offset,
    });
    return tracks;
  }

  async addComment(dto: AddCommentDto) {
    const track = await this.trackRepository.findByPk(dto.trackId);
    const comment = await this.commentRepository.create(dto);

    if (track && comment) {
      await track.$add('comments', comment.id);
      return;
    }

    throw new HttpException('Error with track or comment', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async listen(id: number) {
    const track = await this.trackRepository.findByPk(id);

    if (track) {
      track.plays += 1;
      return await track.save();
    }

    throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
  }
}
