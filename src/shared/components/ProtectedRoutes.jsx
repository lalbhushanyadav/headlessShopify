import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";

const ProtectedRoute = () => {
  const { state } = useAuth();
  const location = useLocation();
  const { isUserType, isAuthenticated } = state;

  const path = location.pathname;

  const isAdminRoute = path.startsWith("/admin");
  const isAdminLogin = path === "/admin/login";
  const isMyAccountRoute = path.startsWith("/myaccount");
  const isMyAccountLogin = path === "/myaccount/login";
  const isRegisterRoute = path === "/register";

  // ✅ Redirect already-logged-in users away from login/register pages
  if (isAdminLogin && isUserType === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }
  if ((isMyAccountLogin || isRegisterRoute) && isUserType === "frontend") {
    return <Navigate to="/myaccount/dashboard" replace />;
  }
  if ((isMyAccountLogin || isRegisterRoute) && isUserType === "admin") {
    return <Navigate to="/myaccount/dashboard" replace />;
  }

  // ✅ Guest logic
  if (!isAuthenticated || isUserType === "guest") {
    if (isAdminRoute && !isAdminLogin) {
      return <Navigate to="/admin/login" replace />;
    }
    if (isMyAccountRoute && !isMyAccountLogin) {
      return <Navigate to="/myaccount/login" replace />;
    }
    return <Outlet />; // allow login/register/public
  }

  // ✅ Frontend logic
  if (isUserType === "frontend") {
    if (isAdminRoute) return <Navigate to="/myaccount/dashboard" replace />;
    return <Outlet />;
  }

  // ✅ Admin logic
  if (isUserType === "admin") {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
