import express from 'express';
import { getUser, createUser } from '../controller/user.js';

const router = express.Router();

// Issue: The original code imports the 'getUser' and 'createUser' functions from '../controller/user.js' file,
// but it doesn't specify the corresponding route path for each function. 

// Optimized code:

// GET request for getting a user
router.get('/', getUser);

// POST request for creating a user
router.post('/', createUser);

export default router;