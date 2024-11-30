import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user")); // Obtener usuario de localStorage

  // Si el usuario no está logueado o su rol no está permitido
  if (!user || !allowedRoles.includes(user.rol)) {
    return <Navigate to="/" replace />; // Redirigir a la página principal
  }

  return children; // Si todo está bien, renderizar el contenido protegido
}
