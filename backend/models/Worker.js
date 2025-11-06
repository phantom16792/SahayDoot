import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  aadhaar: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  role: { type: String, required: true }
}, { timestamps: true });

const Worker = mongoose.model("Worker", workerSchema);
export default Worker;
