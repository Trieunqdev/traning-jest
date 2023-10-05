import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

import { usersObj } from './user-object'

describe('UserController (e2e)', () => {
  let app: INestApplication;



  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/user (POST)', () => {
    it('Should return user saved', async () => {
      const user = await request(app.getHttpServer())
        .post('/user')
        .send(usersObj[0])
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/user/${user.body.id_user}`)
        .expect(200);
    });

    it('Should not return user', async () => {
      const user = await request(app.getHttpServer())
        .post('/user')
        .send(usersObj[0])
        .expect(201);

      await request(app.getHttpServer())
        .post('/user')
        .send(usersObj[0])
        .expect(500);

      await request(app.getHttpServer())
        .delete(`/user/${user.body.id_user}`)
        .expect(200);
    });
  });

  describe('/user/:username (GET)', () => {
    it('Should return user by username', async () => {
      const user = await request(app.getHttpServer())
        .post('/user')
        .send(usersObj[0])
        .expect(201);

      await request(app.getHttpServer())
        .get(`/user/${user.body.username}`)
        .expect(200);

      await request(app.getHttpServer())
        .delete(`/user/${user.body.id_user}`)
        .expect(200);
    });

    it('Should not return user', async () => {
      await request(app.getHttpServer())
        .get(`/user/${usersObj[0].username}`)
        .expect(404);
    });
  });

  describe('/user/:id_user (PUT)', () => {
    it('Should edit user', async () => {
      const user = await request(app.getHttpServer())
        .post('/user')
        .send(usersObj[0])
        .expect(201);

      await request(app.getHttpServer())
        .put(`/user/${user.body.id_user}`)
        .send(usersObj[1])
        .expect(200);

      await request(app.getHttpServer())
        .delete(`/user/${user.body.id_user}`)
        .expect(200);
    });

    it('Should not edit user', async () => {
      await request(app.getHttpServer())
        .put(`/user/${1}`)
        .send(usersObj[1])
        .expect(404);
    });

    it('Should not edit user', async () => {
      const user = await request(app.getHttpServer())
        .post('/user')
        .send(usersObj[0])
        .expect(201);

      await request(app.getHttpServer())
        .put(`/user/${user.body.id_user}`)
        .send(usersObj[0])
        .expect(500);

      await request(app.getHttpServer())
        .delete(`/user/${user.body.id_user}`)
        .expect(200);
    });
  });

  describe('/user/:id_user (DELETE)', () => {
    it('Should delete user', async () => {
      const user = await request(app.getHttpServer())
        .post('/user')
        .send(usersObj[0])
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/user/${user.body.id_user}`)
        .expect(200);
    });

    it('Should not delete user', async () => {
      await request(app.getHttpServer()).delete(`/user/${1}`).expect(404);
    });
  });
});
