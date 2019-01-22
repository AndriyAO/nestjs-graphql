import { Mutation, Args, Resolver, Query } from '@nestjs/graphql';
import { Images } from './images.entity';
import { ImagesService } from './images.service';
import * as fs from 'fs';
import { UseInterceptors } from '@nestjs/common';
import { UploadMiddleware } from '../middleware/upload.middleware';

@Resolver('Image')
export class ImagesResolver {
  constructor(private readonly imagesService: ImagesService) {}

  @Query()
  @UseInterceptors(UploadMiddleware)
  async allImages() {
    return await this.imagesService.findAll();
  }

  @Mutation()
  
  async insertImage(@Args('input') image: Images) {
    return await this.imagesService.insert(image);
  }
  @Mutation()
  async deleteImage(@Args('id') id: number) {
    return await this.imagesService.delete(id);
  }

  @Mutation()
  async singleUpload(parent, { file }) {
    const { stream, filename, mimetype, encoding } = await file;

    console.log(file);

    // 2. Stream file contents into cloud storage:
    // https://nodejs.org/api/stream.html

    storeUpload({stream, filename});

    // 3. Record the file upload in your DB.
    // const id = await recordFile( … )
    let name = filename;
    return { name, mimetype, encoding };
  }
}
const storeUpload = ({ stream, filename }) =>
  new Promise((resolve, reject) =>
    stream
      .pipe(fs.createWriteStream(filename))
      .on('finish', () => resolve())
      .on('error', reject),
  );
