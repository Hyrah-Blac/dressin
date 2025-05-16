import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";
import "./Checkout.css";
import { FaTrashAlt } from "react-icons/fa";

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart, removeFromCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [mpesaInfo, setMpesaInfo] = useState({
    phoneNumber: "",
    transactionCode: "",
  });

  const handleApplyPromo = () => {
    if (promoCode === "DRESSIN10") {
      setDiscount(0.1);
      alert("🎉 Promo code applied! 10% off");
    } else {
      alert("🚫 Invalid Promo Code");
    }
  };

  const handlePlaceOrder = () => {
    if (
      Object.values(shippingInfo).includes("") ||
      Object.values(mpesaInfo).includes("")
    ) {
      alert("⚠️ Please fill in all shipping and Mpesa payment details.");
      return;
    }
    alert("🎉 Order Placed Successfully!");
    clearCart();
  };

  const totalAfterDiscount = (getTotalPrice() * (1 - discount)).toFixed(2);

  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleMpesaChange = (e) => {
    setMpesaInfo({ ...mpesaInfo, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="checkout-page">
        <h2>Checkout</h2>

        <div className="checkout-container">
          <div className="order-summary">
            <h3>🛍️ Order Summary</h3>
            {cartItems.length === 0 ? (
              <p>No items in your cart.</p>
            ) : (
              cartItems.map((item) => (
                <div className="checkout-item" key={item.id}>
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.name}
                    className="checkout-image"
                  />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Price: KSh {item.price}</p>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))
            )}
            <h4>Grand Total: KSh {totalAfterDiscount}</h4>
          </div>

          <div className="shipping-payment">
            <h3>🚚 Shipping Details</h3>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              onChange={handleShippingChange}
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              onChange={handleShippingChange}
            />
            <input
              type="text"
              placeholder="City"
              name="city"
              onChange={handleShippingChange}
            />
            <input
              type="text"
              placeholder="State"
              name="state"
              onChange={handleShippingChange}
            />
            <input
              type="text"
              placeholder="Zip Code"
              name="zip"
              onChange={handleShippingChange}
            />

            <h3>📲 Mpesa Payment Details</h3>
            <p className="mpesa-instructions">
              Send <strong>KSh {totalAfterDiscount}</strong> to{" "}
              <strong>Paybill 123456</strong>, Account Number: <strong>Your Name</strong>
            </p>
            <input
              type="text"
              placeholder="Mpesa Phone Number"
              name="phoneNumber"
              onChange={handleMpesaChange}
            />
            <input
              type="text"
              placeholder="Mpesa Transaction Code"
              name="transactionCode"
              onChange={handleMpesaChange}
            />

            <div className="promo-section">
              <input
                type="text"
                placeholder="Enter Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={handleApplyPromo}>Apply</button>
            </div>

            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
