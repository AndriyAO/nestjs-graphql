import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from './images.entity';
import { ImagesService } from './images.service';
import { ImagesResolver } from './images.resolver';
import { UploadMiddleware } from '../middleware/upload.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Images])],
  providers: [ImagesService, ImagesResolver]
})

export class ImagesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UploadMiddleware)
      .with()
      .forRoutes('graphql');
  }}