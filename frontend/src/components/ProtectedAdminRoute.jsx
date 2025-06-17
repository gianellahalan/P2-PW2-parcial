import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function ProtectedAdminRoute({ children }) {
  const { user, token } = useAuthStore();

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (user.rol !== "admin") {
    return <Navigate to="/productos" />;
  }

  return children;
}

export default ProtectedAdminRoute;
