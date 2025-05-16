import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Fix for __dirname not being available in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================================
   🚀 Middleware Configurations
================================ */
app.use(cors());
app.use(express.json());

// ✅ Serve static files correctly
const assetsPath = path.join(__dirname, "public", "assets");
console.log("🖼️ Serving static files from: ", assetsPath);
app.use("/assets", express.static(assetsPath));

/* ================================
   🚀 MongoDB Connection
================================ */
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully."))
  .catch((err) => console.error("❌ MongoDB connection error: ", err.message));

/* ================================
   🚀 Routes
================================ */
app.use("/api/auth", authRoutes);            // Authentication routes
app.use("/api/products", productRoutes);     // Product routes

// NEW: Contact route
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  console.log("Received contact message:", { name, email, message });

  // TODO: Save message to DB or send email here

  res.status(200).json({ message: "Message received successfully" });
});

/* ================================
   🚀 Start Server
================================ */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
