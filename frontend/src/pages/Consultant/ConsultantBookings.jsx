import { useEffect, useState } from 'react';
import api from '../../utils/auth';
import './ConsultantBookings.css';

const ConsultantBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get('/bookings/my-consultant-bookings');
        const filtered = res.data.filter(
          booking =>
            booking.status === 'completed' || booking.status === 'cancelled'
        );
        setBookings(filtered);
      } catch (err) {
        console.error('❌ Failed to fetch consultant bookings', err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="consultant-bookings-container">
      <h1 className="consultant-bookings-title">Consultant Bookings</h1>
      <div className="bookings-grid">
        {bookings.length === 0 ? (
          <p>No completed or cancelled bookings yet.</p>
        ) : (
          bookings.map(booking => (
            <div className="booking-card" key={booking._id}>
              <div className="booking-line">
                <span>👤 Customer:</span> {booking.customer?.name} ({booking.customer?.email})
              </div>
              <div className="booking-line">
                <span>🛠 Service:</span> {booking.service?.title || 'N/A'}
              </div>
              <div className="booking-line">
                <span>📅 Date:</span> {new Date(booking.date).toLocaleDateString()}
              </div>
              <div className="booking-line">
                <span>⏰ Time:</span> {booking.time}
              </div>
              <div className="booking-line">
                <span>📌 Status:</span> {booking.status}
              </div>
              <div className="booking-line">
                <span>💰 Payment:</span> {booking.paymentStatus}
              </div>
              <div
                className={`badge-status ${
                  booking.status === 'completed'
                    ? 'badge-completed'
                    : 'badge-cancelled'
                }`}
              >
                {booking.status === 'completed'
                  ? '✅ Completed'
                  : '❌ Cancelled'}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConsultantBookings;
