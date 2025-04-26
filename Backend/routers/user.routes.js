import express from 'express';
import { getCurrentUser, getAllUsers } from '../controllers/user.controller.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/current', protect, getCurrentUser);
router.get('/', protect, getAllUsers);

export default router;