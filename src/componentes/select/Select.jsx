
import "./select.css";
import "../../styles/variables.css";

export default function Select({
  opciones = [],
  seleccionada,
  className = "",
  onChange,
}) {
  return (
    <div
      className={`Select ${className}`.trim()}
      role="group"
    >
      {opciones.map((opcion) => {
        const activa =
          seleccionada === opcion.valor ||
          (seleccionada === undefined && opcion.activa);

        return (
          <button
            className={`Select__opcion${activa ? " Select__opcion--activa" : ""}`}
            type="button"
            key={opcion.valor}
            aria-pressed={Boolean(activa)}
            onClick={() => onChange?.(opcion.valor)}
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
        );
      })}
    </div>
  );
}
