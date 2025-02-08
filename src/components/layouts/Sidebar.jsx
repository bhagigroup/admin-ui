import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const { pathname } = location;


  return (
    <div className="side-bar" id="nav">
      <nav className="nav__content">
        <Link
          to="/dashboard"
          className={`nav__link ${
            pathname === "/dashboard" ? "active-link" : ""
          }`}
        >
          <span className="material-icons-outlined"> speed </span>
          <span className="nav__name">Dashboard</span>
        </Link>
      
          <Link
            to="/categories"
            className={`nav__link ${
              pathname === "/categories" ? "active-link" : ""
            }`}
          >
            <span className="material-icons-outlined"> category </span>
            <span className="nav__name">Categories</span>
          </Link>
        
          <Link
            to="/products"
            className={`nav__link ${
              pathname === "/products" ? "active-link" : ""
            }`}
          >
            <span className="material-icons-outlined">production_quantity_limits</span>
            <span className="nav__name">Products</span>
          </Link>
          <Link
            to="/brands"
            className={`nav__link ${
              pathname === "/brands" ? "active-link" : ""
            }`}
          >
            <span className="material-icons-outlined">reorder</span>
            <span className="nav__name">Brands</span>
          </Link>

          <Link
            to="/customers"
            className={`nav__link ${
              pathname === "/customers" ? "active-link" : ""
            }`}
          >
            <span className="material-icons-outlined">person_off</span>
            <span className="nav__name">Customers</span>
          </Link>
       
          <Link
            to="/orders"
            className={`nav__link ${
              pathname === "/orders" ? "active-link" : ""
            }`}
          >
            <span className="material-icons-outlined">bookmark_border</span>
            <span className="nav__name">orders</span>
          </Link>
       
          <Link
            to="/settings"
            className={`nav__link ${
              pathname === "/settings" ? "active-link" : ""
            }`}
          >
            <span className="material-icons-outlined"> settings_suggest </span>
            <span className="nav__name">Settings</span>
          </Link>
      
        
         
       
      </nav>
    </div>
  );
}
