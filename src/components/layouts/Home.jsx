import React from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Routes from "../Routings";

export default function Home() {
  const location = useLocation();
  const { pathname } = location;

  let paths = [
    "/",
    "/login",
    "/signup",
    "/forgotpassword",
    "/v",
    "/verifiedproductdetails",
    "/product-details",
    "/product-journey",
    "/verifymobilenumber",
  ];
  let loginPaths = ["/", "/login", "/signup", "/forgotpassword"];

  return (
    <>
    <Navbar />
    {/*NAVBAR*/}
    <div className="t-container">
      {/*================== NAV ======================*/}
      <Sidebar />
      {/*================== NAV ======================*/}
      <Routes />
    </div>
  </>
  );
}
