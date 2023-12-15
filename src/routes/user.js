import express from 'express';
import { getUser, createUser } from '../controller/user.js';

const router = express.Router();

router.get('/', getUser);
router.post('/', createUser);

// Test cases for getUser function
describe('getUser', () => {
  it('should return a user object', () => {
    // Write test code here
  });

  it('should return an error if user is not found', () => {
    // Write test code here
  });
});

// Test cases for createUser function
describe('createUser', () => {
  it('should create a new user and return the user object', () => {
    // Write test code here
  });

  it('should return an error if user creation fails', () => {
    // Write test code here
  });
});

export default router;