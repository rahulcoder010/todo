import express from 'express';
import { getUser, createUser } from '../controller/user.js';
import chai from 'chai';
import chaiHttp from 'chai-http';

const router = express.Router();
const expect = chai.expect;

chai.use(chaiHttp);

// Test case for GET request
describe('GET /', () => {
  it('should return a status code of 200', (done) => {
    chai
      .request(router)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

// Test case for POST request
describe('POST /', () => {
  it('should return a status code of 201', (done) => {
    const user = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123'
    };

    chai
      .request(router)
      .post('/')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
});

export default router;