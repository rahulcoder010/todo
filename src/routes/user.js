import express from 'express';
import { getUser, createUser } from '../controller/user.js';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const expect = chai.expect;

const app = express();
app.use('/users', router);

describe('User Routes', () => {
  describe('GET /users', () => {
    it('should return status 200 and an array of users', (done) => {
      chai.request(app)
        .get('/users')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /users', () => {
    it('should create a new user and return status 201', (done) => {
      const user = { name: 'John Doe', age: 25 };

      chai.request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
  });
});