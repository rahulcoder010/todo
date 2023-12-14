import express from 'express';
import { getUser, createUser } from '../controller/user.js';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const expect = chai.expect;
const app = express();
app.use('/user', router);

describe('User API', () => {
  describe('GET /user', () => {
    it('should return a user', (done) => {
      chai
        .request(app)
        .get('/user')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('email');
          done();
        });
    });

    it('should return an error if no user found', (done) => {
      chai
        .request(app)
        .get('/user')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });

  describe('POST /user', () => {
    it('should create a user', (done) => {
      const newUser = {
        name: 'John Doe',
        email: 'johndoe@example.com',
      };

      chai
        .request(app)
        .post('/user')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('user');
          expect(res.body.user).to.have.property('id');
          expect(res.body.user).to.have.property('name', newUser.name);
          expect(res.body.user).to.have.property('email', newUser.email);
          done();
        });
    });

    it('should return an error if invalid user data', (done) => {
      const invalidUser = {
        name: 'John Doe',
      };

      chai
        .request(app)
        .post('/user')
        .send(invalidUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
});