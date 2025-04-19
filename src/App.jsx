import { useLocation } from "react-router-dom";
import AppProvider from "./core/providers/AppProvider";
import FrontendRoutes from "./core/routes/FrontendRoutes";
import AdminRoutes from "./core/routes/AdminRoutes";

const App = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <AppProvider>{isAdmin ? <AdminRoutes /> : <FrontendRoutes />}</AppProvider>
  );
};

export default App;
