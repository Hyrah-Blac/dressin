// src/pages/ProductAdded.jsx
import React, { useEffect, useState } from "react";
import "./ProductAdded.css";

const ProductAdded = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      <h2>All Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img
              src={`http://localhost:5000${product.imageUrl}`}
              alt={product.name}
            />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span>KSH {product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductAdded;
