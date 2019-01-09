import { Images } from '../../images/images.entity';
import { User } from 'src/modules/user/user.entity';

export interface IProfile {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  images?: Images[];
  user?: User;
}
