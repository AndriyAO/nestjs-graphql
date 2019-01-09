import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { ProfileService } from './profiles.service';
import { ProfileResolver } from './profile.resolver';


@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  providers: [ProfileService, ProfileResolver]
  //,exports: [UserService]
})

export class ProfileModule {}