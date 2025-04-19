import { Routes, Route } from "react-router-dom";
import Home from "../../apps/frontend/pages/Home";
import MyAccountLogin from "../../apps/frontend/pages/Login";
import MasterLayout from "../../shared/Layouts/MasterLayout";
import MyAccount from "../../apps/frontend/pages/MyAccount";
import MyAccountDashboard from "../../apps/frontend/pages/MyAccountDashboard";
import ProtectedRoute from "../../shared/components/ProtectedRoutes";
import Register from "../../apps/frontend/pages/register";
import Messages from "../../shared/Utils/Message";
import Category from "../../apps/frontend/pages/category";
import ProductDetails from "../../apps/frontend/pages/ProductDetails";
import Cart from "../../apps/frontend/pages/Cart";
import Checkout from "../../apps/frontend/pages/Checkout";

const FrontendRoutes = () => (
  <Routes>
    <Route element={<MasterLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/category/:handle" element={<Category />} />
      <Route path="/product/:handle" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />

      <Route
        element={
          <ProtectedRoute allowedUserTypes={Object.values(Messages.User)} />
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
