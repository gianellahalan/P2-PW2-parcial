import logo from "../assets/img/logo.png";
import slogan from "../assets/img/the six.png";
import guitarra from "../assets/img/guitarra.png";
import usuario from "../assets/img/usuario.png";
import disco from "../assets/img/disc.png";
import carrito from "../assets/img/carrito.png";
import useSearchStore from "../store/searchStore";
import useAuthStore from "../store/authStore";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../index.css";

function Header() {
  const { termino, setTermino } = useSearchStore();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setTermino(e.target.value); 
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header>
      <div id="logoyslogan">
        <img src={logo} className="logo" alt="Logo" />
        <img src={slogan} id="slogan" alt="Slogan" />
      </div>

      <div id="buscadorymenu">
        {location.pathname === "/productos" && (
        <input
          type="text"
          placeholder="Buscar productos"
          id="buscador"
          value={termino}
          onChange={handleChange}
        />
        )}
        <ul id="nav">
          <li>
            {user ? (
              <button onClick={handleLogout} className="botonCerrarSesion">
                <img src={usuario} className="logos" alt="Cerrar sesión" />
                <p>Cerrar sesión</p>
              </button>
            ) : (
              <Link to="/login">
                <img src={usuario} className="logos" alt="Iniciar Sesión" />
                <p>Iniciar Sesión</p>
              </Link>
            )}
          </li>
          <li>
            <Link to="/productos">
              <img src={guitarra} className="logos" alt="Instrumentos" />
              <p>Instrumentos</p>
            </Link>
          </li>
          <li>
            <Link to="/carrito">
              <img src={carrito} className="logos" alt="Carrito" />
              <p>Carrito</p>
            </Link>
          </li>
          <li>
            <Link to="/mispedidos">
              <img src={disco} className="logos" alt="CDs" />
              <p>Mis pedidos</p>
            </Link>
          </li>
          
        </ul>
      </div>
    </header>
  );
}

export default Header;