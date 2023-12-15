import express from 'express';
// importing the userController and userTest
import { getUser } from '../controller/user.js';
import { createUser } from '../test/userTest.js';

const router = express.Router();

// creating the routes
router.get('/', getUser);
router.post('/', createUser);

export default router;