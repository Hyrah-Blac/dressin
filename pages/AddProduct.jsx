import React, { useState } from 'react';
import './AddProduct.css'; // Assuming you have a CSS file for styling

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!name || !description || !price || !image) {
      setMessage("⚠️ All fields are required.");
      return;
    }

    setMessage('');
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('✅ Product added successfully!');
        // Clear the form
        setName('');
        setDescription('');
        setPrice('');
        setImage(null);
        document.getElementById("imageInput").value = null; // Reset file input
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage('❌ Failed to add product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-form">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Product Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
        />
        <input 
          type="file" 
          id="imageInput"
          onChange={handleImageChange} 
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default AddProduct;
