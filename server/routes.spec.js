const supertest = require('supertest');
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "should" }] */
const should = require('should');

// This agent refers to PORT where program is runninng.

const server = supertest.agent('http://localhost:3000');

describe('Home page request test', () => {
  it('should return home page', (done) => {
    // calling home page
    server
    .get('/')
    .expect(200)
    .end((err, res) => {
      // HTTP status code should equal 200
      res.status.should.equal(200);
      done();
    });
  });
});
