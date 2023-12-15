// app.test.js
const request = require('supertest');
const app = require('./app');

describe('GET /', () => {
  test('should return 200 OK', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  test('should return "Server started on port 3000"', async () => {
    const response = await request(app).get('/');
    expect(response.text).toContain('Server started on port 3000');
  });
});