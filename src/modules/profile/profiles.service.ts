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

  async insert(profile: Profile): Promise<Profile> {
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
        { id: id },
        { relations: ['user'] },
      );
      //console.log(id, data);
      await this.profileRepository.delete(id);
      return data;
    } catch (err) {
      return err;
    }
  }
  async update(profileId: number, newProfile: IProfile): Promise<Profile> {
    try {
      let profile = await this.profileRepository.findOne(profileId);
      Object.assign(profile, newProfile);
      return await this.profileRepository.save(profile, { reload: true });
    } catch (err) {
      return err;
    }
  }
}