import express from 'express';
import { createOrUpdateDetails, getMyDetails } from '../controllers/customerDetailsController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/me', protect, getMyDetails);
router.post('/me', protect, createOrUpdateDetails);

export default router;
