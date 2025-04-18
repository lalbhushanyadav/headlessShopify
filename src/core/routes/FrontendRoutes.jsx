import { Routes, Route } from "react-router-dom";
import Home from "../../apps/frontend/pages/Home";
import MyAccountLogin from "../../apps/frontend/pages/myaccountlogin";
import MasterLayout from "../../shared/Layouts/MasterLayout";
import MyAccount from "../../apps/frontend/pages/MyAccount";
import MyAccountDashboard from "../../apps/frontend/pages/MyAccountDashboard";
import ProtectedRoute from "../../shared/components/ProtectedRoutes";
import Register from "../../apps/frontend/pages/register";

const FrontendRoutes = () => (
  <Routes>
    <Route element={<MasterLayout />}>
      <Route path="/" element={<Home />} />

      <Route
        element={
          <ProtectedRoute allowedUserTypes={["frontend", "admin", "guest"]} />
        }
      >
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/myaccount/dashboard" element={<MyAccountDashboard />} />
        <Route path="/myaccount/login" element={<MyAccountLogin />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Route>
  </Routes>
);

export default FrontendRoutes;
