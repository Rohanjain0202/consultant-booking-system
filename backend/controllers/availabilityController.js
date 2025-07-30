// backend/controllers/availabilityController.js

import Availability from "../models/Availability.js";

// Add availability for a specific service
export const addAvailability = async (req, res) => {
  try {
    const { service, date, slots } = req.body;

    if (!service || !date || !slots || !Array.isArray(slots)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEntry = new Availability({
      consultant: req.user._id,
      service,
      date,
      slots,
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    console.error("Add availability error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch availability for a specific service
export const getAvailabilityByService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const availability = await Availability.find({ service: serviceId });
    res.json(availability);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch availability" });
  }
};
