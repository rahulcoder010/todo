// src/new/login/index.js

const express = require('express');
const router = express.Router();
const loginController = require('./login');

// Route code
router.post('/login', loginController.loginUser);

module.exports = router;