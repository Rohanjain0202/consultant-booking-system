import Booking from "../models/Booking.js";

import { io } from "../server.js";

export const createBooking = async (req, res) => {
  try {
    const { consultant, service, date, timeSlot } = req.body;
    const customer = req.user.id;

    if (!consultant || !service || !date || !timeSlot) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const booking = await Booking.create({
      customer,
      consultant,
      service,
      date,
      timeSlot,
      status: "booked",
      paymentStatus: "paid",
    });

    // Emit socket notification to consultant
    io.emit("new-booking", {
      consultantId: consultant,
      message: "📅 You have a new booking!",
    });

    res.status(201).json({ message: "Booking created", booking });
  } catch (err) {
    console.error("❌ Booking creation failed:", err);
    res.status(500).json({ message: "Failed to create booking", error: err.message });
  }
};

// ✅ Get all bookings (Admin view or optional filter)
export const getAllBookings = async (req, res) => {
  try {
    const filter = {};
    if (req.query.customer) filter.customer = req.query.customer;

    const bookings = await Booking.find(filter)
      .populate("customer", "name email")
      .populate("consultant", "name email")
      .populate("service", "title")
      .sort({ date: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    console.error("❌ Fetch all bookings failed:", err);
    res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
  }
};

// ✅ Get bookings for logged-in customer
export const getCustomerBookings = async (req, res) => {
  try {
    const customerId = req.user.id;

    const bookings = await Booking.find({ customer: customerId })
      .populate("consultant", "name email")
      .populate("service", "title")
      .sort({ date: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    console.error("❌ Fetch customer bookings failed:", err);
    res.status(500).json({ message: "Failed to fetch customer bookings", error: err.message });
  }
};

// ✅ Get bookings for logged-in consultant
export const getConsultantBookings = async (req, res) => {
  try {
    const consultantId = req.user.id;

    const bookings = await Booking.find({ consultant: consultantId })
      .populate("customer", "name email")
      .populate("service", "title")
      .sort({ date: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    console.error("❌ Fetch consultant bookings failed:", err);
    res.status(500).json({ message: "Failed to fetch consultant bookings", error: err.message });
  }
};

// ✅ Update booking status (accept/reject/complete)
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["booked", "completed", "cancelled", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json({ message: "Booking status updated", updatedBooking });
  } catch (err) {
    console.error("❌ Update booking status failed:", err);
    res.status(500).json({ message: "Failed to update booking status", error: err.message });
  }
};
