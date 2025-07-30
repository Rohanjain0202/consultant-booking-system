import { useState } from "react";
import api from "../utils/auth";

const ReviewForm = ({ booking }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      await api.post("/reviews", {
        bookingId: booking._id,
        customer: booking.customer._id,
        consultant: booking.consultant._id,
        rating,
        comment,
      });
      alert("✅ Review submitted successfully.");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="review-form">
      <h3>Leave a Review</h3>
      <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map((star) => (
          <option key={star} value={star}>{star} Star</option>
        ))}
      </select>
      <textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit Review</button>
    </div>
  );
};

export default ReviewForm;