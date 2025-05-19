import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const Seccion = sessionStorage.getItem("token");

  // 🔥 Si no hay usuario, redirige al login
  if (!Seccion) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
