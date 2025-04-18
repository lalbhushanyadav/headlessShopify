import { Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";
import ThemeSwitcher from "../../features/theme/ThemeSwitcher";
import FrontendHeader from "./Frontend/Header";
import FrontendFooter from "./Frontend/Footer";
import BackendHeader from "./Backend/Header";
import BackendFooter from "./Backend/Footer";
import { useLocation } from "react-router-dom";

const MasterLayout = () => {
  const { state } = useAuth();
  const userType = state.isUserType; // Accessing the isUserType directly
  const { pathname } = useLocation();
  console.log(pathname);

  const isAdminRoute = pathname.startsWith("/admin");
  return (
    <>
      {isAdminRoute ? <BackendHeader /> : <FrontendHeader />}

      <main>
        <Outlet />
      </main>

      {isAdminRoute ? <BackendFooter /> : <FrontendFooter />}

      <ThemeSwitcher />
    </>
  );
};

export default MasterLayout;
