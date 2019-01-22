import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json());
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { port: 3001 },
  });
  //app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();
