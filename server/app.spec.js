const supertest = require('supertest');

const app = require('./app');

describe('Production Server', () => {
  describe('GET /login', () => {
    it('should return 200 on unauthorized user', done => {
      supertest(app)
        .get('/login')
        .expect(200, done);
    });
  });
});
