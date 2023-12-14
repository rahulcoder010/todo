const router = require('express').Router();

// Import user and task routes
const userRoutes = require('./user');
const taskRoutes = require('./task');

// Set up routes
router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;