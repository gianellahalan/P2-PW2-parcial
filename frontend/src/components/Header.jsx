import logo from "../assets/img/logo.png";
import slogan from "../assets/img/the six.png";
import guitarra from "../assets/img/guitarra.png";
import usuario from "../assets/img/usuario.png";
import disco from "../assets/img/disc.png";
import carrito from "../assets/img/carrito.png";
import useSearchStore from "../store/searchStore";
import { Link } from "react-router-dom";

function Header() {
<<<<<<< HEAD

  //Buscar producto por nombre
  const { termino, setTermino } = useSearchStore();

  const handleChange = (e) => {
    setTermino(e.target.value); 
=======
  const { termino, setTermino } = useSearchStore();

  const handleChange = (e) => {
    setTermino(e.target.value);
>>>>>>> 279b5809e4fa2ac973f976bd79f50a3e23be6f55
  };

  return (
    <header>
      <div id="logoyslogan">
        <img src={logo} className="logo" alt="Logo" />
        <img src={slogan} id="slogan" alt="Slogan" />
      </div>

      <div id="buscadorymenu">
<<<<<<< HEAD
        <input
          type="text"
          placeholder="Buscar productos"
          id="buscador"
          value={termino}
          onChange={handleChange}
        />
=======
          <input
            type="text"
            placeholder="Buscar productos o marcas"
            id="buscador"
            value={termino}
            onChange={handleChange}
          />
>>>>>>> 279b5809e4fa2ac973f976bd79f50a3e23be6f55
        <ul id="nav">
          <li>
            <Link to="/login">
              <img src={usuario} className="logos" alt="Iniciar Sesión" />
              <p>Iniciar Sesión</p>
            </Link>
          </li>
          <li>
            <Link to="/productos">
              <img src={guitarra} className="logos" alt="Instrumentos" />
              <p>Instrumentos</p>
            </Link>
          </li>
          <li>
            <Link to="/mispedidos">
              <img src={disco} className="logos" alt="CDs" />
              <p>Mis pedidos</p>
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
