// src/components/AdminRoute.tsx
import type { JSX } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const { profile, loading } = useAuth();
  if (loading) return null;
  if (!profile || profile.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
}
