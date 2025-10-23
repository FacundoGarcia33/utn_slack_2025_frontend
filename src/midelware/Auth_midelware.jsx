import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router";

export const Auth_middleware = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
    setLoading(false);
  }, []);

  if (loading) return <p>Cargando...</p>; // 🔹 evita renderizar antes de tener token
  return token ? <Outlet /> : <Navigate to="/login" />;
};
