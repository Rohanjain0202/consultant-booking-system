import CustomerDetails from '../models/CustomerDetails.js';

export const createOrUpdateDetails = async (req, res) => {
  try {
    const details = { ...req.body, user: req.user.id };

    const updated = await CustomerDetails.findOneAndUpdate(
      { user: req.user.id },
      details,
      { new: true, upsert: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to save customer details", error: err.message });
  }
};

export const getMyDetails = async (req, res) => {
  try {
    const details = await CustomerDetails.findOne({ user: req.user.id });
    res.json(details);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch customer details", error: err.message });
  }
};
