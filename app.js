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

// Additional code for bug fix and edge case handling

// Add error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

module.exports = app;
```