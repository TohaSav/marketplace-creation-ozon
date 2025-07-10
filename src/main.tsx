import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} catch (error) {
  console.error("Failed to render app:", error);

  // Fallback: показать базовую HTML структуру
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="min-height: 100vh; background-color: #f3f4f6; display: flex; align-items: center; justify-content: center;">
        <div style="text-align: center;">
          <h1 style="font-size: 1.5rem; font-weight: bold; color: #111827; margin-bottom: 1rem;">Calibre Store</h1>
          <p style="color: #6b7280;">Загрузка...</p>
        </div>
      </div>
    `;
  }
}
