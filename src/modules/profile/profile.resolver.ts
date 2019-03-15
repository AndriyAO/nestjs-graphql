import { Mutation, Args, Resolver, Query } from '@nestjs/graphql';

import { ProfileService } from './profiles.service';
import { Profile } from './profile.entity';
import { IProfile } from './interface/profile.interface';

@Resolver('Profiles')
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query()
  async getProfiles() {
    return await this.profileService.findAll();
  }

  @Query()
  async getProfile(@Args('id') profileId: number) {
    return await this.profileService.findOne(profileId);
  }

  @Mutation()
  async insertProfile(@Args('profile') profile: IProfile) {
    return await this.profileService.insert(profile);
  }

  @Mutation()
  async deleteProfile(@Args('id') id: number) {
    return await this.profileService.delete(id);
  }

  @Mutation()
  async updateProfile(
    @Args('id') profileId: number,
    @Args('profile') profile: IProfile,
  ) {
    return await this.profileService.update(profileId, profile);
  }
}
