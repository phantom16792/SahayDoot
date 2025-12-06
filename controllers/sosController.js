// const User = require("./../models/userModel");
// const Responder = require("./../models/responderModel");
// const SOS = require("./../models/sosModel");

// // 1) Create SOS
// exports.createSOS = async (req, res) => {
//   try {
//     const { userId, serviceType } = req.body;

//     // Validate input
//     if (!userId || !serviceType) {
//       return res.status(400).json({
//         status: "Fail",
//         message: "userId & serviceType are required",
//       });
//     }

//     // Get user and their latest location
//     const user = await User.findById(userId);
//     if (!user || !user.locations || user.locations.length === 0) {
//       return res.status(400).json({
//         status: "Fail",
//         message: "User has no location data",
//       });
//     }

//     const latestLocation = user.locations[user.locations.length - 1];
//     const coordinates = latestLocation.coordinates;

//     if (!Array.isArray(coordinates) || coordinates.length !== 2) {
//       return res.status(400).json({
//         status: "Fail",
//         message: "Invalid user coordinates",
//       });
//     }

//     // Find nearby responders (use $near with responder.location)
//     let nearbyResponders = [];
//     try {
//       nearbyResponders = await Responder.find({
//         service: serviceType,
//         location: {
//           $near: {
//             $geometry: { type: "Point", coordinates },
//             $maxDistance: 50000
//           },
//         },
//       });
//     } catch (err) {
//       console.error("Error finding nearby responders:", err);
//       nearbyResponders = [];
//     }

//     // Create SOS document (match schema fields: location)
//     const newSOS = await SOS.create({
//       userId,
//       serviceType,
//       location: {
//         type: "Point",
//         coordinates,
//       },
//       responderId: nearbyResponders.length > 0 ? nearbyResponders[0]._id : null,
//       statusOfRequest: "pending",
//     });

//     return res.status(201).json({
//       status: "success",
//       message:
//         nearbyResponders.length > 0
//           ? `SOS created and nearest responder assigned (if auto-assign)`
//           : `SOS created, but no nearby ${serviceType} responders found`,
//       sos: newSOS,
//       nearbyResponders,
//     });
//   } catch (error) {
//     console.error("Error creating SOS:", error);
//     return res.status(500).json({
//       status: "Fail",
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

// // 2) Accept SOS
// exports.acceptSOS = async (req, res) => {
//   try {
//     const { responderId, sosId } = req.body;

//     // Validate input
//     if (!responderId || !sosId) {
//       return res.status(400).json({
//         status: "Fail",
//         message: "responderId & sosId are required",
//       });
//     }

//     const sos = await SOS.findById(sosId);
//     if (!sos) {
//       return res.status(404).json({
//         status: "Fail",
//         message: "SOS not found",
//       });
//     }

//     if (sos.statusOfRequest !== "pending") {
//       return res.status(400).json({
//         status: "Fail",
//         message: "SOS is already accepted or resolved",
//       });
//     }

//     sos.statusOfRequest = "accepted";
//     sos.responderId = responderId;
//     await sos.save();

//     return res.status(200).json({
//       status: "success",
//       message: "SOS accepted successfully by responder",
//       data: sos,
//     });
//   } catch (error) {
//     console.error("Error accepting SOS:", error);
//     return res.status(500).json({
//       status: "Fail",
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };



// improved from chat gpt ->
// controllers/sosController.js
// 


//chatgpt 3)


const User = require("../models/userModel");
const Responder = require("../models/responderModel");
const SOS = require("../models/sosModel");
const nodemailer = require("nodemailer");

// -----------------------------------------------------------------------------
// 1) Create SOS + Send email directly to nearby responders
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

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const latestLocation = user.locations[user.locations.length - 1];
    const coordinates = latestLocation.coordinates;

    // Find nearby responders (within 5 km)
    const nearbyResponders = await Responder.find({
      service: serviceType,
      location: {
        $near: {
          $geometry: { type: "Point", coordinates },
          $maxDistance: 50000,
        },
      },
    }).limit(1);

    // Create SOS entry
    const newSOS = await SOS.create({
      userId,
      serviceType,
      location: { type: "Point", coordinates },
      responderId:
        nearbyResponders.length > 0 ? nearbyResponders[0]._id : null,
      statusOfRequest: "pending",
    });

    // 🚨 Setup Nodemailer transporter (use your Gmail App Password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sahaydoot@gmail.com", // replace
        pass: "pdwqdwmmpqlafqfk", // Gmail App Password (not your real password)
      },
    });

    // ✅ Send Email Alert to Each Nearby Responder
    for (const responder of nearbyResponders) {
      const acceptURL = `http://localhost:3000/api/v1/sos/responders/accept?sosId=${newSOS._id}&responderId=${responder._id}`;
      const rejectURL = `http://localhost:3000/api/v1/sos/responders/reject?sosId=${newSOS._id}&responderId=${responder._id}`;

      const htmlContent = `
        <div style="font-family:Arial, sans-serif;padding:20px;border:1px solid #ddd;">
          <h2>🚨 Emergency Alert - ${serviceType.toUpperCase()} Requested</h2>
          <p><b>User:</b> ${user.name}</p>
          <p><b>Location:</b> ${coordinates[1]}, ${coordinates[0]}</p>
          <p><b>Type:</b> ${serviceType}</p>
          <p>Please respond to this emergency request:</p>
          <a href="${acceptURL}" style="background-color:green;color:white;padding:10px 15px;border-radius:5px;text-decoration:none;">Accept</a>
          <a href="${rejectURL}" style="background-color:red;color:white;padding:10px 15px;border-radius:5px;text-decoration:none;margin-left:10px;">Reject</a>
        </div>
      `;

      // Send mail directly here
      await transporter.sendMail({
        from: '"SAHAYDOOT ALERT" <sahaydoot@gmail.com>',
        to: "mru36076@gmail.com",//responder.email,
        subject: `SOS Alert: ${serviceType.toUpperCase()} Needed`,
        html: htmlContent,
      });
    }

    return res.status(201).json({
      status: "success",
      message:
        nearbyResponders.length > 0
          ? "SOS created and alert emails sent to nearby responders"
          : "SOS created, but no nearby responders found",
      sos: newSOS,
      respondersFound: nearbyResponders.length,
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
// 2) Accept SOS (via API request from app or Postman)
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
        message: "SOS is already accepted or resolved",
      });
    }

    sos.statusOfRequest = "accepted";
    sos.responderId = responderId;
    await sos.save();

    return res.status(200).json({
      status: "success",
      message: "SOS accepted successfully by responder",
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
// 3) Accept/Reject via Email link
// -----------------------------------------------------------------------------
exports.acceptSOSViaMail = async (req, res) => {
  try {
    const { sosId, responderId } = req.query;
    const sos = await SOS.findById(sosId);
    if (!sos) return res.send("❌ SOS not found");

    sos.statusOfRequest = "accepted";
    sos.responderId = responderId;
    await sos.save();

    res.send("<h2>✅ You have accepted the SOS. Thank you for your response!</h2>");
  } catch (err) {
    console.error(err);
    res.send("❌ Error accepting SOS");
  }
};

exports.rejectSOSViaMail = async (req, res) => {
  try {
    const { sosId, responderId } = req.query;
    const sos = await SOS.findById(sosId);
    if (!sos) return res.send("❌ SOS not found");

    sos.statusOfRequest = "rejected";
    sos.responderId = responderId;
    await sos.save();

    res.send("<h2>🚫 You have rejected the SOS request.</h2>");
  } catch (err) {
    console.error(err);
    res.send("❌ Error rejecting SOS");
  }
};

