const express = require('express');
const router = express.Router();
// import controller functions
const { registerUser, updateUser, updatePassword } = require('../controller/user');

// add routes
router.post('/register', registerUser);
router.put('/update', updateUser);
router.patch('/password', updatePassword);

module.exports = router;