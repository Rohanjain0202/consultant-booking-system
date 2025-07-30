import express from "express";
import {
  addAvailability,
  getAvailabilityByService,
} from "../controllers/availabilityController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected route for consultants to add availability
router.post("/", protect, addAvailability);

// ✅ Public route to get availability for a service (matches frontend request)
router.get("/:serviceId", getAvailabilityByService);

export default router;
