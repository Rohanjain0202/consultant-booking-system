// frontend/pages/consultant/ConsultantServices.jsx

import { useEffect, useState } from "react";
import api from "../../utils/auth";
import AvailabilityForm from "../Consultant/AvailabilityForm";
import ServiceForm from "../Consultant/ServiceForm";
import "./ConsultantServices.css";

const ConsultantServices = () => {
  const [services, setServices] = useState([]);
  const [showFormFor, setShowFormFor] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await api.get('/services/my');
      setServices(res.data);
    } catch (err) {
      alert("❌ Failed to fetch services");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await api.delete(`/services/${id}`);
        fetchServices();
        alert("✅ Service deleted successfully.");
      } catch (err) {
        alert("❌ Failed to delete service.");
      }
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setShowAddForm(true);
    setShowFormFor(null); // close availability form if open
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="consultant-services-container">
      <div className="header-row">
        <h2>🧾 Your Services</h2>
        <button
          onClick={() => {
            setShowAddForm(true);
            setEditingService(null); // open blank form for new service
            setShowFormFor(null);
          }}
          className="add-service-btn"
        >
          ➕ Add New Service
        </button>
      </div>

      {/* Show service form (for adding or editing) */}
      {showAddForm && (
        <div className="form-wrapper">
          <ServiceForm
            initialData={editingService}
            onFinish={() => {
              setShowAddForm(false);
              setEditingService(null);
              fetchServices();
            }}
            onClose={() => {
              setShowAddForm(false);
              setEditingService(null);
            }}
          />
        </div>
      )}

      {services.length === 0 ? (
        <p>No services added yet.</p>
      ) : (
        <div className="services-grid">
          {services.map((service) => (
            <div key={service._id} className="service-card">
              <h3>{service.title}</h3>
              <p><strong>Category:</strong> {service.category}</p>
              <p><strong>Price:</strong> ₹{service.price}</p>
              <p><strong>Description:</strong> {service.description}</p>

              <div className="service-buttons">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(service)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(service._id)}
                >
                  🗑️ Delete
                </button>
                <button
                  onClick={() => setShowFormFor(service._id)}
                  className="add-availability-btn"
                >
                  ➕ Add Availability
                </button>
              </div>

              {showFormFor === service._id && (
                <AvailabilityForm
                  serviceId={service._id}
                  onClose={() => setShowFormFor(null)}
                  onSuccess={() => {
                    setShowFormFor(null);
                    alert("✅ Availability added!");
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConsultantServices;
