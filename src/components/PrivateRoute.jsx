import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function PrivateRoute({ children }) {
  const { logado } = useAuth();

  if (!logado) {
    return <Navigate to="/login" />;
  }

  return children;
}
