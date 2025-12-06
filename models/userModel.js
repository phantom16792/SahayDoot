const mongoose = require("mongoose");

console.log("Loaded userModel:", __filename);

// GeoJSON reusable schema
const geoSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  mobNo: { type: String, required: true },

  gender: { type: String, enum: ["male", "female", "other"], required: true },

  location: {
    type: geoSchema,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Correct index
userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);
