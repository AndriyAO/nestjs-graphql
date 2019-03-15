import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { IProfileService } from './interface/profile.service.interface';
import { IProfile } from './interface/profile.interface';

@Injectable()
export class ProfileService implements IProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async findAll(): Promise<Profile[]> {
    try {
      return await this.profileRepository.find({
        relations: ['user', 'images'],
      });
    } catch (err) {
      return err;
    }
  }

  async findOne(profileId: number) {
    try {
      return await this.profileRepository.findOne({ id: profileId });
    } catch (err) {
      return err;
    }
  }

  async insert(profile: IProfile): Promise<Profile> {
    try {
      const data = this.profileRepository.create(profile);
      return await this.profileRepository.save(data, { reload: true });
    } catch (err) {
      return err;
    }
  }

  async delete(id: number): Promise<Profile> {
    try {
      const data = await this.profileRepository.findOne(
        { id },
        { relations: ['user'] },
      );
      await this.profileRepository.delete(id);
      return data;
    } catch (err) {
      return err;
    }
  }
  async update(profileId: number, newProfile: IProfile): Promise<Profile> {
    try {
      const profile = await this.profileRepository.findOne(profileId);
      Object.assign(profile, newProfile);
      return await this.profileRepository.save(profile, { reload: true });
    } catch (err) {
      return err;
    }
  }
}
