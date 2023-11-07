const express = require('express');
const User = require('../models/User');
const chai = require('chai');
const chaiHttp = require('chai-http');
const router = express.Router();

chai.use(chaiHttp);

describe('Login Endpoint', () => {
  it('should login a user', (done) => {
    chai.request(router)
      .post('/login')
      .send({ email: 'test@gmail.com', password: 'password' })
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql('Login successful');
        done();
      });
  });

  it('should return an error if email is missing', (done) => {
    chai.request(router)
      .post('/login')
      .send({ password: 'password' })
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql('Email is required');
        done();
      });
  });

  it('should return an error if password is missing', (done) => {
    chai.request(router)
      .post('/login')
      .send({ email: 'test@gmail.com' })
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql('Password is required');
        done();
      });
  });

  it('should return an error if email and password are missing', (done) => {
    chai.request(router)
      .post('/login')
      .send({})
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql('Email and password are required');
        done();
      });
  });
});

module.exports = router;