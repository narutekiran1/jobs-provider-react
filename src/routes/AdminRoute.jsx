// src/routes/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { role, loading } = useAuth();

  if (loading) return null; // or spinner
  return role === "admin" ? children : <Navigate to="/" />;
};

export default AdminRoute;
