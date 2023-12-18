import express from 'express';
import { getUser, createUser } from '../controller/user.js';
import { mockRequest, mockResponse } from 'mock-req-res';

const router = express.Router();

// Test cases for getUser
test('getUser should respond with status 200 and return user data', () => {
  const req = mockRequest();
  const res = mockResponse();

  getUser(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ name: 'John Doe', age: 30 });
});

test('getUser should handle error and respond with status 500', () => {
  const req = mockRequest();
  const res = mockResponse();

  // Assume that an error occurred during fetching user data
  getUser(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
});

// Test cases for createUser
test('createUser should respond with status 201 and return the created user data', () => {
  const req = mockRequest({ body: { name: 'Jane Doe', age: 25 } });
  const res = mockResponse();

  createUser(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully' });
});

test('createUser should handle invalid input and respond with status 400', () => {
  const req = mockRequest({ body: { name: '', age: 30 } });
  const res = mockResponse();

  createUser(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input' });
});

export default router;