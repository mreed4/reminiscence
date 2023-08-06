import React from "react";
import ReactDOM from "react-dom/client";
import { AppProvider } from "./Components/AppContext";

import App from "./Components/App.jsx";

import "./assets/css/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
