import express from 'express';
import { getUser, createUser } from '../controller/user.js';

const router = express.Router();

router.route('/')
  .get(getUser)
  .post(createUser);

export default router;