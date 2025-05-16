// backend/routes/adminRoutes.js
import express from "express";
import adminMiddleware from "../middleware/adminMiddleware.js"; // Import the admin middleware

const router = express.Router();

// Example route to add a product (only accessible by admin)
router.post("/add-product", adminMiddleware, (req, res) => {
  // Your logic to add a product
  res.status(200).json({ message: "Product added successfully" });
});

export default router;
