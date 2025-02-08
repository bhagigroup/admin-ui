import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
// import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));



root.render(
  <BrowserRouter>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
  </BrowserRouter>
);
 
reportWebVitals();
