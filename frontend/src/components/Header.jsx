import logo from "../assets/img/logo.png";
import slogan from "../assets/img/the six.png";
import guitarra from "../assets/img/guitarra.png";
import disco from "../assets/img/disc.png";
import carrito from "../assets/img/carrito.png";
import { Link } from "react-router-dom";

function Header() {
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
          <li>
            <Link to="/productos">
              <img src={guitarra} className="logos" alt="Instrumentos" />
              <p>Instrumentos</p>
            </Link>
          </li>
          <li>
            <Link to="/accesorios">
              <img src={logo} className="logos" alt="Accesorios" />
              <p>Accesorios</p>
            </Link>
          </li>
          <li>
            <Link to="/cds">
              <img src={disco} className="logos" alt="CDs" />
              <p>CDs, discos y vinilos</p>
            </Link>
          </li>
          <li>
            <Link to="/carrito">
              <img src={carrito} className="logos" alt="Carrito" />
              <p>Carrito</p>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
