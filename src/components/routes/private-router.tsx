import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/cases/auth/contexts/auth.context";

export function PrivateRoute() {
  const auth = useContext(AuthContext);
  const location = useLocation();

  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
