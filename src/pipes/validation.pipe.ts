import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);

    return value;
  }
}
