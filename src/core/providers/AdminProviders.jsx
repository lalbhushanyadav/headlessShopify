import { ThemeProvider } from "../../features/theme/context/ThemeContext";
import { AuthProvider } from "../../features/auth/context/AuthContext";

const AdminProviders = ({ children }) => (
  <ThemeProvider>
    <AuthProvider>{children}</AuthProvider>
  </ThemeProvider>
);

export default AdminProviders;
