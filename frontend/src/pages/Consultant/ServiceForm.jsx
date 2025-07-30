// frontend/pages/Consultant/ServiceForm.jsx

import { useState, useEffect } from 'react';
import './ServiceForm.css';
import api from '../../utils/auth';

const categories = [
  "Fitness", "Medical", "Astrology", "Business", "Legal",
  "Education", "Therapy", "Relationship", "Technology", "Career"
];

const ServiceForm = ({ initialData, onFinish, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    experience: '',
    durationInMinutes: '',
    price: '',
    category: '',
    mode: '',
    languages: '',
    audience: '',
    level: '',
    tags: '',
    imageUrl: '',
    availabilityNote: '',
    certificationUrl: '',
    sessionType: '',
    isFeatured: false,
    location: {
      flat: '',
      street: '',
      area: '',
      city: '',
      state: '',
      pincode: ''
    }
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        title: initialData.title || '',
        description: initialData.description || '',
        experience: initialData.experience || '',
        durationInMinutes: initialData.durationInMinutes || '',
        price: initialData.price || '',
        category: initialData.category || '',
        mode: initialData.mode || '',
        languages: initialData.languages?.join(', ') || '',
        audience: initialData.audience || '',
        level: initialData.level || '',
        tags: initialData.tags?.join(', ') || '',
        imageUrl: initialData.imageUrl || '',
        availabilityNote: initialData.availabilityNote || '',
        certificationUrl: initialData.certificationUrl || '',
        sessionType: initialData.sessionType || '',
        isFeatured: initialData.isFeatured || false,
        location: {
          flat: initialData.location?.flat || '',
          street: initialData.location?.street || '',
          area: initialData.location?.area || '',
          city: initialData.location?.city || '',
          state: initialData.location?.state || '',
          pincode: initialData.location?.pincode || ''
        }
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        languages: formData.languages.split(',').map(lang => lang.trim())
      };

      if (initialData?._id) {
        await api.put(`/services/${initialData._id}`, payload);
      } else {
        await api.post('/services', payload);
      }

      onFinish();
    } catch (err) {
      alert('❌ Failed to submit service: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="form-modal-overlay">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="service-form">
          <button type="button" className="form-close-btn" onClick={onClose}>✖</button>

          <h2>{initialData ? 'Edit Service' : 'Add New Service'}</h2>

          {/* Input Fields */}
          {[
            { label: 'Title', name: 'title' },
            { label: 'Description', name: 'description', type: 'textarea' },
            { label: 'Experience (years)', name: 'experience', type: 'number' },
            { label: 'Duration (mins)', name: 'durationInMinutes', type: 'number' },
            { label: 'Price (₹)', name: 'price', type: 'number' },
            { label: 'Languages Spoken', name: 'languages' },
            { label: 'Target Audience', name: 'audience' },
            { label: 'Tags / Skills', name: 'tags' },
            { label: 'Image URL', name: 'imageUrl' },
            { label: 'Availability Note', name: 'availabilityNote', type: 'textarea' },
            { label: 'Certification URL', name: 'certificationUrl' }
          ].map(({ label, name, type = 'text' }) => (
            <div className="form-group" key={name}>
              <label>{label}</label>
              {type === 'textarea' ? (
                <textarea
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  rows={3}
                />
              ) : (
                <input
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}

          <h3>📍 Address Details</h3>
          {[
            { label: 'Flat / House No.', name: 'flat' },
            { label: 'Street', name: 'street' },
            { label: 'Area / Locality', name: 'area' },
            { label: 'City', name: 'city' },
            { label: 'State', name: 'state' },
            { label: 'Pincode', name: 'pincode' }
          ].map(({ label, name }) => (
            <div className="form-group" key={name}>
              <label>{label}</label>
              <input
                name={name}
                value={formData.location[name]}
                onChange={handleLocationChange}
              />
            </div>
          ))}

          {/* Dropdowns */}
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Mode of Service</label>
            <select name="mode" value={formData.mode} onChange={handleChange}>
              <option value="">Select Mode</option>
              <option value="Online">Online</option>
              <option value="In-Person">In-Person</option>
              <option value="Both">Both</option>
            </select>
          </div>

          <div className="form-group">
            <label>Service Level</label>
            <select name="level" value={formData.level} onChange={handleChange}>
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="form-group">
            <label>Session Type</label>
            <select name="sessionType" value={formData.sessionType} onChange={handleChange}>
              <option value="">Select Session Type</option>
              <option value="One-on-One">One-on-One</option>
              <option value="Group">Group</option>
              <option value="Workshop">Workshop</option>
            </select>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
              />
              {' '}Mark as Featured
            </label>
          </div>

          <button type="submit" className="form-btn">
            {initialData ? 'Update Service' : 'Add Service'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;
