// src/routes/authRoutes.js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const adminCredentials = {
  username: "jblacccccc@gmail.com",
  password: "robbie097+",
};

/* =====================================
   🔓 Admin Login Route
===================================== */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("🔍 Login Attempt — Username:", username);

  // Admin Login Check
  if (username === adminCredentials.username) {
    if (password === adminCredentials.password) {
      console.log("✅ Admin login successful");
      const token = jwt.sign({ username, role: "admin" }, JWT_SECRET, { expiresIn: "2h" });
      return res.status(200).json({ message: "Admin login successful", token, role: "admin" });
    } else {
      console.log("❌ Invalid admin password");
      return res.status(401).json({ message: "Invalid admin password" });
    }
  }

  // User Login Check
  try {
    const user = await User.findOne({ email: username });

    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ message: "User not found" });
    }

    // 🔒 Password verification with bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("❌ Invalid password");
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.isAdmin ? "admin" : "user" },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    console.log("✅ Login successful");
    return res.status(200).json({ message: "Login successful", token, role: user.isAdmin ? "admin" : "user" });

  } catch (error) {
    console.error("❌ Error during login:", error.message);
    return res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

/* =====================================
   🔓 Signup Route
===================================== */
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  console.log("🔍 Signup Attempt — Email:", email);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ User already exists");
      return res.status(400).json({ message: "User already exists. Please login instead." });
    }

    // 🔒 Hashing is handled in the model middleware
    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();
    console.log("✅ User registered successfully");

    return res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("❌ Error during signup:", error.message);
    return res.status(500).json({ message: "Something went wrong during signup." });
  }
});

export default router;
