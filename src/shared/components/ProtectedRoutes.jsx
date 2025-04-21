import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";
import Messages from "../../shared/Utils/Message";
const ProtectedRoute = () => {
  const { state } = useAuth();
  const location = useLocation();
  const { isUserType, isAuthenticated } = state;

  const path = location.pathname;

  const isAdminRoute = path.startsWith("/admin");
  const isAdminLogin = path === "/admin/login";
  const isMyAccountRoute = path.startsWith("/myaccount");
  const isMyAccountLogin = path === "/login";
  const isRegisterRoute = path === "/register";

  // ✅ Redirect already-logged-in users away from login/register pages
  if (isAdminLogin && isUserType === Messages.User.adminUser) {
    //  "admin"
    return <Navigate to="/admin/dashboard" replace />;
  }
  if (
    (isMyAccountLogin || isRegisterRoute) &&
    isUserType === Messages.User.frontendUser
  ) {
    // "frontend"
    return <Navigate to="/myaccount" replace />;
  }
  if (
    (isMyAccountLogin || isRegisterRoute) &&
    isUserType === Messages.User.adminUser
  ) {
    //"admin"
    return <Navigate to="/myaccount" replace />;
  }

  // ✅ Guest logic
  if (!isAuthenticated || isUserType === Messages.User.normalUser) {
    //"guest"
    if (isAdminRoute && !isAdminLogin) {
      return <Navigate to="/admin/login" replace />;
    }
    if (isMyAccountRoute && !isMyAccountLogin) {
      return <Navigate to="/login" replace />;
    }
    return <Outlet />; // allow login/register/public
  }

  // ✅ Frontend logic
  if (isUserType === Messages.User.frontendUser) {
    //"frontend"
    if (isAdminRoute) return <Navigate to="/myaccount" replace />;
    return <Outlet />;
  }

  // ✅ Admin logic
  if (isUserType === Messages.User.adminUser) {
    //"admin"
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
