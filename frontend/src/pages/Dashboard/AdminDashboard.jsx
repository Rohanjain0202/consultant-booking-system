import { useEffect, useState } from 'react';
import {
  getAdminStats,
  getAllUsers,
  getAllServices,
  getAllBookings,
  approveConsultant,
  deleteUser,
  deleteService,
} from '../../utils/adminApi';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, usersRes, servicesRes, bookingsRes] = await Promise.all([
          getAdminStats(),
          getAllUsers(),
          getAllServices(),
          getAllBookings(),
        ]);
        setStats(statsRes.data);
        setUsers(usersRes.data);
        setServices(servicesRes.data);
        setBookings(bookingsRes.data);
      } catch (err) {
        console.error('Error loading admin dashboard:', err);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (userId) => {
    try {
      await approveConsultant(userId);
      setUsers(prev =>
        prev.map(user =>
          user._id === userId ? { ...user, isApproved: true } : user
        )
      );
    } catch (err) {
      console.error('Failed to approve consultant:', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteUser(userId);
      setUsers(prev => prev.filter(user => user._id !== userId));
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await deleteService(serviceId);
      setServices(prev => prev.filter(service => service._id !== serviceId));
    } catch (err) {
      console.error('Failed to delete service:', err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">Total Users: {stats.totalUsers}</div>
        <div className="stat-card">Consultants: {stats.totalConsultants}</div>
        <div className="stat-card">Customers: {stats.totalCustomers}</div>
        <div className="stat-card">Bookings: {stats.totalBookings}</div>
        <div className="stat-card">Services: {stats.totalServices}</div>
      </div>

      {/* Users Table */}
      <h2>Users</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.role === 'consultant' ? (
                  user.isApproved ? '✅ Approved' : '⏳ Pending'
                ) : '✔️'}
              </td>
              <td>
                {user.role === 'consultant' && !user.isApproved && (
                  <button
                    className="btn approve"
                    onClick={() => handleApprove(user._id)}
                  >
                    Approve
                  </button>
                )}
                <button
                  className="btn delete"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Services Table */}
      <h2>Services</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Title</th><th>Category</th><th>Consultant</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service._id}>
              <td>{service.title}</td>
              <td>{service.category}</td>
              <td>{service.consultant?.name || 'N/A'}</td>
              <td>
                <button
                  className="btn delete"
                  onClick={() => handleDeleteService(service._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
