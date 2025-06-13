import instagram from "../assets/img/instagram.png";
import whatsapp from "../assets/img/whatsapp.png";
import facebook from "../assets/img/facebook.png";
import spotify from "../assets/img/spotify.png";
import twitter from "../assets/img/gorjeo.png";

function Footer() {
  return (
    <footer>
      <ul id="redes">
        <li>
          <a href="#">
            <img src={instagram} className="logo" alt="Logo" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src={whatsapp} className="logo" alt="Logo" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src={facebook} className="logo" alt="Logo" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src={spotify} className="logo" alt="Logo" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src={twitter} className="logo" alt="Logo" />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
