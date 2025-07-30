import React from "react";
import { useNavigate } from "react-router-dom";
import "./ServiceCard.css";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/book/${service._id}`);
  };

  return (
    <div className="service-card">
      <div className="service-image">
        <img
          src={service.image || "/no-image.jpg"}
          alt={service.title || "Service"}
        />
      </div>
      <div className="service-info">
        <h3>{service.title}</h3>
        <p>{service.description?.slice(0, 100)}...</p>
        <p>
          <strong>Consultant:</strong> {service.consultant?.name || "N/A"}
        </p>
        <p>
          <strong>Category:</strong> {service.category || "General"}
        </p>
        <button className="book-btn" onClick={handleBooking}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
