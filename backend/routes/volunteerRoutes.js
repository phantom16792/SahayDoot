import express from "express";
import { registerVolunteer } from "../controllers/volunteerController.js";

const router = express.Router();

router.post("/register", registerVolunteer);

export default router;
