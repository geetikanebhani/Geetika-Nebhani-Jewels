
import React from "react";
import { createRoot } from "react-dom/client";
import App from "../App.jsx";
import { AppProvider } from "../context/AppContext.jsx";

const container = document.getElementById("react-dashboard");

if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
    </React.StrictMode>
  );
}
