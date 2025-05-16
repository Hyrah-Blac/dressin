import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const { addToCart } = useCart(); // Get the addToCart function from context
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the product data from the server
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        
        if (response.data) {
          setProduct(response.data); // Set the product data
        } else {
          setError("Product not found!");
        }
      } catch (err) {
        console.error("Error fetching product details:", err.message);
        setError("Product not found!");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      const productData = {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.imageUrl, // Fixed the image prop name
      };
      addToCart(productData);

      // Show toast notification
      toast.success("Item Added to Cart!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (loading) {
    return <div className="loading">Loading Product...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="product-details">
      <ToastContainer />
      <div className="product-detail-container">
        <img
          src={`http://localhost:5000${product.imageUrl}`}
          alt={product.name}
          className="product-image"
        />
        <div className="product-info">
          <h2>{product.name}</h2>
          <p><strong>Description:</strong> {product.description}</p>
          <p className="price"><strong>Price:</strong> KSh {product.price}</p> {/* Changed to KSh */}
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
