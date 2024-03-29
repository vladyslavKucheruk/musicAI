import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length) {
      const messages = errors.map((error) => `${error.property} - ${Object.values(error.constraints).join(', ')}`).join('; ');
      throw new ValidationException(messages);
    }

    return value;
  }
}
