import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
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
})
export class AppModule {}