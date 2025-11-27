import { useAuth } from "@/cases/auth/hooks/use-auth";
import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";


export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to={`/signin?redirect=${location.pathname}`}
        replace
      />
    );
  }

  return children;
}
