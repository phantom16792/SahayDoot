const mongoose = require("mongoose");

// creating schema for user ->
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'A user maust have name'],
    },

    email: {
        type: String,
        required: [true, "User must have an email"],
        unique: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please enter a valid email"],
    },

    mobNo : {
        type: String,
        match: [/^[0-9]{10}$/, "Contact number must be 10 digits"],
        required : [true, 'User must have mobile number'],
    },

    gender : {
        type : String,
        enum : ["male", "female", "other"],
        required : [true, 'User mustt have gender'],
    },

     locations: [
        {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Number], // [longitude, latitude] ha mongo cha GeoJson format aahe.
            required: true,
        },
        },
    ],

    createdAt : {
        type : Date,
        default : Date.now,
    },
});

// Geospatial index for queries
userSchema.index({ locations : "2dsphere" });

const User = mongoose.model("User", userSchema);

module.exports = User;
