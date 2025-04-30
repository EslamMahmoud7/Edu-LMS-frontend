import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Context/useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (user?.role === "student" && location.pathname.startsWith("/admin")) {
    return <Navigate to="/dashboard" replace />;
  }

  if (user?.role === "admin" && !location.pathname.startsWith("/admin")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
