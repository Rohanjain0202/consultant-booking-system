// backend/controllers/userController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// ✅ GET /api/users/me
export const getMyProfile = async (req, res) => {
  try {
    res.json(req.user); // comes from authMiddleware
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ PUT /api/users/me
export const updateMyProfile = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    await user.save();

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// ✅ PUT /api/users/change-password
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Both current and new passwords are required' });
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: '✅ Password changed successfully' });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ NEW: GET /api/users/:id (used by BookingPage.jsx)
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
};
