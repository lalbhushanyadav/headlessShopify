import { useLocation } from "react-router-dom";
import FrontendProviders from "./core/providers/FrontendProviders";
import FrontendRoutes from "./core/routes/FrontendRoutes";
import AdminProviders from "./core/providers/AdminProviders";
import AdminRoutes from "./core/routes/AdminRoutes";

const App = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const isFrontendUser = location.pathname.includes("/myaccount");

  return isAdmin ? (
    <AdminProviders>
      <AdminRoutes />
    </AdminProviders>
  ) : isFrontendUser ? (
    <FrontendProviders>
      <FrontendRoutes />
    </FrontendProviders>
  ) : (
    <FrontendProviders>
      <FrontendRoutes />
    </FrontendProviders>
  );
};

export default App;
