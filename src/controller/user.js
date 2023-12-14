const express = require('express');
const User = require('../models/User');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');

chai.use(chaiHttp);

const expect = chai.expect;

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

    // Test case for successful login
    chai.request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'testpassword'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equal('Login successful');
      });

    // Test case for incorrect password
    chai.request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'incorrectpassword'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message').to.equal('Incorrect password');
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Forgot password
router.post('/forgotpassword', async (req, res) => {
  try {
    // Implement forgot password logic here

    // Test case for successful forgot password request
    chai.request(app)
      .post('/forgotpassword')
      .send({
        email: 'testuser@example.com'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equal('Password reset email sent');
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;