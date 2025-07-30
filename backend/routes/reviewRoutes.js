// routes/reviewRoutes.js

import express from 'express';
import {
  addReview,
  getConsultantReviews,
  getMyConsultantReviews,
} from '../controllers/reviewController.js';

import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// ✅ Add a review (Customer only)
router.post('/', protect, addReview);

// ✅ Get current consultant's own reviews
router.get('/my', protect, getMyConsultantReviews);  // 🔄 Order matters!

// ✅ Get reviews for a specific consultant (public)
router.get('/:consultantId', getConsultantReviews);

export default router;
