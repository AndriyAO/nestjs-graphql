import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { IProfile } from './interface/profile.interface';
import { User } from '../user/user.entity';
import { Images } from '../images/images.entity';

@Entity()
export class Profile implements IProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  public firstName: string;

  @Column({ type: 'text' })
  public lastName: string;

  @Column({ type: 'text' })
  public phone: string;

  @Column({ type: 'text' })
  public address: string;

  @OneToOne(type => User, user => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn()
  public user: User;

  @OneToMany(type => Images, images => images.profile)
  public images: Images[];
}
