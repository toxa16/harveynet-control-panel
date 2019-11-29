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

    it.todo('should redirect to "/" when the "username" cookie is set');
  });
});
