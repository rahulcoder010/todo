/*** NEW CODE ***/
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('./app');
const routes = require('./src/routes/index');

chai.use(chaiHttp);
const expect = chai.expect;

describe('App', () => {
  let server;

  beforeEach(() => {
    server = app.listen(3000);
  });

  afterEach(() => {
    server.close();
  });

  describe('GET /', () => {
    it('should return a 200 status code', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should load the index route', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res.text).to.contain('Welcome to the index page');
          done();
        });
    });
  });

  describe('POST /login', () => {
    it('should return a 200 status code', (done) => {
      chai.request(app)
        .post('/login')
        .send({ username: 'user', password: '1234' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should return an access token in the response body', (done) => {
      chai.request(app)
        .post('/login')
        .send({ username: 'user', password: '1234' })
        .end((err, res) => {
          expect(res.body).to.have.property('accessToken');
          done();
        });
    });
  });
});