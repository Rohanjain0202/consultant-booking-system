// src/pages/customer/BookingSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BookingSuccess.css";

const BookingSuccess = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/customer/my-bookings");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleRedirect();
    }, 5000); // auto-redirect after 5s
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="booking-success-container">
      <div className="tick-animation">✔️ hello</div>
      <h2>Your Booking is Confirmed!</h2>
      <p>Thank you for booking. A confirmation email will be sent shortly.</p>
      <button onClick={handleRedirect} className="ok-btn">OK</button>
    </div>
  );
};

export default BookingSuccess;
