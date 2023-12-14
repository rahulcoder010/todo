import express from 'express';
import { getUser, createUser } from '../controller/user.js';

const router = express.Router();

router.get('/', getUser);
router.post('/', createUser);

export default router;

// Issue: There is no issue with the original code.

// Optimization: There is no optimization needed for the original code.