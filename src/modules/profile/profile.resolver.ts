import { ProfileService } from './profiles.service';
import { Mutation, Args, Resolver, Query } from '@nestjs/graphql';
import { Profile } from './profile.entity';
import { IProfile } from './interface/profile.interface';

@Resolver('Profiles')
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query()
  async getPtofiles() {
    return await this.profileService.findAll();
  }

  @Mutation()
  async getProfile(@Args('profile') profile: Profile) {
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
    //console.log(profile);
    return await this.profileService.update(profileId, profile);
  }
}
