// backend/routes/serviceRoutes.js

import express from 'express';
import {
  createService,
  getConsultantServices,
  updateService,
  getServiceById,
  deleteService,
  getAllServices,
  getServicesByCategory,
  getPublicServiceById,
  getAllCategories,
} from '../controllers/serviceController.js';

import { protect } from '../middlewares/authMiddleware.js'; // ✅ Use your working middleware

const router = express.Router();

// 🔓 Public Routes
router.get('/all', getAllServices);
router.get('/category/:category', getServicesByCategory);
router.get('/public/:id', getPublicServiceById);
router.get('/categories/all', getAllCategories);

// 🔐 Protected Consultant Routes
router.use(protect); // ✅ Apply protect middleware to all below routes

router.get('/my', getConsultantServices);
router.post('/', createService);
router.get('/:id', getServiceById);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;
