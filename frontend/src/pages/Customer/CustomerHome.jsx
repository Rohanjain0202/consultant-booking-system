import { useEffect, useState } from 'react';
import api from '../../utils/auth';
import './CustomerHome.css';
import ServiceCard from './ServiceCard.jsx';

const CustomerHome = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch all services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services/all'); // ✅ /api prefix handled in Axios baseURL
        setServices(res.data);
      } catch (err) {
        console.error('❌ Error fetching services:', err.response?.data || err.message);
      }
    };
    fetchServices();
  }, []);

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/services/categories/all');
        setCategories(res.data);
      } catch (err) {
        console.error('❌ Error fetching categories:', err.response?.data || err.message);
      }
    };
    fetchCategories();
  }, []);

  // Filter logic (✅ updated to exclude services without valid consultants)
  const filteredServices = services.filter((s) => {
    const hasConsultant = s.consultant && s.consultant.name;
    const matchSearch = s.title?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory ? s.category === selectedCategory : true;
    return hasConsultant && matchSearch && matchCategory;
  });

  return (
    <div className="customer-home">
      <h2>Explore Our Services</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="🔍 Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filteredServices.length > 0 ? (
        <div className="service-list">
          {filteredServices.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      ) : (
        <div className="no-results">No services found</div>
      )}
    </div>
  );
};

export default CustomerHome;
