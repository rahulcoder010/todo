const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');
const routes = require('./src/routes/index');
const request = require('supertest');

const app = express();
const port = 3000;

app.use(cors());

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const io = socketIO(server);

app.use('/', routes);

// Mock data for testing
const mockData = {
  id: 1,
  name: 'John Doe',
  email: 'johndoe@example.com'
};

// Test for Home Page

describe('GET /', () => {
  it('should return status code 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});

// Test for API routes

describe('API Routes', () => {
  it('should return status code 200', async () => {
    const response = await request(app).get('/api/user');
    expect(response.status).toBe(200);
  });

  it('should return a valid user object', async () => {
    const response = await request(app).get('/api/user');
    expect(response.body).toEqual(mockData);
  });

  it('should return status code 404 for non-existing route', async () => {
    const response = await request(app).get('/api/invalid');
    expect(response.status).toBe(404);
  });
});

module.exports = app;