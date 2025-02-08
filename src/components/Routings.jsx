import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Adding lazy loading components
 
const Dashboard = React.lazy(() => import("./dashboard/Dashboard"));

const ProductsList = React.lazy(() => import("./products/ProductsList"));

export default function Routings() {
  return (
    <div>
      <Suspense>
        <Routes>
          
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/products" element={<ProductsList/>} />
          
        </Routes>
      </Suspense>
    </div>
  );
}
