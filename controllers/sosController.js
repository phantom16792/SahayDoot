const User = require("../models/userModel");
const Responder = require("../models/responderModel");
const SOS = require("../models/sosModel");
const nodemailer = require("nodemailer");

// -----------------------------------------------------------------------------
// 1) CREATE SOS REQUEST
// -----------------------------------------------------------------------------
exports.createSOS = async (req, res) => {
  try {
    const { userId, serviceType } = req.body;

    if (!userId || !serviceType) {
      return res.status(400).json({
        status: "Fail",
        message: "userId & serviceType are required",
      });
    }

    // Fetch user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: "Fail", message: "User not found" });
    }

    // NEW LOCATION FORMAT
    if (!user.location || !user.location.coordinates) {
      return res.status(400).json({
        status: "Fail",
        message: "User does not have valid location data",
      });
    }

    const coordinates = user.location.coordinates; // [longitude, latitude]

    // Find nearby responders
    const nearbyResponders = await Responder.find({
      service: serviceType,
      location: {
        $near: {
          $geometry: { type: "Point", coordinates },
          $maxDistance: 50000, // 50 km
        },
      },
    }).limit(1);

    // Create SOS
    const newSOS = await SOS.create({
      userId,
      serviceType,
      location: {
        type: "Point",
        coordinates,
      },
      responderId:
        nearbyResponders.length > 0 ? nearbyResponders[0]._id : null,
      statusOfRequest: "pending",
    });

    return res.status(201).json({
      status: "success",
      message:
        nearbyResponders.length > 0
          ? "SOS created and responder assigned"
          : "SOS created but no nearby responders found",
      data: newSOS,
    });
  } catch (error) {
    console.error("Error creating SOS:", error);
    return res.status(500).json({
      status: "Fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// -----------------------------------------------------------------------------
// 2) ACCEPT SOS (Via App)
// -----------------------------------------------------------------------------
exports.acceptSOS = async (req, res) => {
  try {
    const { responderId, sosId } = req.body;

    if (!responderId || !sosId) {
      return res.status(400).json({
        status: "Fail",
        message: "responderId & sosId are required",
      });
    }

    const sos = await SOS.findById(sosId);
    if (!sos) {
      return res.status(404).json({
        status: "Fail",
        message: "SOS not found",
      });
    }

    if (sos.statusOfRequest !== "pending") {
      return res.status(400).json({
        status: "Fail",
        message: "SOS already accepted or resolved",
      });
    }

    sos.statusOfRequest = "accepted";
    sos.responderId = responderId;
    await sos.save();

    return res.status(200).json({
      status: "success",
      message: "SOS accepted successfully",
      data: sos,
    });
  } catch (error) {
    console.error("Error accepting SOS:", error);
    return res.status(500).json({
      status: "Fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// -----------------------------------------------------------------------------
// 3) ACCEPT SOS VIA EMAIL
// -----------------------------------------------------------------------------
exports.acceptSOSViaMail = async (req, res) => {
  try {
    const { sosId, responderId } = req.query;

    const sos = await SOS.findById(sosId);
    if (!sos) return res.send("❌ SOS not found");

    sos.statusOfRequest = "accepted";
    sos.responderId = responderId;
    await sos.save();

    res.send("<h2>✅ SOS Accepted. Thank you!</h2>");
  } catch (err) {
    res.send("❌ Error accepting SOS");
  }
};

// -----------------------------------------------------------------------------
// 4) REJECT SOS VIA EMAIL
// -----------------------------------------------------------------------------
exports.rejectSOSViaMail = async (req, res) => {
  try {
    const { sosId, responderId } = req.query;

    const sos = await SOS.findById(sosId);
    if (!sos) return res.send("❌ SOS not found");

    sos.statusOfRequest = "rejected";
    sos.responderId = responderId;
    await sos.save();

    res.send("<h2>🚫 SOS Rejected.</h2>");
  } catch (err) {
    res.send("❌ Error rejecting SOS");
  }
};
