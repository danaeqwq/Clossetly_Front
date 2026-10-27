import "./select.css";
import "../../styles/variables.css";

export default function Select({
  opciones = [],
  seleccionada,
  ariaLabel = "Categorías",
  className = "",
}) {
  return (
    <div
      className={`Select ${className}`.trim()}
      role="group"
      aria-label={ariaLabel}
    >
      {opciones.map((opcion) => (
        <button
          className={`Select__opcion${(seleccionada === opcion.valor || (seleccionada === undefined && opcion.activa)) ? " Select__opcion--activa" : ""}`}
          type="button"
          key={opcion.valor}
          aria-pressed={seleccionada === opcion.valor || (seleccionada === undefined && Boolean(opcion.activa))}
        >
          {opcion.icono && (
            <span
              className="material-symbols-outlined"
              aria-hidden="true"
            >
              {opcion.icono}
            </span>
          )}

          {opcion.texto}
        </button>
      ))}

    </div>
  );
}
