import { ThemeProvider } from "../../features/theme/context/ThemeContext";
import { AuthProvider } from "../../features/auth/context/AuthContext";
import { ToastProvider } from "./ToastProvider";

const AdminProviders = ({ children }) => (
  <ThemeProvider>
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default AdminProviders;
