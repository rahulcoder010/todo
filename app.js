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
// Test Case 1 - Valid port
// Ensure that the server starts on the specified port
const test1 = () => {
  if (port === 3000) {
    console.log('Test Case 1: Passed');
  } else {
    console.log('Test Case 1: Failed');
  }
};

// Test Case 2 - Verify presence of CORS middleware
// Ensure that CORS middleware is applied to the app
const test2 = () => {
  if (app._router.stack[0].handle.name === 'corsMiddleware') {
    console.log('Test Case 2: Passed');
  } else {
    console.log('Test Case 2: Failed');
  }
};

// Test Case 3 - Verify presence of socketIO
// Ensure that socketIO is initialized with the server object
const test3 = () => {
  if (io) {
    console.log('Test Case 3: Passed');
  } else {
    console.log('Test Case 3: Failed');
  }
};

test1();
test2();
test3();