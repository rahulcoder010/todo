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

// Add test cases for login.js
const request = require('supertest');
const app = require('./app');

describe('Login', () => {
  it('should return 200 if login is successful', async () => {
    const response = await request(app).post('/login').send({
      username: 'testuser',
      password: 'testpassword',
    });
    expect(response.status).toBe(200);
  });

  it('should return 401 if login credentials are invalid', async () => {
    const response = await request(app).post('/login').send({
      username: 'invaliduser',
      password: 'invalidpassword',
    });
    expect(response.status).toBe(401);
  });
});