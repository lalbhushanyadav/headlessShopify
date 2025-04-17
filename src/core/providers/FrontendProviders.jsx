import { ThemeProvider } from "../../features/theme/context/ThemeContext";
import { AuthProvider } from "../../features/auth/context/AuthContext";
import { CartProvider } from "../../features/cart/context/CartContext";

const FrontendProviders = ({ children }) => (
  <ThemeProvider>
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default FrontendProviders;
