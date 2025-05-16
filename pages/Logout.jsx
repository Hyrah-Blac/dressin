// src/pages/Logout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the localStorage or sessionStorage to log the user out
    localStorage.removeItem('token');  // If you're storing token in localStorage
    sessionStorage.removeItem('token'); // If you're storing token in sessionStorage

    // Redirect to login page after logout
    navigate('/login');
  }, [navigate]);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
};

export default Logout;
