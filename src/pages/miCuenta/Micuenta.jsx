import "./Micuenta.css";
import "../../styles/global.css";
import "../../styles/variables.css";
import LineaM from "../../componentes/LineaM/LineaM";
import Boton from "../../componentes/Boton/Boton";
import Avatar from "../../assets/userfoto.jpg";

export default function Micuenta() {
  return (
    <main className="Micuenta">
      <section className="Micuenta__tarjeta" aria-label="Información de mi cuenta">
        <header className="Micuenta__perfil">
          <img className="Micuenta__avatar" src={Avatar} alt="Foto de perfil de Dany" />
          <div className="Micuenta__identidad">
            <h1>Dany</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="Micuenta__estadisticas" aria-label="Actividad de la cuenta">
              <span><strong>10</strong> Publicaciones</span>
              <span><strong>5</strong> Ventas</span>
              <span><strong>8</strong> Intercambios</span>
            </div>
          </div>
          <div className="Micuenta__accionesPerfil">
            <Boton texto="Editar perfil" variante="principal" type="button" />
            <Boton texto="Editar mis estilos" variante="principal" type="button" />
          </div>
        </header>

        <div className="Micuenta__preferencias">
          <div className="Micuenta__columna">
            <section className="Micuenta__grupo">
              <h2><span className="material-symbols-outlined" aria-hidden="true">favorite_border</span>Mis prendas favoritas:</h2>
              <div className="Micuenta__etiquetas">
                <span>REMERAS</span><span>ZAPATILLAS</span><span>JEANS</span><span>BUZOS</span><span>BUZOS</span>
              </div>
            </section>
            <section className="Micuenta__grupo Micuenta__grupo--colores">
              <h2><span className="material-symbols-outlined" aria-hidden="true">palette</span>Mis colores:</h2>
              <div className="Micuenta__paleta" aria-label="Colores favoritos">
                <span className="Micuenta__color Micuenta__color--vino" aria-label="Bordó" />
                <span className="Micuenta__color Micuenta__color--malva" aria-label="Malva" />
                <span className="Micuenta__color Micuenta__color--azul" aria-label="Azul" />
                <span className="Micuenta__color Micuenta__color--rosa" aria-label="Rosa" />
                <span className="Micuenta__color Micuenta__color--coral" aria-label="Coral" />
              </div>
            </section>
            <section className="Micuenta__grupo">
              <h2><span className="material-symbols-outlined" aria-hidden="true">checkroom</span>Como me gusta la ropa:</h2>
              <div className="Micuenta__etiquetas">
                <span>COMODA</span><span>URBANO</span><span>OVERSIZED</span>
              </div>
            </section>
          </div>

          <div className="Micuenta__divisor" aria-hidden="true">
            <LineaM lado="izquierdo" />
          </div>

          <div className="Micuenta__columna">
            <section className="Micuenta__grupo">
              <h2><span className="material-symbols-outlined" aria-hidden="true">calendar_today</span>Mis temporadas:</h2>
              <div className="Micuenta__etiquetas">
                <span>OTOÑO</span><span>INVIERNO</span>
              </div>
            </section>
            <section className="Micuenta__grupo">
              <h2><span className="material-symbols-outlined" aria-hidden="true">auto_awesome</span>Lo que quiero transmitir:</h2>
              <div className="Micuenta__etiquetas">
                <span>SEGURIDAD</span><span>REBELDIA</span><span>CREATIVIDAD</span>
              </div>
            </section>
            <section className="Micuenta__grupo">
              <h2><span className="material-symbols-outlined" aria-hidden="true">styler</span>Mis estilos:</h2>
              <div className="Micuenta__etiquetas">
                <span>GRUNGE</span><span>STREETWEAR</span><span>SOFT GRUNGE</span>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
