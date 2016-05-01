const supertest = require('supertest');
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "should" }] */
const should = require('should');
const app = require('./server');

describe('Home page request test', () => {
  it('should return home page', (done) => {
    // calling home page
    supertest(app)
    .get('/')
    .expect(200)
    .end((err, res) => {
      // HTTP status code should equal 200
      res.status.should.equal(200);
      done();
    });
  });
});
