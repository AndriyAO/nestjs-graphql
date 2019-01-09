import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json());
  app.useGlobalPipes(new ValidationPipe());
  //app.setGlobalPrefix('api/v1');
  await app.listen(4000);
}
bootstrap();
