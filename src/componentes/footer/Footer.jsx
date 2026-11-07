
import { Link } from "react-router";

import "./footer.css";
import "../../styles/global.css";

import cartita from "../../assets/componentes/cartita footer.svg";
import mariposa from "../../assets/componentes/mariposa.svg";

export default function Footer() {
  return (
    <footer className="Footer">
      <div className="Footer__principal">

        <div className="Footer__marcaYLinks">
          <Link className="Footer__marca" to="/boutique">
            Clossetly
          </Link>

          <nav
            className="Footer__links"
            aria-label="Enlaces del pie de página"
          >
            <Link to="/armario">Mi armario</Link>
            <Link to="/perfil">Mi cuenta</Link>
            <Link to="/guia-talle">Guía de estilo</Link>
            <Link to="/boutique">Boutique</Link>
            <Link to="/explorar">Explorar</Link>
          </nav>
        </div>

        <div className="Footer__contacto">
          <p className="Footer__contactoTitulo">
            Encontraste un error?
          </p>

          <p className="Footer__contactoTexto">
            Contanos que paso para que podamos mejorarlo
          </p>

          <form className="Footer__formulario">
            <label
              className="Footer__srOnly"
              htmlFor="footer-mensaje"
            >
              Escribí tu mensaje
            </label>

            <input
              id="footer-mensaje"
              type="text"
              placeholder="Escribí tu mensaje..."
            />

            <button type="button">
              Enviar mensaje{" "}
              <span aria-hidden="true">
                <img src={cartita} alt="" />
              </span>
            </button>
          </form>
        </div>

      </div>

      <div className="Footer__flor" aria-hidden="true">
        <span className="Footer__florLinea" />

        <img
          className="Footer__mariposa Footer__mariposa--izquierda"
          src={mariposa}
          alt=""
        />

        <img
          className="Footer__mariposa Footer__mariposa--derecha"
          src={mariposa}
          alt=""
        />
      </div>

      <div className="Footer__legal">
        <span>© 2026 Clossetly. Todos los derechos</span>

        <div>
          <Link to="/preguntas-frecuentes">
            Preguntas frecuentes
          </Link>

          <i />

          <Link to="/terminos-y-condiciones">
            Terminos y condiciones
          </Link>
        </div>
      </div>
    </footer>
  );
}
