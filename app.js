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

module.exports = app;

// Test cases for selected files

// Test case 1: Testing if the server starts on the correct port
console.assert(port === 3000, 'Server started on the incorrect port');

// Test case 2: Testing if the app uses the correct routes
console.assert(app.use === routes, 'App does not use the correct routes');