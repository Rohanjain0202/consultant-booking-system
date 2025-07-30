import { useEffect, useState } from "react";
import api from "../../utils/auth";
import "./BookingHistory.css";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/my-bookings");
        setBookings(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch bookings:", err);
        alert("Error fetching booking history");
      }
    };

    fetchBookings();
  }, []);

  const openReviewModal = (booking) => {
    setSelectedBooking(booking);
    setRating(0);
    setComment("");
  };

  const submitReview = async () => {
    if (!rating || rating < 1 || rating > 5) {
      alert("Please provide a valid rating between 1 and 5.");
      return;
    }

    if (!comment.trim()) {
      alert("Please enter a comment.");
      return;
    }

    try {
      const payload = {
        bookingId: selectedBooking?._id,
        consultantId: selectedBooking?.consultant?._id,
        rating: Number(rating),
        comment: comment.trim(),
      };

      console.log("Submitting review:", payload); // Debug

      await api.post("/reviews", payload);

      setBookings((prev) =>
        prev.map((b) =>
          b._id === selectedBooking._id ? { ...b, reviewGiven: true } : b
        )
      );

      alert("✅ Review submitted!");
      setSelectedBooking(null);
    } catch (err) {
      console.error("❌ Review submit failed", err.response?.data || err);
      alert("Error submitting review. Please try again.");
    }
  };

  return (
    <div className="booking-history-container">
      <h2>Your Booking History</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="booking-cards">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <p><strong>Consultant:</strong> {booking.consultant?.name || "N/A"}</p>
              <p><strong>Service:</strong> {booking.service?.title || booking.service}</p>
              <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>Time Slot:</strong> {booking.timeSlot}</p>
              <p><strong>Status:</strong> <span className={`status ${booking.status}`}>{booking.status}</span></p>
              <p><strong>Payment:</strong> {booking.paymentStatus}</p>

              {booking.status === "completed" && !booking.reviewGiven && (
                <button
                  className="review-btn"
                  onClick={() => openReviewModal(booking)}
                >
                  Give Review
                </button>
              )}
              {booking.reviewGiven && (
                <p className="reviewed-label">✅ Review Submitted</p>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedBooking && (
        <div className="review-modal">
          <div className="review-form">
            <h3>Submit Review</h3>
            <label>Rating (1 to 5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            />
            <label>Comment:</label>
            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="review-buttons">
              <button onClick={submitReview}>Submit</button>
              <button onClick={() => setSelectedBooking(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
