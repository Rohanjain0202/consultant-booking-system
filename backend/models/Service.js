import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  experience: Number,
  durationInMinutes: Number,
  price: Number,
  category: { type: String, required: true },
  consultant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mode: String,
  languages: [String],
  audience: String,
  level: String,
  tags: [String],
  imageUrl: String,
  availabilityNote: String,
  certificationUrl: String,

  // ✅ Updated location object with detailed address
  location: {
    flat: { type: String },
    street: { type: String },
    area: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String }
  },

  sessionType: String,
  isFeatured: { type: Boolean, default: false }
}, {
  timestamps: true,
});

export default mongoose.model('Service', serviceSchema);
