// const express = require("express");
// const router = express.Router();

// const sosController = require("./../controllers/sosController");

// router.route("/users/sos").post(sosController.createSOS);
// router.route("/responders/sos").post(sosController.acceptSOS);

// module.exports = router;



//-------------------------------------------------------
//taken from chat gpt
const express = require("express");
const router = express.Router();

const sosController = require("./../controllers/sosController");

router.route("/users/sos").post(sosController.createSOS);
router.route("/responders/sos").post(sosController.acceptSOS);

// ✅ These routes handle email button clicks:
router.get("/responders/accept", sosController.acceptSOSViaMail);
router.get("/responders/reject", sosController.rejectSOSViaMail);

module.exports = router;



