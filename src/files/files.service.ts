import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 } from 'uuid';

import { File } from './file.types';

@Injectable()
export class FilesService {
  uploadFile(file: Express.Multer.File, type: File) {
    try {
      const extension = file.originalname.split('.').pop();
      const name = `${v4()}.${extension}`;
      const filePath = path.resolve(__dirname, '..', 'static', type);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.resolve(filePath, name), file.buffer);
      return `${type}/${name}`;
    } catch (e) {
      throw new HttpException('Something went wrong while writing files', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
