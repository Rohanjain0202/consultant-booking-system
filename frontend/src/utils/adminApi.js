import api from './auth';

export const getAdminStats = () => api.get('/admin/stats');
export const getAllUsers = () => api.get('/admin/users');
export const approveConsultant = (id) => api.put(`/admin/users/${id}/approve`);
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);
export const getAllServices = () => api.get('/admin/services');
export const deleteService = (id) => api.delete(`/admin/services/${id}`);
export const getAllBookings = () => api.get('/admin/bookings');
export const toggleUserApproval = (id) => api.put(`/admin/users/${id}/toggle-approval`);

