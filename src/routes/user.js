import express from 'express';
import { getUser, createUser } from '../controller/user.js';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const expect = chai.expect;

const router = express.Router();

describe('User Routes', () => {
  describe('GET /', () => {
    it('should return user data', (done) => {
      chai
        .request(router)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('user');
          expect(res.body.user).to.be.a('string');
          done();
        });
    });
  });

  describe('POST /', () => {
    it('should create a new user', (done) => {
      const newUser = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      chai
        .request(router)
        .post('/')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('user');
          expect(res.body.user).to.be.an('object');
          expect(res.body.user).to.have.property('name');
          expect(res.body.user.name).to.equal(newUser.name);
          expect(res.body.user).to.have.property('email');
          expect(res.body.user.email).to.equal(newUser.email);
          done();
        });
    });
  });
});

export default router;