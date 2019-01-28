import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './modules/profile/profile.module';
import { AuthModule } from './modules/auth/auth.module';
import { ImagesModule } from './modules/images/images.module';

@Module({
  imports: [
    UserModule,
    ProfileModule,
    ImagesModule,
    AuthModule,
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'User',
      password: 'password',
      database: 'test',
      entities: [`src/**/**.entity{.ts,.js}`],
      synchronize: true, // DEV only, do not use on PROD!
    }),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      typePaths: ['./**/*.graphql'],
    }),
  ],
  exports: [UserModule],
})
export class AppModule {}
