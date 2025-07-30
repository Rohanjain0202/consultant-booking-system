import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../utils/auth';
import './ServicesByCategory.css';

const ServicesByCategory = () => {
  const { category } = useParams();
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/api/services/category/${category}`)
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Error fetching services by category:", err));
  }, [category]);

  const handleBookNow = (e, service) => {
    e.stopPropagation(); // Prevent bubbling if card becomes clickable again
    navigate(`/book/${service._id}`); // ✅ Correct route param for booking
  };

  return (
    <div className="category-page">
      <h2 className="category-heading">Services in <span>{category}</span> Category</h2>

      {services.length === 0 ? (
        <p className="no-services-text">No services found in this category.</p>
      ) : (
        <div className="service-cards-container">
          {services.map((service) => (
            <div key={service._id} className="service-card">
              <div className="card-header">
                <h3>{service.title}</h3>
              </div>
              <div className="card-body">
                <p className="service-desc">{service.description?.slice(0, 100)}...</p>
                <p><strong>Consultant:</strong> {service.consultant?.name}</p>
                <p><strong>Price:</strong> ₹{service.price}</p>
              </div>
              <button
                className="book-btn"
                onClick={(e) => handleBookNow(e, service)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesByCategory;
