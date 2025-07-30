import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../utils/auth';

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/services/all`)
      .then(res => {
        const found = res.data.find(s => s._id === id);
        setService(found);
      })
      .catch(err => console.error("Error loading service:", err));
  }, [id]);

  if (!service) return <p>Loading...</p>;

  const handleBook = () => {
    navigate(`/book/${service.consultant._id}`);
  };

  return (
    <div className="service-detail">
      <h2>{service.title}</h2>
      <p>{service.description}</p>
      <p>Price: ₹{service.price}</p>
      <p>Duration: {service.durationInMinutes} minutes</p>
      <p>Consultant: {service.consultant.name}</p>
      <button onClick={handleBook}>Book Now</button>
    </div>
  );
};

export default ServiceDetail;
