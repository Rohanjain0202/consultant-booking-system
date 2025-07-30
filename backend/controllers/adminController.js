import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Service from '../models/Service.js';

// ✅ GET /api/admin/stats
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalConsultants = await User.countDocuments({ role: 'consultant' });
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const totalBookings = await Booking.countDocuments();
    const totalServices = await Service.countDocuments();

    res.json({
      totalUsers,
      totalConsultants,
      totalCustomers,
      totalBookings,
      totalServices,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch admin stats' });
  }
};

// ✅ GET /api/admin/users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// ✅ PUT /api/admin/users/:id/approve
export const approveConsultant = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'Consultant approved successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to approve consultant' });
  }
};

// ✅ DELETE /api/admin/users/:id
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

// ✅ GET /api/admin/services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate('consultant', 'name email');
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch services' });
  }
};

// ✅ DELETE /api/admin/services/:id
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) return res.status(404).json({ message: 'Service not found' });

    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete service' });
  }
};

// ✅ GET /api/admin/bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('customer', 'name email')
      .populate('consultant', 'name email')
      .populate('service', 'title');

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};


export const toggleApproval = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isApproved = !user.isApproved;
    await user.save();

    res.json({ message: `User approval ${user.isApproved ? 'granted' : 'revoked'}`, user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update approval' });
  }
};
