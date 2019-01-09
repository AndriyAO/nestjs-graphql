import { Mutation, Args, Resolver, Query } from '@nestjs/graphql';
import { Images } from './images.entity';
import { ImagesService } from './images.service';
import { createWriteStream } from 'fs';

@Resolver('Image')
export class ImagesResolver {
  constructor(private readonly imagesService: ImagesService) {}

  @Query('allImages')
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
  async uploadFile(parent, { file }) {
    const { stream, filename } = await file;
    console.log(file);
    await storeUpload({ stream, filename });
    return true;
  }
}

const storeUpload = ({ stream, filename }) =>
  new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(filename))
      .on('finish', () => resolve())
      .on('error', reject),
  );
