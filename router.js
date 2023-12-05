const express = require('express');
const router = express.Router();

// Routes
router.get('/', (req, res) => {
  res.send('Welcome to the homepage');
});

router.get('/about', (req, res) => {
  res.send('Welcome to the about page');
});

router.get('/contact', (req, res) => {
  res.send('Welcome to the contact page');
});

module.exports = router;