import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaHome,
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ onFilter }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const sidebarRef = useRef(null);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
      setIsAdmin(role === "admin");
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsProfileMenuOpen(false);
    navigate("/home");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleProfileMenu = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
      setIsAdmin(role === "admin");
      setIsProfileMenuOpen((prev) => !prev);
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
      navigate("/login");
    }
  };

  const toggleSearchBar = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilter(value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.classList.contains("hamburger")
      ) {
        setIsSidebarOpen(false);
      }

      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target) &&
        !event.target.classList.contains("navbar-icon")
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/home" className="logo-link">
          Dressin
        </Link>
      </div>

      <div className="navbar-right">
        <div className="navbar-icons">
          <Link to="/home">
            <FaHome className="navbar-icon" title="Home" />
          </Link>
          <FaSearch onClick={toggleSearchBar} className="navbar-icon" />
          <Link to="/cart">
            <FaShoppingCart className="navbar-icon" />
          </Link>
          <FaUser
            onClick={toggleProfileMenu}
            className="navbar-icon"
            title="Profile"
          />
        </div>

        {isSearchOpen && (
          <input
            type="text"
            className="search-bar"
            placeholder="Filter products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        )}

        {/* Profile Menu - Only visible if logged in and toggled open */}
        {isLoggedIn && isProfileMenuOpen && (
          <div className="profile-menu" ref={profileMenuRef}>
            {isAdmin ? (
              <>
                <Link to="/add-product">Add Product</Link>
                <Link to="/delete-product">Delete Product</Link>
                <Link to="/admin">Admin Dashboard</Link>
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* For normal users, only show Logout */}
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        )}

        {/* Hamburger menu */}
        <FaBars
          onClick={toggleSidebar}
          className="navbar-icon hamburger"
          title="Menu"
        />
      </div>

      {isSidebarOpen && (
        <div className="sidebar open" ref={sidebarRef}>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/contacts">Contacts</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/checkout">Checkout</Link>
            </li>
            <li>
              <Link to="/account">My Account</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
