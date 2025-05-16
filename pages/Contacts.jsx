import React, { useState } from "react";
import "./Contacts.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send message");
      }

      setFormData({ name: "", email: "", message: "" });

      // Display Success Toast
      toast.success("✅ Message sent successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      // Display Error Toast
      toast.error(`❌ ${err.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contacts-container">
      <ToastContainer />
      <div className="contacts-info">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Reach out anytime.</p>

        <div className="contact-details">
          <div>
            <h3>Email</h3>
            <a href="mailto:jblacccccc@gmail.com">jblacccccc@gmail.com</a>
          </div>
          <div>
            <h3>Phone</h3>
            <a href="tel:+254708892669">+254-708-892-669</a>
          </div>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Send us a message</h2>

        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            disabled={loading}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            required
            disabled={loading}
          />
        </label>

        <label>
          Message
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
            rows="5"
            required
            disabled={loading}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  );
};

export default Contacts;
