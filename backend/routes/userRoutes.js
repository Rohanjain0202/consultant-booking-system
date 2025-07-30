// backend/routes/userRoutes.js
import express from 'express';
import {
  getMyProfile,
  updateMyProfile,
  changePassword,
  getUserById,
} from '../controllers/userController.js';

import { protect } from '../middlewares/authMiddleware.js'; // ✅ Updated import

const router = express.Router();

// ✅ Protected routes using cookie-based access token
router.get('/me', protect, getMyProfile);
router.put('/me', protect, updateMyProfile);
router.put('/change-password', protect, changePassword);

// ✅ Public route to get consultant/customer by ID
router.get('/:id', getUserById);

export default router;
