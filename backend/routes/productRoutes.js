// backend/routes/productRoutes.js
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
  },
});

const upload = multer({ storage });

/* ================================
   🚀 POST: Add a New Product
   Endpoint: /api/products
================================ */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image upload failed." });
    }

    const imageUrl = `/assets/${req.file.filename}`; // Save image path

    // Create a new product object
    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl,
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
   Endpoint: /api/products
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
   🚀 GET: Fetch Single Product by ID
   Endpoint: /api/products/:id
================================ */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

/* ================================
   🚀 PUT: Update Product Price by ID
   Endpoint: /api/products/:id
================================ */
router.put("/:id", async (req, res) => {
  try {
    const { price } = req.body;
    if (!price) {
      return res.status(400).json({ message: "Price is required" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { price },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product price updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product price:", error.message);
    res.status(500).json({ message: "Failed to update product price" });
  }
});

/* ================================
   🚀 DELETE: Remove Product by ID
   Endpoint: /api/products/:id
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
    console.error("Error deleting product:", error.message);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

export default router;
