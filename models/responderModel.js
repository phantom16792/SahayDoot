const mongoose = require("mongoose");

const responderSchema = new mongoose.Schema({
    nameOfStation : {
        type : String,
        required : [true, 'responder must have name of station']
    },

    service : {
        type : String,
        enum : ['police', 'ambulance', 'firebrigade','volunteer'],
        required : [true, 'service type must be specified'],
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
        required: [true, 'User must have mobile number'],
    },

    location : {

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

    createdAt : {
        type : Date,
        default : Date.now,
    }
});

// Geospatial index for queries
responderSchema.index({ location: "2dsphere" });

const Responder = mongoose.model("Responder", responderSchema);
module.exports = Responder;