import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Header from "./Header";
import HeaderAdmin from "./HeaderAdmin";
import Footer from "./Footer";
import styles from "../styles/Layout.module.css";
import useAuthStore from "../store/authStore";

function Layout() {
  const location = useLocation();
  const { user, setUserAndToken } = useAuthStore();

  // Restaurar datos del usuario desde localStorage al cargar la app
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      const parsedUser = JSON.parse(userStr);
      setUserAndToken(parsedUser, token);
    }
  }, [setUserAndToken]);

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAdminUser = user && user.rol === "admin";

  return (
    <div className={styles.pageContainer}>
      {isAdminRoute && isAdminUser ? <HeaderAdmin /> : <Header />}
      <main className={styles.contentWrap}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;