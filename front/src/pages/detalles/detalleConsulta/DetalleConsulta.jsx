import "./DetalleConsulta.css";
import "../../../styles/variables.css";
import "../../../styles/global.css";
import Boton from "../../../componentes/Boton/Boton";
import LineaM from "../../../componentes/LineaM/LineaM";
import TarjetaConsejo from "../../../componentes/tarjetaConsejo/TarjetaConsejo";
import Comentario from "../../../componentes/comentario/Comentario";
import PonerComentario from "./modal/PonerComentario";
import Outfit from "../../../assets/Ropa__ejemplo.jpg";
import Avatar from "../../../assets/userfoto.jpg";

export default function DetalleConsulta() {
  const comentario = "Yo creo que con este outfit te quedarían muy bien. Tiene un estilo único.";

  return (
    <main className="DetalleConsulta">
      <section className="DetalleConsulta__cuerpo" aria-label="Detalle de la consulta">
        <article className="DetalleConsulta__ficha">
          <div className="DetalleConsulta__imagenMarco">
            <img src={Outfit} alt="Suéter tejido claro y pantalón de jean" />
          </div>

          <div className="DetalleConsulta__informacion">
            <span className="DetalleConsulta__insignia">
              <span className="material-symbols-outlined" aria-hidden="true">forum</span>
              CONSEJO
            </span>
            <h1>¿Qué calzado va mejor en este look?</h1>
            <p className="DetalleConsulta__descripcion">
              Tengo estos jeans y este suéter, ¿qué calzado me recomiendan? ¿Botas, zapatillas o mocasines? ¿Alguna idea?
            </p>

            <div className="DetalleConsulta__publicacion">
              <span>Publicado por:</span>
              <img src={Avatar} alt="" />
              <span>@user67</span>
              <span className="DetalleConsulta__cantidad material-symbols-outlined" aria-hidden="true">chat_bubble_outline</span>
              <span className="DetalleConsulta__numero">67</span>
            </div>

            <div className="DetalleConsulta__responder">
              <Boton texto="Responder consulta" variante="principal" type="button" />
            </div>
          </div>
        </article>

        <aside className="DetalleConsulta__comentarios" aria-labelledby="DetalleConsulta__tituloComentarios">
          <header className="DetalleConsulta__encabezadoComentarios">
            <h2 id="DetalleConsulta__tituloComentarios">
              <span className="material-symbols-outlined" aria-hidden="true">forum</span>
              Comentarios
            </h2>
            <span>67 respuestas</span>
          </header>
          <div className="DetalleConsulta__listaComentarios">
            <Comentario usuario="@UWU" tiempo="Hace 67 min" texto={comentario} avatar={Avatar} imagen={Outfit} />
            <Comentario usuario="@TW1" tiempo="Hace 67 min" texto={comentario} avatar={Avatar} />
            <Comentario usuario="@UWU" tiempo="Hace 67 min" texto={comentario} avatar={Avatar} />
          </div>
          <span className="DetalleConsulta__masComentarios">Mostrar más comentarios...</span>
        </aside>
      </section>

      <section className="DetalleConsulta__consejos" aria-labelledby="DetalleConsulta__tituloConsejos">
        <div className="DetalleConsulta__linea" aria-hidden="true"><LineaM lado="izquierdo" /></div>
        <h2 id="DetalleConsulta__tituloConsejos">Otros consejos</h2>
        <div className="DetalleConsulta__tarjetas">
          <TarjetaConsejo />
          <TarjetaConsejo />
          <TarjetaConsejo />
          <TarjetaConsejo />
          <TarjetaConsejo />
        </div>
      </section>
      <PonerComentario />
    </main>
  );
}
