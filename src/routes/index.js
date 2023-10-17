const express = require('express');
const router = express.Router();

// Importing routes from other files
const userRoutes = require('./user');
const taskRoutes = require('./task');

// Register routes
router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;