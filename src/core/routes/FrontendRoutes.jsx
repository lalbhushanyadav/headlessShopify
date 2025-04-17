import { Routes, Route } from "react-router-dom";
import Home from "../../apps/frontend/pages/Home";
import LoginRegister from "../../apps/frontend/pages/loginregister";
import MasterLayout from "../../shared/Layouts/MasterLayout";
import MyAccount from "../../apps/frontend/pages/MyAccount";
import MyAccountDashboard from "../../apps/frontend/pages/MyAccountDashboard";
const FrontendRoutes = () => (
  <Routes>
    <Route element={<MasterLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/login-register" element={<LoginRegister />} />
      <Route path="/myaccount" element={<MyAccount />} />
      <Route path="/myaccount/dashboard" element={<MyAccountDashboard />} />
    </Route>
  </Routes>
);

export default FrontendRoutes;
