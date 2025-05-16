import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

const FALLBACK_IMAGE = "http://localhost:5000/assets/placeholder.jpg"; // Fallback image

const Cart = () => {
  const { cartItems, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/home">Continue Shopping</Link>
        </p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li className="cart-item" key={item.id}>
                <img
                  src={item.image ? item.image : FALLBACK_IMAGE}
                  alt={item.name}
                  className="cart-item-image"
                  onError={(e) => {
                    console.warn(`⚠️ Image failed to load for ${item.name}: ${item.image}. Using fallback.`);
                    e.target.src = FALLBACK_IMAGE; // Use fallback if image fails
                  }}
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Price: KSh {item.price}</p> {/* Changed to KSh */}
                  <p>Quantity: {item.quantity}</p>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <h3>Total: KSh {getTotalPrice()}</h3> {/* Changed to KSh */}
            <button className="proceed" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
