import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Images } from './images.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Images)
    private readonly imagesRepository: Repository<Images>,
  ) {}

  async findAll(): Promise<Images[]> {
    try {
      return await this.imagesRepository.find({ relations: ['profile'] });
    } catch (err) {
      return err;
    }
  }

  async insert(image: Images): Promise<Images> {
    try {
      const data = this.imagesRepository.create(image);
      await this.imagesRepository.save(data);
      return data;
    } catch (err) {
      return err;
    }
  }

  async delete(id: number): Promise<Images> {
    try {
      const data = await this.imagesRepository.findOne(
        { id: id },
        { relations: ['profile'] },
      );
      //console.log(id, data);
      await this.imagesRepository.delete(id);
      return data;
    } catch (err) {
      return err;
    }
  }
}
