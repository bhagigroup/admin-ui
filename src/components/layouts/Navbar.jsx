import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


export default function Navbar() {
  const navigate = useNavigate();
  

  return (
    <nav className="top-nav">
      <div className="container-fluid">
        <div className="row justify-content-between">
          <div className="col-auto g-0">
            <Link to="/dashboard">            
                <img src="assets/images/img1.jpeg" alt="logo" />   
            </Link>
          </div>
          <div className="col-auto align-self-center d-flex r-nav-top">
            <div className="nav-db">
              <a   className="btn">
                Profile
              </a>
            </div>
            
            <div className="btn-group">
              <button
                type="button"
                className="btn dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
