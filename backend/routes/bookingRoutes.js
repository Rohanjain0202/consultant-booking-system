// bookingRoutes.js
import express from 'express';
import {
  createBooking,
  getAllBookings,
  getCustomerBookings,
  getConsultantBookings,
  updateBookingStatus
} from '../controllers/bookingController.js';

import { protect } from '../middlewares/authMiddleware.js'; // ✅ use the correct one

const router = express.Router();

// 🔐 All routes protected
router.use(protect); // ✅ use this instead of verifyAccessToken

// 👤 Customer routes
router.get('/my-bookings', getCustomerBookings);

// 👨‍🏫 Consultant routes
router.get('/my-consultant-bookings', getConsultantBookings);

// 🛠 Admin - get all bookings (optionally filter by ?customer=id)
router.get('/', getAllBookings);

// ➕ Create new booking
router.post('/', createBooking);

// ✅ Update booking status
router.put('/:id/status', updateBookingStatus);
router.patch('/:id/status', updateBookingStatus);

export default router;
