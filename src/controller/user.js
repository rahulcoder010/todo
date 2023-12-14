const express = require('express');
const User = require('../models/User');
const chai = require('chai');
const chaiHttp = require('chai-http');

const router = express.Router();

chai.use(chaiHttp);
chai.should();

describe('User', () => {
  describe('POST /register', () => {
    it('should register a new user', () => {
      chai.request(router)
        .post('/register')
        .send({
          username: 'testUser',
          email: 'test@example.com',
          password: 'test123'
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.body.should.have.property('message').eql('User registered successfully');
        });
    });
  });

  describe('PUT /update/:id', () => {
    it('should update a user', () => {
      chai.request(router)
        .put('/update/1')
        .send({
          username: 'updatedUser',
          email: 'updated@example.com',
          password: 'updated123'
        })
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.have.property('username').eql('updatedUser');
          response.body.should.have.property('email').eql('updated@example.com');
          response.body.should.have.property('password').eql('updated123');
        });
    });

    it('should return "User not found" if user not found', () => {
      chai.request(router)
        .put('/update/999')
        .send({
          username: 'updatedUser',
          email: 'updated@example.com',
          password: 'updated123'
        })
        .end((error, response) => {
          response.should.have.status(404);
          response.body.should.have.property('message').eql('User not found');
        });
    });
  });

  describe('PUT /update/password/:id', () => {
    it('should update a user password', () => {
      chai.request(router)
        .put('/update/password/1')
        .send({
          password: 'newpassword'
        })
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.have.property('password').eql('newpassword');
        });
    });

    it('should return "User not found" if user not found', () => {
      chai.request(router)
        .put('/update/password/999')
        .send({
          password: 'newpassword'
        })
        .end((error, response) => {
          response.should.have.status(404);
          response.body.should.have.property('message').eql('User not found');
        });
    });
  });

  describe('POST /login', () => {
    //write test cases for login if required
  });

  describe('POST /forgotpassword', () => {
    //write test cases for forgot password if required
  });
});

module.exports = router;