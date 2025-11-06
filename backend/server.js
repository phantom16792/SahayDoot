import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import Volunteer from "./models/Volunteer.js";
import { registerVolunteer } from "./controllers/volunteerController.js";
import workerRoutes from "./routes/workerRoutes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/workers", workerRoutes);

// DB Connection
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("SahayDoot Backend Running Successfully ✅ (MVC)");
});

// Routes
app.use("/api/volunteers", volunteerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
