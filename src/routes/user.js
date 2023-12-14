import express from 'express';
import { getUser, createUser } from '../controller/user.js';

const router = express.Router();

// Endpoint to get user information
router.get('/', (req, res) => {
  try {
    const user = getUser();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to create a new user
router.post('/', (req, res) => {
  try {
    const newUser = createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;