import express from 'express';
import {
  getAdminStats,
  getAllUsers,
  approveConsultant,
  deleteUser,
  getAllServices,
  deleteService,
  getAllBookings,
  toggleApproval
} from '../controllers/adminController.js';

import verifyAccessToken from '../middlewares/verifyAccessToken.js';
import checkAdminRole from '../middlewares/checkAdminRole.js'; // ✅

const router = express.Router();

router.use(verifyAccessToken); // ✅ Must be logged in
router.use(checkAdminRole);    // ✅ Must be admin

router.get('/stats', getAdminStats);
router.get('/users', getAllUsers);
router.put('/users/:id/approve', approveConsultant);
router.delete('/users/:id', deleteUser);
router.get('/services', getAllServices);
router.delete('/services/:id', deleteService);
router.get('/bookings', getAllBookings);
router.put('/users/:id/toggle-approval', toggleApproval);

export default router;
