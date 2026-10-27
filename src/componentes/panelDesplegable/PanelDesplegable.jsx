import "./PanelDesplegable.css";
import "../../styles/variables.css";
import "../../styles/global.css";

export default function PanelDesplegable({ titulo, icono, children, className = "" }) {
  return (
    <aside className={`PanelDesplegable ${className}`} aria-label={titulo}>
      <header className="PanelDesplegable__encabezado">
        {icono && <span className="PanelDesplegable__icono material-symbols-outlined" aria-hidden="true">{icono}</span>}
        <h2 className="PanelDesplegable__titulo">{titulo}</h2>
        <button className="PanelDesplegable__cerrar" type="button" aria-label={`Cerrar ${titulo}`}>
          <span class="material-symbols-outlined">
            close
            </span>
        </button>
      </header>
      <div className="PanelDesplegable__contenido">{children}</div>
    </aside>
  );
}
