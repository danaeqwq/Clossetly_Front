import "./select.css";
import "../../styles/variables.css";

export default function Select({
  opciones = [],
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
          className="Select__opcion"
          type="button"
          key={opcion.valor}
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
