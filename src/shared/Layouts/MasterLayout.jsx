import { Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";
import ThemeSwitcher from "../../features/theme/ThemeSwitcher";
import FrontendHeader from "./Frontend/Header";
import FrontendFooter from "./Frontend/Footer";

const MasterLayout = () => {
  const { state } = useAuth();
  const userType = state.isUserType; // Accessing the isUserType directly

  return (
    <>
      {userType === "admin" ? (
        <div className="admin-header">Admin Header</div>
      ) : (
        <FrontendHeader />
      )}

      <main>
        <Outlet />
      </main>

      {userType === "admin" ? (
        <div className="admin-footer">Admin Footer</div>
      ) : (
        <FrontendFooter />
      )}

      <ThemeSwitcher />
    </>
  );
};

export default MasterLayout;
