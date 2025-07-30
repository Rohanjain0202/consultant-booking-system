// controllers/reviewController.js

import Review from "../models/reviewModel.js";
import Booking from "../models/booking.js";

// ✅ Add a new review
export const addReview = async (req, res) => {
  try {
    const { bookingId, consultantId, rating, comment } = req.body;
    const customerId = req.user._id;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.customer.toString() !== customerId.toString()) {
      return res.status(403).json({ message: "Unauthorized to review this booking" });
    }

    const existingReview = await Review.findOne({ bookingId });
    if (existingReview) {
      return res.status(400).json({ message: "Review already submitted for this booking" });
    }

    const newReview = new Review({
      bookingId,
      customerId,
      consultantId,
      rating,
      comment,
    });

    await newReview.save();

    booking.reviewGiven = true;
    await booking.save();

    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error("❌ Error in addReview:", error.message);
    res.status(500).json({ message: "Server error while adding review" });
  }
};

// ✅ Get all reviews for a consultant (public)
export const getConsultantReviews = async (req, res) => {
  try {
    const { consultantId } = req.params;

    if (!consultantId) {
      return res.status(400).json({ message: "Consultant ID is required" });
    }

    const reviews = await Review.find({ consultantId })
      .populate("customerId", "name")
      .sort({ createdAt: -1 });

    const avgRating =
      reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : null;

    res.status(200).json({
      reviews,
      averageRating: avgRating,
      totalReviews: reviews.length,
    });
  } catch (error) {
    console.error("❌ Error in getConsultantReviews:", error.message);
    res.status(500).json({ message: "Server error while fetching consultant reviews" });
  }
};

// ✅ Get reviews for currently logged-in consultant
export const getMyConsultantReviews = async (req, res) => {
  try {
    const consultantId = req.user._id;

    const reviews = await Review.find({ consultantId })
      .populate("customerId", "name")
      .sort({ createdAt: -1 });

    const avgRating =
      reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : null;

    res.status(200).json({
      reviews,
      averageRating: avgRating,
      totalReviews: reviews.length,
    });
  } catch (error) {
    console.error("❌ Error in getMyConsultantReviews:", error.message);
    res.status(500).json({ message: "Server error while fetching your consultant reviews" });
  }
};
