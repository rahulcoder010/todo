import express from 'express';
import { getUser, createUser } from '../controller/user.js';

const router = express.Router();

router.get('/', getUser);
router.post('/', createUser);

// This code is not testable as it only exports a router instance and does not contain any logic or functions to be tested.