import mongoose from 'mongoose';

const customerDetailsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

  fullName: { type: String, required: true },
  email: { type: String, required: true }, // redundant but useful
  mobile: String,
  gender: String,
  dob: Date,
  address: {
    city: String,
    state: String,
    pincode: String,
  },
  preferredLanguage: String,
  occupation: String,
  timeZone: String,
  consultationMode: String, // Online / In-Person / Either
  preferredSlots: [String], // Morning, Afternoon, Evening
  specialNeeds: String,
  emergencyContact: String,
}, {
  timestamps: true
});

export default mongoose.model('CustomerDetails', customerDetailsSchema);
