import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import HeaderAdmin from "./HeaderAdmin";
import Footer from "./Footer";
import styles from "../styles/Layout.module.css";
import useAuthStore from "../store/authStore";

function Layout() {
  const { user, setUserAndToken } = useAuthStore();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      const parsedUser = JSON.parse(userStr);
      setUserAndToken(parsedUser, token);
    }
  }, [setUserAndToken]);

  const isAdminUser = user?.rol === "admin";

  return (
    <div className={styles.pageContainer}>
      {isAdminUser ? <HeaderAdmin /> : <Header />}
      <main className={styles.contentWrap}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
