import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  contact: String,
  city: String,
  state: String,
  reason: String,
}, { timestamps: true });

export default mongoose.model("Volunteer", volunteerSchema);
