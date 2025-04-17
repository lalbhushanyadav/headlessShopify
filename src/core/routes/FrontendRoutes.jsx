import { Routes, Route } from "react-router-dom";
import Home from "../../apps/frontend/pages/Home";
import Category from "../../apps/frontend/pages/category";
import MasterLayout from "../../shared/Layouts/MasterLayout";
const FrontendRoutes = () => (
  <Routes>
    <Route element={<MasterLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/category" element={<Category />} />
    </Route>
  </Routes>
);

export default FrontendRoutes;
