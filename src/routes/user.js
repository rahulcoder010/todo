import express from 'express';
import { getUser, createUser } from '../controller/user.js';
import chai from 'chai';
import chaiHttp from 'chai-http';

const router = express.Router();
const expect = chai.expect;
chai.use(chaiHttp);

router.get('/', (req, res) => {
  chai
    .request(router)
    .get('/')
    .end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
});

router.post('/', (req, res) => {
  const user = { name: 'John Doe', age: 25 };
  chai
    .request(router)
    .post('/')
    .send(user)
    .end(function (err, res) {
      expect(res).to.have.status(201);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('name').eq('John Doe');
      expect(res.body).to.have.property('age').eq(25);
      done();
    });
});

export default router;