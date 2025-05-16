// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Tailwind CSS and global styles
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext"; // 🛒 Import Cart Context Provider

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <CartProvider> {/* 🛒 Wrap with CartProvider */}
        <App />
      </CartProvider>
    </StrictMode>
  );
} else {
  console.error("Root element not found. Make sure your index.html has a <div id='root'></div>");
}
