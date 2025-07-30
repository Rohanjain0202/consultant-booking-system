import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/auth';
import './ConsultantProfile.css';

const ConsultantProfile = () => {
  const { id } = useParams();
  const [consultant, setConsultant] = useState(null);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get(`/users/${id}`);
        const serviceRes = await api.get(`/services?consultantId=${id}`);
        setConsultant(userRes.data);
        setServices(serviceRes.data);
      } catch (err) {
        console.error('❌ Failed to load consultant profile', err);
      }
    };

    fetchData();
  }, [id]);

  const handleBooking = (serviceId) => {
    navigate(`/book/${serviceId}`);
  };

  if (!consultant) return <div className="loading">Loading...</div>;

  return (
    <div className="consultant-profile">
      <div className="consultant-info">
        <h2>{consultant.name}</h2>
        <p><strong>Email:</strong> {consultant.email}</p>
        <p><strong>Category:</strong> {consultant.category}</p>
        <p><strong>Bio:</strong> {consultant.bio || 'No bio available.'}</p>
      </div>

      <h3 className="services-title">Services Offered</h3>
      <div className="services-grid">
        {services.length > 0 ? services.map(service => (
          <div className="service-card" key={service._id}>
            <h4>{service.title}</h4>
            <p>{service.description}</p>
            <p><strong>Price:</strong> ₹{service.price}</p>
            <p><strong>Duration:</strong> {service.durationInMinutes} mins</p>
            <button onClick={() => handleBooking(service._id)}>Book This Service</button>
          </div>
        )) : (
          <p>This consultant has no services listed.</p>
        )}
      </div>
    </div>
  );
};

export default ConsultantProfile;
