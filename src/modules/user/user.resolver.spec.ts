import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Profile } from '../profile/profile.entity';

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let userService: UserService;

  beforeEach(async () => {
    const mockRepository = {};
    const module = await Test.createTestingModule({
      providers: [
        UserResolver,
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    })
      .overrideProvider(UserService)
      .useValue({ findAll: () => null })
      .compile();

    userService = module.get<UserService>(UserService);
    userResolver = module.get<UserResolver>(UserResolver);
  });

  describe('UserResolver', () => {
    const user = new User();
    user.id = 1;
    user.email = 'mail';
    user.password = 'pass';
    user.profile = new Profile();

    it('should defined', async () => {
      expect(userService).toBeDefined();
    });

    it('should return all users', async () => {
      jest.spyOn(userResolver, 'getUsers').mockImplementation(() => user);

      const data = await userResolver.getUsers();
      expect(data).toBeDefined();
      expect(data).toBe(user);
    });

    it('should return a user', async () => {
      jest.spyOn(userResolver, 'getOneUser').mockImplementation(() => user);

      const data = await userResolver.getOneUser(user.id);
      expect(data).toBe(user);
    });

    it('should delete a user', async () => {
      jest.spyOn(userResolver, 'deleteUser').mockImplementation(() => user);

      const data = await userResolver.deleteUser(user.id);
      expect(data).toBe(user);
    });

    it('should create a user', async () => {
      jest.spyOn(userResolver, 'insertUsers').mockImplementation(() => user);

      const data = await userResolver.insertUsers(user);
      expect(data).toBe(user);
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('email');
      expect(data).toHaveProperty('password');
      expect(data).toHaveProperty('profile');
    });

    it('should update a user', async () => {
      jest.spyOn(userResolver, 'updateUser').mockImplementation(() => user);

      const data = await userResolver.updateUser(user);
      expect(data).toBe(user);
    });
  });
});
