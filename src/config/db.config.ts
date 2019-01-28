export const config = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'User',
  password: 'password',
  database: 'test',
  entities: [`src/**/**.entity{.ts,.js}`],
  synchronize: true, // DEV only, do not use on PROD!
};
