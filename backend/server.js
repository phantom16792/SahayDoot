import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import workerRoutes from "./routes/workerRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

// -------------------------
// Middleware
// -------------------------
app.use(cors());
app.use(express.json());

// Serve frontend (HTML/CSS/JS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Public folder → contains HTML files
app.use(express.static(path.join(__dirname, "public")));

// -------------------------
// Database Connection
// -------------------------
connectDB();

// -------------------------
// Frontend Routes
// -------------------------

// Home → Volunteer page (or you can change to index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "vol.html"));
});

// Workers registration page
app.get("/workers", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "workers.html"));
});

// Volunteers registration page
app.get("/volunteer", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "vol.html"));
});

// -------------------------
// Backend API Routes
// -------------------------
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/workers", workerRoutes);

// -------------------------
// Start Server
// -------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Localhost: http://localhost:${PORT}`);
  console.log("📌 Frontend available at:");
  console.log(`➡ Volunteer Form: http://localhost:${PORT}/volunteer`);
  console.log(`➡ Workers Form: http://localhost:${PORT}/workers`);
});
