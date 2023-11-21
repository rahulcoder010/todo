const express = require('express');
const User = require('../models/User');
const chai = require('chai');
const chaiHttp = require('chai-http');
const userController = require('./user');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Login Endpoint', () => {
  it('should return a success message if login is successful', (done) => {
    const req = {
      body: {
        username: 'testUser',
        password: 'testPassword'
      }
    };
    const res = {
      status: function(code) {
        expect(code).to.equal(200);
        return this;
      },
      json: function(response) {
        expect(response.message).to.equal('Login successful');
        done();
      }
    };
    userController.login(req, res);
  });

  it('should return an error message if login fails', (done) => {
    const req = {
      body: {
        username: 'testUser',
        password: 'invalidPassword'
      }
    };
    const res = {
      status: function(code) {
        expect(code).to.equal(401);
        return this;
      },
      json: function(response) {
        expect(response.message).to.equal('Invalid credentials');
        done();
      }
    };
    userController.login(req, res);
  });
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;