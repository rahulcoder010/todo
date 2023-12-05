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

// Test Cases for User Login Module
describe('User Login', () => {
  test('should return status code 200 when user login is successful', () => {
    return request(app)
      .post('/login')
      .send({
        username: 'user1',
        password: 'password123'
      })
      .expect(200);
  });

  test('should return status code 401 when user login fails due to incorrect password', () => {
    return request(app)
      .post('/login')
      .send({
        username: 'user1',
        password: 'incorrectpassword'
      })
      .expect(401);
  });

  test('should return status code 401 when user login fails due to incorrect username', () => {
    return request(app)
      .post('/login')
      .send({
        username: 'incorrectusername',
        password: 'password123'
      })
      .expect(401);
  });
});