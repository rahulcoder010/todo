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
    // Test cases for the login endpoint using chai & mocha
    describe('POST /login', () => {
      it('should return 200 and a success message if username and password match', () => {
        chai.request(app)
          .post('/login')
          .send({ username: 'testuser', password: 'testpassword' })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').equal('Login successful');
          });
      });

      it('should return 401 if username or password is incorrect', () => {
        chai.request(app)
          .post('/login')
          .send({ username: 'testuser', password: 'incorrectpassword' })
          .end((err, res) => {
            expect(res).to.have.status(401);
          });
      });

      it('should return 500 if there is a server error', () => {
        chai.request(app)
          .post('/login')
          .send({ username: 'testuser', password: 'testpassword' })
          .end((err, res) => {
            expect(res).to.have.status(500);
          });
      });
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;