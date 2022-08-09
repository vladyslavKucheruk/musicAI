import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { FilesService } from 'src/files/files.service';
import { AddCommentDto } from './dto/addCommentDto';
import { CreateTrackDto } from './dto/createTrackDto';
import { Comment } from './models/comment.model';
import { Track } from './models/track.model';
import { File } from 'src/files/file.types';
import { Op } from 'sequelize';

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

  async findAll(): Promise<Array<Track>> {
    const tracks = await this.trackRepository.findAll();
    return tracks;
  }

  async findPopular(): Promise<Array<Track>> {
    const tracks = await this.trackRepository.findAll({ order: [['plays', 'DESC']] });
    return tracks;
  }

  async searchByTitle(title: string): Promise<Array<Track>> {
    const tracks = await this.trackRepository.findAll({ where: { title: { [Op.substring]: title } } });
    return tracks;
  }

  async addComment(dto: AddCommentDto) {
    const track = await this.trackRepository.findByPk(dto.trackId);
    const comment = await this.commentRepository.create(dto);

    if (track && comment) {
      await track.$add('comments', comment.id);
    }

    throw new HttpException('Error with track or comment', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async listen(id: number) {
    const track = await this.trackRepository.findByPk(id);
    if (track) {
      track.plays += 1;
      track.save();
    }

    throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
  }
}
