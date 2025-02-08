import React, { useState } from "react";
import Transaction from "./transactions/Transaction";
import History from "./history/History.jsx";
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="wrapper">
      <div className="main-nav">
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              Dashboard
            </a>
          </li>
          
        </ul>
      </div>
      <div className="sub-nav">
        <ul className="nav">
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 1 ? "active" : ""}`}
              onClick={() => setActiveTab(1)}
            >
               Transactions
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 2 ? "active" : ""}`}
              onClick={() => setActiveTab(2)}
            >
               History
            </a>
          </li>
        </ul>
      </div>
      <div className="main-container">
        
        {activeTab === 1 && <Transaction />}
        {activeTab === 2 && <History/>}
      </div>
    </div>
  );
}
