
import "./footer.css";
import cartita from "../../assets/componentes/cartita footer.svg";
import mariposa from "../../assets/componentes/mariposa.svg";
export default function Footer() {
  return (
    <footer className="Footer">
      <div className="Footer__principal">
        <div className="Footer__marcaYLinks">
          <a className="Footer__marca" href="#">
            Clossetly
          </a>

          <nav
            className="Footer__links"
            aria-label="Enlaces del pie de página"
          >
            <a href="#">Mi armario</a>
            <a href="#">Mi cuenta</a>
            <a href="#">Guía de estilo</a>
            <a href="#">Boutique</a>
            <a href="#">Explorar</a>
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
        <img className="Footer__mariposa Footer__mariposa--izquierda" src={mariposa} alt="" />
        <img className="Footer__mariposa Footer__mariposa--derecha" src={mariposa} alt="" />
      </div>

      <div className="Footer__legal">
        <span>© 2026 Clossetly. Todos los derechos</span>

        <div>
          <a href="#">Preguntas frecuentes</a>
          <i />
          <a href="#">Terminos y condiciones</a>
        </div>
      </div>
    </footer>
  );
}
