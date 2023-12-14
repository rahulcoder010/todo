import express from 'express';
import { getUser, createUser } from '../controller/user.js';

const router = express.Router();

// Issue: The code is missing error handling. We should handle errors and send a proper response to the client.

router.get('/', async (req, res, next) => {
  try {
    const user = await getUser();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

export default router;