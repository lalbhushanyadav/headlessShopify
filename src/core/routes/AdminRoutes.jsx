import { Routes, Route } from "react-router-dom";
import Dashboard from "../../apps/backend/pages/Dashboard";
import User from "../../apps/backend/pages/User";
import MasterLayout from "../../shared/Layouts/MasterLayout";

const AdminRoutes = () => (
  <Routes>
    <Route element={<MasterLayout />}>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/users" element={<User />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
