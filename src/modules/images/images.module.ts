import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from './images.entity';
import { ImagesService } from './images.service';
import { ImagesResolver } from './images.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Images])],
  providers: [ImagesService, ImagesResolver],
})
export class ImagesModule {}
