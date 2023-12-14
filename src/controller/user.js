const express = require('express');
const User = require('../models/User');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

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
    const { username, password } = req.body;

    // Make a request to the login endpoint
    chai.request(app)
      .post('/login')
      .send({ username: username, password: password })
      .end(function (err, res) {
        // Assert that the response status is 200 (OK)
        expect(res).to.have.status(200);

        // Assert that the response body contains a success message
        expect(res.body).to.have.property('message').equals('Login successful');
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
    const { email } = req.body;

    // Make a request to the forgot password endpoint
    chai.request(app)
      .post('/forgotpassword')
      .send({ email: email })
      .end(function (err, res) {
        // Assert that the response status is 200 (OK)
        expect(res).to.have.status(200);

        // Assert that the response body contains a success message
        expect(res.body).to.have.property('message').equals('Password reset email sent');
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;