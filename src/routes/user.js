import express from 'express';
import { getUser, createUser } from '../controller/user.js';

const router = express.Router();

router.route('/')
  .get(getUser)
  .post(createUser);

export default router;

/*
  The original code is correct and there is no issue with it.
  The changes made in the code:
  - Used router.route() method to handle multiple HTTP methods on a route.
  - Separated the two route handlers for GET and POST requests using .get() and .post() methods respectively.
  - This makes the code more readable and maintainable.
  - No additional optimization is required as the code is already in its optimized form.
*/