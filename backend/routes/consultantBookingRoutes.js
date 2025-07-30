import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// ✅ Get all bookings for a consultant
router.get("/consultant/:id", async (req, res) => {
  try {
    const bookings = await Booking.find({ consultant: req.params.id })
      .populate("customer", "name email")
      .populate("service", "name")
      .sort({ date: 1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch consultant bookings", error: err.message });
  }
});

export default router;
