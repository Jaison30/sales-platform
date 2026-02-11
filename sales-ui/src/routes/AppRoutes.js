import React from "react";
import { Routes, Route } from "react-router-dom";
import SalesListPage from "../SalesApp/pages/SalesListPage";
import SalesFormPage from "../SalesApp/pages/SalesFormPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SalesListPage />} />
      <Route path="/sales-form" element={<SalesFormPage />} />
    </Routes>
  );
}

export default AppRoutes;
