import React, { useEffect, useState } from "react";
import axios from "../../utils/auth";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import "./BookingPage.css";

const BookingPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [consultant, setConsultant] = useState({});
  const [service, setService] = useState({});
  const [availability, setAvailability] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    const fetchServiceAndRelatedData = async () => {
      try {
        // ❌ FIXED: Removed extra `/api` from route
        const serviceRes = await axios.get(`/services/public/${serviceId}`);
        const fetchedService = serviceRes.data;
        setService(fetchedService);

        const consultantId = fetchedService.consultant._id || fetchedService.consultant;
        const consultantRes = await axios.get(`/users/${consultantId}`);
        setConsultant(consultantRes.data);

        const availabilityRes = await axios.get(`/availability/${serviceId}`);
        const fetchedAvailability = availabilityRes.data;

        setAvailability(fetchedAvailability);

        // Extract dates from availability
        const dates = fetchedAvailability.map((slot) => {
          const [year, month, day] = slot.date.split("-");
          return new Date(year, month - 1, day);
        });

        setAvailableDates(dates);
      } catch (err) {
        console.error("❌ Error loading booking page data:", err);
      }
    };

    fetchServiceAndRelatedData();
  }, [serviceId]);

  const selectedDateString = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : null;

  const selectedSlot = availability.find((a) => a.date === selectedDateString);

  const isAvailableDate = (date) => {
    const targetDate = date.toISOString().split("T")[0];
    return availability.some((slot) => slot.date === targetDate);
  };

  const handleBooking = async () => {
    if (!selectedDate || !timeSlot) {
      alert("Please select both a date and time slot.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/bookings", {
        consultant: service.consultant._id || service.consultant,
        service: serviceId,
        date: selectedDateString,
        timeSlot,
      });

      setBookingConfirmed(true);
    } catch (err) {
      console.error("❌ Booking failed:", err);
      if (err.response?.status === 401) {
        alert("You must be logged in to book. Redirecting to login.");
        navigate("/login");
      } else {
        alert("Booking failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmationClose = () => {
    navigate("/my-bookings");
  };

  if (bookingConfirmed) {
    return (
      <div className="booking-success">
        <div className="success-icon">✅</div>
        <h2>Your booking is confirmed!</h2>
        <p>Thank you for choosing our service.</p>
        <button onClick={handleConfirmationClose}>Go to My Bookings</button>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <h2 className="title">📅 Book a Consultation</h2>

      <div className="booking-grid">
        <div className="card">
          <h3>👨‍⚕️ Consultant Details</h3>
          <p><strong>Name:</strong> {consultant.name}</p>
          <p><strong>Email:</strong> {consultant.email}</p>
          <p><strong>Phone:</strong> {consultant.phone}</p>
        </div>

        <div className="card">
          <h3>📝 Service Info</h3>
          <p><strong>Service:</strong> {service.title}</p>
          <p><strong>Category:</strong> {service.category}</p>
          <p><strong>Experience:</strong> {service.experience} years</p>
          <p><strong>Mode:</strong> {service.mode}</p>
          <p><strong>Languages:</strong> {service.languages?.join(", ")}</p>
          <p><strong>Level:</strong> {service.level}</p>
          <p><strong>Tags:</strong> {service.tags?.join(", ")}</p>
          <p><strong>Audience:</strong> {service.audience}</p>
          <p><strong>Session Type:</strong> {service.sessionType}</p>
          <p><strong>Duration:</strong> {service.durationInMinutes} min</p>
          <p><strong>Price:</strong> ₹{service.price}</p>
          <p><strong>Description:</strong> {service.description}</p>
          <p><strong>Note:</strong> {service.availabilityNote}</p>
          {service.certificationUrl && (
            <p><strong>Certificate:</strong> <a href={service.certificationUrl} target="_blank" rel="noopener noreferrer">View</a></p>
          )}
        </div>
      </div>

      <div className="form-section">
        <label><strong>Select Date:</strong></label>
        <DatePicker
          selected={selectedDate}
          onChange={setSelectedDate}
          filterDate={isAvailableDate}
          placeholderText="Click to select available date"
          className="datepicker-input"
          minDate={new Date()}
          dateFormat="PPP"
        />
      </div>

      {selectedSlot && (
        <div className="slot-section">
          <h3>⏰ Available Slots for {format(selectedDate, "PPP")}:</h3>
          <div className="time-slots">
            {selectedSlot.slots.map((slot, index) => (
              <button
                key={index}
                className={`slot-button ${timeSlot === slot ? "selected" : ""}`}
                onClick={() => setTimeSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="button-wrapper">
        <button
          className="confirm-booking-button"
          onClick={handleBooking}
          disabled={!selectedDate || !timeSlot || loading}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
