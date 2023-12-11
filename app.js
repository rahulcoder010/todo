```javascript
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');
const routes = require('./src/routes/index');

const app = express();
const port = 3000;

app.use(cors());

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const io = socketIO(server);

app.use('/', routes);

// New code change starts here

// Add an error handler middleware
app.use(function(err, req, res, next) {
  res.status(500).json({ error: err.message });
});

// New code change ends here

module.exports = app;
```