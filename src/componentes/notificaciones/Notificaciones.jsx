import "./notificaciones.css";
import "../../styles/variables.css";
import "../../styles/global.css";
import PanelDesplegable from "../panelDesplegable/PanelDesplegable";

const notificaciones = [
  {
    usuario: "@sigma",
    accion: "respondió tu test",
    detalle: "Te sientes muy on¡ chan?",
    hora: "hace 12min",
    avatar: "✿",
    leida: false,
  },
  {
    usuario: "@uwu",
    accion: "te propone un inter",
    detalle: "Mira su Propuesta y decide si te interesa",
    hora: "hace 1 h",
    avatar: "◉",
    leida: true,
  },
];

export default function Notificaciones() {
  return (
    <PanelDesplegable titulo="Notificaciones" icono="notifications" className="Notificaciones">
      <section className="Notificaciones__lista" aria-label="Notificaciones recientes">
        <h3 className="Notificaciones__fecha">Hoy</h3>
        {notificaciones.map((notificacion) => (
          <article className={`Notificaciones__tarjeta ${notificacion.leida ? "Notificaciones__tarjeta--leido" : "Notificaciones__tarjeta--no-leido"}`} key={notificacion.usuario}>
            <span className="Notificaciones__avatar" aria-hidden="true">{notificacion.avatar}</span>
            <div className="Notificaciones__texto">
              <p><strong>{notificacion.usuario}</strong> {notificacion.accion}</p>
              <p className="Notificaciones__detalle">{notificacion.detalle}</p>
            </div>
            <time className="Notificaciones__hora">{notificacion.hora}</time>
          </article>
        ))}
      </section>
    </PanelDesplegable>
  );
}
