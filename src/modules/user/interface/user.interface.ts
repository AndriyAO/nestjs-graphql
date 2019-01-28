import { Profile } from 'src/modules/profile/profile.entity';

export interface IUser {
  id: number;
  email: string;
  password: string;
  profile?: Profile;
  hashsPassword(): void;
  compareHash(string): boolean;
}
