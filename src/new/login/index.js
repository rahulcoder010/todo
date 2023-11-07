/* src/new/login/index.js */

const express = require('express');
const router = express.Router();
const loginController = require('./login');

// Route for login
router.post('/login', loginController.login);

module.exports = router;