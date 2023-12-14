import express from 'express';
import { getUser, createUser } from '../controller/user.js';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const expect = chai.expect;

const router = express.Router();

describe('User Routes', () => {
  it('should return user data', (done) => {
    chai
      .request(router)
      .get('/')
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should create a new user', (done) => {
    const user = {
      name: 'John',
      email: 'john@example.com',
      password: 'password',
    };

    chai
      .request(router)
      .post('/')
      .send(user)
      .end((error, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.equal(user.name);
        expect(res.body.email).to.equal(user.email);
        done();
      });
  });
});

export default router;