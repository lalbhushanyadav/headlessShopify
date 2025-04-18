// src/shared/components/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";

const ProtectedRoute = ({ allowedUserTypes }) => {
  const { state } = useAuth();
  const location = useLocation();

  if (!state.isAuthenticated || !allowedUserTypes.includes(state.isUserType)) {
    // Redirect logic
    if (location.pathname.startsWith("/admin")) {
      return <Navigate to="/admin/login" replace />;
    } else {
      return <Navigate to="/login-register" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
