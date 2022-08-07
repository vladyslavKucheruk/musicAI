import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { App } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';

const start = async () => {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(App, { cors: true });

  const config = new DocumentBuilder().setTitle('MusicAI API').setDescription('API documentation for music app').setVersion('0.2').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.listen(PORT);
};

start();
