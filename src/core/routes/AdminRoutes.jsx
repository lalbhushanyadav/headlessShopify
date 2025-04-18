import { Routes, Route } from "react-router-dom";
import Dashboard from "../../apps/backend/pages/Dashboard";
import User from "../../apps/backend/pages/User";
import MasterLayout from "../../shared/Layouts/MasterLayout";
import ProtectedRoute from "../../shared/components/ProtectedRoutes";
const AdminRoutes = () => (
  <Routes>
    {/* Protected admin user area */}
    <Route element={<ProtectedRoute allowedUserTypes={["admin"]} />}>
      <Route element={<MasterLayout />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<User />} />
      </Route>
    </Route>
  </Routes>
);

export default AdminRoutes;
