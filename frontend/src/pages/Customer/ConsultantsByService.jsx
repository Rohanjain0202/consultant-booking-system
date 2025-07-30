// src/pages/Customer/ConsultantsByService.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../utils/auth';
import './ConsultantsByService.css';

const ConsultantsByService = () => {
  const { serviceId } = useParams();
  const [consultants, setConsultants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/consultants/by-service/${serviceId}`)
      .then(res => setConsultants(res.data))
      .catch(err => console.error("Error loading consultants:", err));
  }, [serviceId]);

  const handleBook = (consultantId) => {
    navigate(`/book/${consultantId}`);
  };

  return (
    <div className="consultant-list-page">
      <h2>Consultants for this Service</h2>
      <div className="consultant-grid">
        {consultants.length === 0 ? (
          <p>No consultants available for this service.</p>
        ) : (
          consultants.map(c => (
            <div key={c.consultantId} className="consultant-card">
              <h3>{c.name}</h3>
              <p><strong>Experience:</strong> {c.experience} years</p>
              <p><strong>Price:</strong> ₹{c.price}</p>
              <p><strong>Duration:</strong> {c.durationInMinutes} minutes</p>
              <p>{c.description}</p>
              <button onClick={() => handleBook(c.consultantId)}>Book</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConsultantsByService;
