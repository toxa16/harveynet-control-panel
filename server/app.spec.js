const supertest = require('supertest');

const app = require('./app');

describe('Production Server', () => {
  describe('GET /', () => {
    it.todo('should redirect to "/login" on unauthenticated user');
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
});
