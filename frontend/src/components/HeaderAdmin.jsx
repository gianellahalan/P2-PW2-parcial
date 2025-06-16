import logo from "../assets/img/logo.png";
import slogan from "../assets/img/the six.png";
import guitarra from "../assets/img/guitarra.png";
import usuario from "../assets/img/usuario.png";
import disco from "../assets/img/disc.png";
import carrito from "../assets/img/carrito.png";
import { Link, useNavigate } from "react-router-dom";

function HeaderAdmin() {
  const navigate = useNavigate();

  //Cerrar sesión
  const handleLogout = () => {
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
        <input
          type="text"
          placeholder="Buscar productos o marcas"
          id="buscador"
        />

        <ul id="nav">
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            <img src={usuario} className="logos" alt="Cerrar Sesión" />
            <p>Cerrar Sesión</p>
          </li>
          <li>
            <Link to="/admin">
              <img src={guitarra} className="logos" alt="Panel" />
              <p>Panel</p>
            </Link>
          </li>
          <li>
            <Link to="/usuarios">
              <img src={disco} className="logos" alt="CDs" />
              <p>Usuarios</p>
            </Link>
          </li>
          <li>
            <Link to="/pedidos">
              <img src={carrito} className="logos" alt="Carrito" />
              <p>Ver pedidos</p>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default HeaderAdmin;
