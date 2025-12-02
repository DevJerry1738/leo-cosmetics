// src/components/RequireAdmin.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

export default function RequireAdmin({ children }: { children: JSX.Element }) {
  const { user, profile, loading } = useAuth();

  // 🔄 Still loading Firebase auth OR profile snapshot
  if (loading || (user && !profile)) {
    return <div>Loading...</div>;
  }

  // 🚪 Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Profile loaded but user is not admin
  if (profile?.role !== "admin") {
    return <Navigate to="/products" replace />;
  }

  // ✅ Admin access granted
  return children;
}
