import * as supertest from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { User } from '../src/modules/user/user.entity';
import { getConnection } from 'typeorm';
describe('UsreResolver', () => { 
  
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = await moduleFixture.createNestApplication().init();
   const connection = getConnection('default');
   connection.dropDatabase();
  });

  let testUser = new User();
  let token;

  it('should create a user', async () => {
    const query = {
      query: `mutation { insertUsers(input: { email: \"test@test.test\" password: \"secret\" }), {id email password} }`,
      variables: null,
    };
    return supertest(app.getHttpServer())
      .post('/graphql')
      .send(query)
      .expect(200)
      .then(done => {
        testUser = done.body.data.insertUsers;
        expect(testUser).toHaveProperty('id');
        expect(testUser).toHaveProperty('email');
        expect(testUser).toHaveProperty('password');
        expect(testUser.email).toEqual('test@test.test');
        expect(testUser.password).toBeDefined();
        expect(testUser.password).not.toEqual('secret');
      });
  });

  // it('should login a user', async () => {
  //   const query = {
  //     query: `{  login(user: {    email: "${
  //       testUser.email
  //     }"     password: \"secret\"  }) }`,
  //   };
  //   return supertest(app.getHttpServer())
  //     .post('/graphql')
  //     .send(query)
  //     .expect(200)
  //     .then(done => {
  //       token = done.body.data.login;
  //       expect(token.accessToken).not.toBeNull();
  //     });
  // });

  // it('should authtorizated a user', async () => {
  //   const query = {
  //     query: `{ getOneUser(id: ${
  //       testUser.id
  //     }) { email id password profile{ id } }}`,
  //   };
  //   return supertest(app.getHttpServer())
  //     .post('/graphql')
  //     .send(query)
  //     .set('Authorization', `Baerer ${token}`)
  //     .expect(200)
  //     .then(done => {
  //       expect(done.body.errors[0].extensions.exception.message.statusCode).toBe(401);
  //     });
  // });

  // it('should send a user', async () => {
  //   const query = {
  //     query: `{ getUsers { id email password } }`,
  //   };
  //   return supertest(app.getHttpServer())
  //     .post('/graphql')
  //     .send(query)
  //     .expect(200)
  //     .then(data => {
  //       const users = data.body.data.getUsers;
  //       expect(data.body.data).not.toBeNull();
  //     });
  // });

  // it('should delete a user', async () => {
  //   const query = {
  //     query: `mutation {deleteUser(id:${testUser.id}), {id}}`,
  //   };
  //   return supertest(app.getHttpServer())
  //     .post('/graphql')
  //     .send(query)
  //     .expect(200)
  //     .then(done => {
  //       const user = done.body.data.deleteUser;
  //       expect(user.id).toEqual(testUser.id.toString() || null);
  //     });
  // });

  afterAll(async () => {
    await app.close();
  });
});
