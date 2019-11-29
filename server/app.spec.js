const supertest = require('supertest');

const app = require('./app');

describe('Production Server', () => {
  describe('GET /', () => {
    it('should redirect to "/login" on unauthenticated user', done => {
      supertest(app)
        .get('/')
        .expect(302)
        .expect('Location', '/login')
        .end(done);
    });

    it('should return 200 on authenticated user', done => {
      supertest(app)
        .get('/')
        .set('Cookie', 'username=charlie')
        .expect(200)
        .end(done);
    });
  });

  describe('GET /login', () => {
    it('should return 200 on unauthorized user', done => {
      supertest(app)
        .get('/login')
        .expect(200, done);
    });

    it('should redirect to "/" when the "username" cookie is set', done => {
      supertest(app)
        .get('/login')
        .set('Cookie', 'username=charlie')
        .expect(302)
        .expect('Location', '/')
        .end(done);
    });
  });

  describe('POST /login', () => {
    it(
      'should redirect to "/" and set the "username" cookie' +
        ' with the body "username" value',
      done => {
        supertest(app)
          .post('/login')
          .send(`username=charlie`)
          .expect(302)
          .expect('Location', '/')
          .expect('Set-Cookie', /username=charlie/)
          .end(done);
      },
    );
  });

  describe('GET /logout', () => {
    it(
      'should unset the "username" cookie (if present)' +
        ' and redirect to GET "/login"',
      done => {
        supertest(app)
          .get('/logout')
          .set('Cookie', 'username=charlie')
          .expect(302)
          .expect('Location', '/login')
          .expect('Set-Cookie', /username=;/)
          .end(done);
      },
    );
  });
});
