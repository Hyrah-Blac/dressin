// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import ProductAdded from "./pages/ProductAdded";
import DeleteProduct from "./pages/DeleteProduct";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";             // 🛒 Import Cart Page
import Checkout from "./pages/Checkout";     // 💳 Import Checkout Page
import NotFound from "./pages/NotFound";
import EditProductPrices from "./pages/EditProductPrices";  // ✏️ Import EditProductPrices Page
import Contacts from "./pages/Contacts";      // 📞 Import Contacts Page

/* ================================
   🚀 Protected Route Component
================================ */
const ProtectedRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    alert("You must be logged in to access this page");
    return <Navigate to="/login" />;
  }

  if (role !== roleRequired) {
    alert("Unauthorized Access!");
    return <Navigate to="/home" />;
  }

  return children;
};

/* ================================
   🚀 App Component
================================ */
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // 🔄 Handle the search term coming from Navbar
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router>
      {/* 🔎 Pass the handleSearch function to Navbar */}
      <Navbar onFilter={handleSearch} />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Home Route with Search Term Prop */}
        <Route path="/home" element={<Home searchTerm={searchTerm} />} />

        {/* Contacts Route */}
        <Route path="/contacts" element={<Contacts />} />

        {/* Product Details */}
        <Route path="/product-details/:id" element={<ProductDetails />} />

        {/* 🛒 Cart and Checkout Pages */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <ProtectedRoute roleRequired="admin">
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product-added"
          element={
            <ProtectedRoute roleRequired="admin">
              <ProductAdded />
            </ProtectedRoute>
          }
        />
        <Route
          path="/delete-product"
          element={
            <ProtectedRoute roleRequired="admin">
              <DeleteProduct />
            </ProtectedRoute>
          }
        />

        {/* ✏️ New Route for Editing Product Prices */}
        <Route
          path="/edit-product-prices"
          element={
            <ProtectedRoute roleRequired="admin">
              <EditProductPrices />
            </ProtectedRoute>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
