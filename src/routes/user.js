import express from 'express';
import { getUser, createUser } from '../controller/user.js';

const router = express.Router();

/**
 * GET /api/user
 * Get user by ID
 */
router.get('/', getUser);

/**
 * POST /api/user
 * Create a new user
 */
router.post('/', createUser);

export default router;