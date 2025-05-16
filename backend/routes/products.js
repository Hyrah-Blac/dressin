import express from "express";
import Product from "../models/Product.js"; // Import the Product model
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const router = express.Router();

// Fix for __dirname not being available in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/assets")); // Save uploaded files to 'public/assets'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Append timestamp to the file name
  }
});

const upload = multer({ storage });

/* ================================
   🚀 POST: Add a New Product
================================ */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const imageUrl = `/assets/${req.file.filename}`; // Save image path

    // Create a new product object
    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl
    });

    // Save the product to the database
    await newProduct.save();
    res.status(200).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ message: "Failed to add product" });
  }
});

/* ================================
   🚀 GET: Fetch All Products
================================ */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

/* ================================
   🚀 DELETE: Remove Product by ID
================================ */
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Remove the image from the filesystem
    const imagePath = path.join(__dirname, "../public", product.imageUrl);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Delete the product from the database
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product: ", error.message);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

export default router;
