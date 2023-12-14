const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');

describe('App', () => {
  let server;

  beforeEach(() => {
    server = require('./app'); // Update the file path to "app.js"
  });

  afterEach(() => {
    server.close();
  });

  describe('GET /', () => {
    it('should return a 200 status code', (done) => {
      request(server)
        .get('/')
        .expect(200, done);
    });

    it('should return the correct response body', (done) => {
      request(server)
        .get('/')
        .expect('Content-Type', /json/)
        .expect({ message: 'Hello World' })
        .end(done);
    });
  });
});