import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DeleteProduct.css";

const DeleteProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts(products.filter((product) => product._id !== id));
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error.message);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading Products...</div>;
  }

  return (
    <div className="delete-product-page">
      <h2 className="page-title">Delete Product</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={`http://localhost:5000${product.imageUrl}`}
              alt={product.name}
              className="product-image"
            />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">Price: KSH {product.price}</p>
              <button
                onClick={() => handleDelete(product._id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteProduct;
