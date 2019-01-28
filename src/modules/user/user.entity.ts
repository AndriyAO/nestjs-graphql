import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { IUser } from './interface/user.interface';
import { Profile } from '../profile/profile.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text'})
  public email: string;

  @Column({ type: 'text' })
  public password: string;

  @OneToOne(type => Profile, profile => profile.user)
  //@JoinColumn()
  public profile: Profile;

  @BeforeInsert()
  private async hashsPassword() {
    this.password = bcrypt.hashSync(this.password, 12);
  }

  public compareHash(password: String) {
    //console.log(valPass, this.password);
    return bcrypt.compareSync(password, this.password);
  }
}

//public??
