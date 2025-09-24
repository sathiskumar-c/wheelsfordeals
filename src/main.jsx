// Reacct Imports
import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

// Package Imports
import "bootstrap/dist/css/bootstrap.min.css";

// Local Imports
import "./index.css";
import App from "./App.jsx";
import { store } from "./redux/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
