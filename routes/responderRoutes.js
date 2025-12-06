const express = require("express");
const router = express.Router();

const responderController = require("./../controllers/responderController");

router.route("/")
.get(responderController.getAllResponders)
.post(responderController.createResponder);

router.route("/:id")
.get(responderController.getResponder)

module.exports = router;