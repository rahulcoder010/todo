```javascript
const express = require('express');
const userRoutes = require('./user');
const taskRoutes = require('./task');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;
```