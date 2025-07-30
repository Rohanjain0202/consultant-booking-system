// Let the customer select a consultant, service, date, and time slot ,Submit the booking request to /api/bookings , Display success/error message
import { useState } from "react";
import api from "../../utils/auth";
import "./CustomerBooking.css";

const CustomerBooking = () => {
  const [form, setForm] = useState({
    consultant: "",
    service: "",
    date: "",
    timeSlot: ""
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/api/bookings", form); // Send booking to backend
      alert("Booking successful");
    } catch (err) {
      alert("Booking failed");
    }
  };

  return (
    <div className="booking-container">
      <h2>Book a Consultation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="consultant"
          placeholder="Consultant ID"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="service"
          placeholder="Service ID"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="timeSlot"
          placeholder="e.g., 10:00 AM - 11:00 AM"
          onChange={handleChange}
          required
        />
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default CustomerBooking;
