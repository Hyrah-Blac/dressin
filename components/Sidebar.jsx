// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ toggleSidebar }) => {
  return (
    <div className="sidebar">
      <ul onClick={toggleSidebar}>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/contacts">Contacts</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
        <li><Link to="/account">My Account</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
