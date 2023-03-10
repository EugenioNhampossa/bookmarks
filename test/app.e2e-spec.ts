import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { AuthDTO } from 'src/Auth/dto';
import { EditUserDTO } from 'src/user/dto';
import { CreateBookmarkDTO, EditBookmarkDTO } from 'src/bookmark/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // excludes elements that are not defined in DTO
      }),
    );
    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService);
    await prisma.cleanDB();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDTO = {
      email: 'test@gmail.com',
      password: '1234',
    };

    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });

      it('should throw if empty', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });

      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
          .stores('token', 'access_token');
      });
    });

    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });

      it('should throw if empty', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });

      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200);
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .get('/users/me')
          .expectStatus(200);
      });

      it('should not get current user', () => {
        return pactum.spec().get('/users/me').expectStatus(401);
      });
    });
    describe('Edit user', () => {
      const dto: EditUserDTO = {
        email: 'newemail@gmail.com',
        firstName: 'newfirstname',
      };

      it('should edit the user', () => {
        return pactum
          .spec()
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .withBody(dto)
          .patch('/users')
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });
  });

  describe('Bookmarks', () => {
    describe('Create bookmark', () => {
      const dto: CreateBookmarkDTO = {
        link: 'https://bookmark.com/1',
        title: 'Bookmark1',
        description: 'This is the first bookmark',
      };
      it('should create bookmark', () => {
        return pactum
          .spec()
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .post('/bookmarks/')
          .withBody(dto)
          .expectStatus(201)
          .stores('bookmarkId', 'id');
      });
    });

    describe('Get all bookmarks', () => {
      it('should get all bookmarks', () => {
        pactum
          .spec()
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .get('/bookmarks')
          .expectStatus(200);
      });
    });

    describe('Get bookmark by id', () => {
      it('should get a bookmark by id', () => {
        return pactum
          .spec()
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .get('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .expectStatus(200);
      });
    });

    describe('Edit bookmark', () => {
      const dto: EditBookmarkDTO = {
        link: 'https://bookmark.com/4',
        title: 'Bookmark4',
        description: 'This is the second bookmark',
      };
      it('should edit bookmark', () => {
        pactum
          .spec()
          .patch('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .withBody(dto)
          .expectStatus(200);
      });
    });

    describe('Delete bookmark', () => {
      it('should delete bookmark', () => {
        pactum
          .spec()
          .delete('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .expectStatus(900)
          .inspect();
      });
    });
  });

  it.todo('should pass');
});
