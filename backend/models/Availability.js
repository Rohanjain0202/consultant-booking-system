// backend/models/availabilityModel.js
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const availabilitySchema = new Schema({
  consultant: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true
  },
  date: {
    type: String,
    required: true // Format: YYYY-MM-DD
  },
  slots: [String] // e.g. ["10:00 AM - 11:00 AM"]
});

export default model("Availability", availabilitySchema);
