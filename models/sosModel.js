const mongoose = require("mongoose");


const sosSchema = new mongoose.Schema({

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },

    responderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Responder",
        defalut : null,
    },

    serviceType : {
        type : String,
        enum : ['police','ambulance','firebrigade','volunteer'],
        required : [true,'service type must be specified'],
    },

    statusOfRequest : {
        type : String,
        enum : ['pending','accepted','denied'],
        default : 'pending',
    },

    location : {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Number], 
            required: true,
        },
    },

    createdAt: {
            type: Date,
            default : Date.now,
    },
});

sosSchema.index({ location: "2dsphere" });

const SOS = mongoose.model("SOS", sosSchema);
module.exports = SOS;
