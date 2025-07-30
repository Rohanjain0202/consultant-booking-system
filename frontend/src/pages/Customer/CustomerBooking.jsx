// src/pages/customer/CustomerBooking.jsx
import { useEffect, useState } from "react";
import api from "../../utils/auth";
import "./CustomerBooking.css";

const CustomerBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/api/bookings/my-bookings"); // ✅ correct route
      setBookings(res.data);
    } catch (err) {
      console.error("❌ Error fetching bookings:", err);
      alert("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await api.patch(`/api/bookings/${bookingId}/status`, { status: "cancelled" });
      alert("Booking cancelled");
      setBookings(prev =>
        prev.map(b => b._id === bookingId ? { ...b, status: "cancelled" } : b)
      );
    } catch (err) {
      console.error("❌ Cancel failed:", err);
      alert("Failed to cancel booking");
    }
  };

  return (
    <div className="customer-booking-container">
      <h2 className="booking-heading">📋 Your Bookings</h2>

      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="booking-cards">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <p><strong>👤 Consultant:</strong> {booking.consultant?.name || "N/A"}</p>
              <p><strong>🧰 Service:</strong> {booking.service?.title || "N/A"}</p>
              <p><strong>📅 Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>⏰ Time:</strong> {booking.timeSlot}</p>
              <p><strong>📍 Status:</strong> {booking.status}</p>
              <p><strong>💳 Payment:</strong> {booking.paymentStatus}</p>

              {booking.status === "booked" && (
                <button className="cancel-btn" onClick={() => handleCancel(booking._id)}>
                  ❌ Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerBooking;
