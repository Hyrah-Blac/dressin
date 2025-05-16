import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📥 Fetch Products from Backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
        setFilteredProducts(response.data); // Default to show all
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 🔄 Filter products in real-time
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  if (loading) {
    return <div className="loading">Loading Products...</div>;
  }

  return (
    <div className="home-page">
      <h2>Our Latest Collection</h2>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={`http://localhost:5000${product.imageUrl}`}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">Price: KSh {product.price}</p> {/* Changed to KSh */}
            <Link
              to={`/product-details/${product._id}`}
              className="product-details-link"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
