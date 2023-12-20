import express from 'express';
import { getUser, createUser } from '../controller/user.js';

// Mock Express Router
const router = {
  get: jest.fn(),
  post: jest.fn()
};

// Mock Express Router Functions
express.Router = jest.fn(() => router);

// Import User Route
import userRoute from '../src/routes/user.js';

describe('User Route', () => {
  test('GET / returns user data', () => {
    // Set Up
    const getUserHandler = jest.fn();
    getUser.mockImplementation(getUserHandler);

    // Execute
    userRoute();

    // Verify
    expect(router.get).toHaveBeenCalledWith('/', getUserHandler);
  });

  test('POST / creates a new user', () => {
    // Set Up
    const createUserHandler = jest.fn();
    createUser.mockImplementation(createUserHandler);

    // Execute
    userRoute();

    // Verify
    expect(router.post).toHaveBeenCalledWith('/', createUserHandler);
  });
});