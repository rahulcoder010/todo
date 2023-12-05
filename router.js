```javascript
/*
 * router.js
 */

// Import dependencies
const express = require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Export router
module.exports = router;
```