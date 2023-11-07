const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({ username, email, password });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a user
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, {
      username,
      email,
      password
    }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update password
router.put('/update/password/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, {
      password
    }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    // Implement login logic here
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Forgot password
router.post('/forgotpassword', async (req, res) => {
  try {
    // Implement forgot password logic here
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

// Test cases using chai and mocha
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
chai.use(chaiHttp);

describe('User API', () => {
  // Register a new user
  describe('POST /register', () => {
    it('should register a new user', (done) => {
      chai.request(app)
        .post('/api/user/register')
        .send({
          username: 'testuser',
          email: 'testemail@example.com',
          password: 'testpassword'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('User registered successfully');
          done();
        });
    });
  });

  // Update a user
  describe('PUT /update/:id', () => {
    it('should update a user', (done) => {
      chai.request(app)
        .put('/api/user/update/123')
        .send({
          username: 'updateduser',
          email: 'updatedemail@example.com',
          password: 'updatedpassword'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.username).to.equal('updateduser');
          expect(res.body.email).to.equal('updatedemail@example.com');
          expect(res.body.password).to.equal('updatedpassword');
          done();
        });
    });
  });

  // Update password
  describe('PUT /update/password/:id', () => {
    it('should update the password of a user', (done) => {
      chai.request(app)
        .put('/api/user/update/password/123')
        .send({
          password: 'newpassword'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.password).to.equal('newpassword');
          done();
        });
    });
  });
});