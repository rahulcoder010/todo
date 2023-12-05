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

// Test cases for user login module

describe('User Login', () => {
  test('should return 200 status code when user login is successful', () => {
    // write test case here
  });

  test('should return 401 status code when user login is unsuccessful', () => {
    // write test case here
  });

  // Add more test cases as needed
});
