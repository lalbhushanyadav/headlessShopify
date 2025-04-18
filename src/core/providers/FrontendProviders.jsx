import { ThemeProvider } from "../../features/theme/context/ThemeContext";
import { AuthProvider } from "../../features/auth/context/AuthContext";
import { CartProvider } from "../../features/cart/context/CartContext";
import { ToastProvider } from "./ToastProvider";
const FrontendProviders = ({ children }) => (
  <ThemeProvider>
    <AuthProvider>
      <ToastProvider>
        <CartProvider>{children}</CartProvider>
      </ToastProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default FrontendProviders;
