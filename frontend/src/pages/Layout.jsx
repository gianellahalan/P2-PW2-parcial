// src/components/Layout.jsx
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Aquí se renderiza el contenido de cada página */}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
