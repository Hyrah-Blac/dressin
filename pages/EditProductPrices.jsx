// src/pages/EditProductPrices.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProductPrices = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [newPrice, setNewPrice] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleUpdatePrice = async () => {
    if (!selectedProduct || !newPrice) {
      alert("Please select a product and enter a new price.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${selectedProduct}`,
        { price: newPrice }
      );

      if (response.status === 200) {
        alert("Product price updated successfully.");
        setNewPrice("");
        setSelectedProduct("");
      } else {
        alert("Failed to update the product price.");
      }
    } catch (error) {
      console.error("Error updating product price:", error.message);
      alert("Failed to update the product price.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Edit Product Prices</h2>

      <select
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
        style={styles.select}
      >
        <option value="" disabled>
          Select a product
        </option>
        {products.map((product) => (
          <option key={product._id} value={product._id}>
            {product.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        min="0"
        placeholder="Enter new price (KSH)"
        value={newPrice}
        onChange={(e) => setNewPrice(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleUpdatePrice} style={styles.button}>
        Update Price
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "30px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    marginBottom: "25px",
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
    fontSize: "1.8rem",
  },
  select: {
    width: "100%",
    padding: "12px 15px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1.5px solid #ccc",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.3s",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    marginBottom: "30px",
    borderRadius: "8px",
    border: "1.5px solid #ccc",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.3s",
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#5A67D8", // soft purple-blue
    color: "#fff",
    fontWeight: "600",
    fontSize: "1.1rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 3px 10px rgba(90,103,216,0.4)",
    transition: "background-color 0.3s ease",
  },
};

export default EditProductPrices;
