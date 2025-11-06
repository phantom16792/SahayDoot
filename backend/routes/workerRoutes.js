import express from "express";
import { registerWorker } from "../controllers/workerController.js";

const router = express.Router();

router.post("/register", registerWorker);

export default router;
