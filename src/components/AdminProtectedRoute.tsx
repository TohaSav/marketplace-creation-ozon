import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export default function AdminProtectedRoute({
  children,
}: AdminProtectedRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (!token || token !== "admin-authenticated") {
      navigate("/admin");
    }
  }, [navigate]);

  const token = localStorage.getItem("admin-token");
  if (!token || token !== "admin-authenticated") {
    return null;
  }

  return <>{children}</>;
}
