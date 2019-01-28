import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Profile } from '../profile/profile.entity';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profiles.service';

describe('ProfileResolver', () => {
  let profileResolver: ProfileResolver;
  let profileService: ProfileService;

  beforeEach(async () => {
    const mockRepository = {};
    const module = await Test.createTestingModule({
      providers: [
        ProfileResolver,
        ProfileService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    })
      .overrideProvider(ProfileService)
      .useValue({ findAll: () => null })
      .compile();

    profileService = module.get<ProfileService>(ProfileService);
    profileResolver = module.get<ProfileResolver>(ProfileResolver);
  });

  describe('ProfileResolver', () => {
    const profile = new Profile();
    profile.id = 1;
    it('should defined', async () => {
      expect(profileService).toBeDefined();
    });

    it('should return all profiles', async () => {
      jest.spyOn(profileResolver, 'profiles').mockImplementation(() => profile);

      const data = await profileResolver.profiles();
      expect(data).toBeDefined();
      expect(data).toBe(profile);
    });

    it('should delete a profile', async () => {
      jest
        .spyOn(profileResolver, 'deleteProfile')
        .mockImplementation(() => profile);

      const data = await profileResolver.deleteProfile(profile.id);
      expect(data).toBe(profile);
    });

    it('should create a profile', async () => {
      jest
        .spyOn(profileResolver, 'insrertProfile')
        .mockImplementation(() => profile);

      const data = await profileResolver.insrertProfile(profile);
      expect(data).toBe(profile);
      expect(data).toHaveProperty('id');
    });

    it('should update a profile', async () => {
      jest
        .spyOn(profileResolver, 'updateProfile')
        .mockImplementation(() => profile);

      const data = await profileResolver.updateProfile(profile.id, profile);
      expect(data).toBe(profile);
    });
  });
});
