import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { App } from './app.module';

const start = async () => {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(App);

  const config = new DocumentBuilder()
    .setTitle('Advanced BE API')
    .setDescription('API documentation for advanced BE app')
    .setVersion('0.1')
    .addTag('Docs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.listen(PORT, () => console.log(`Run server on PORT: ${PORT}`));
};

start();