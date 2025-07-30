import User from '../models/User.js';

export const getAllConsultants = async (req, res) => {
  try {
    const consultants = await User.find({
      role: 'consultant',
      isApproved: true
    }).select('-password');

    res.json(consultants);
  } catch (err) {
    console.error("❌ Error in getAllConsultants:", err);
    res.status(500).json({ message: 'Failed to fetch consultants' });
  }
};

export const getConsultantById = async (req, res) => {
  try {
    const consultant = await User.findById(req.params.id);

    if (!consultant || consultant.role !== 'consultant') {
      return res.status(404).json({ message: 'Consultant not found' });
    }

    res.json(consultant);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

