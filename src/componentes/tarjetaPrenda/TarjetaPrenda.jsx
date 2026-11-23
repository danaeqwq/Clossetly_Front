import "./tarjetaPrenda.css";
import { useNavigate } from "react-router";

export default function TarjetaPrenda({
  prenda,
  color,
  mostrarOpciones = false,
  seleccionada = false,
  menuAbierto = false,
  clickable = true,
}) {
  const navigate = useNavigate();

  return (
    <article
      className={`TarjetaPrenda
        ${mostrarOpciones ? "TarjetaPrenda--armario" : ""}
        ${seleccionada ? "TarjetaPrenda--seleccionada" : ""}
        ${clickable && !mostrarOpciones ? "TarjetaPrenda--clickeable" : ""}
      `}
      style={color ? { "--TarjetaPrenda-color": color } : undefined}
      onClick={
        clickable && !mostrarOpciones
          ? () => navigate("/detalles/prenda")
          : undefined
      }
    >
      <img
        className="TarjetaPrenda__imagen"
        src={
          prenda.imagen?.startsWith("data:") ||
          prenda.imagen?.startsWith("blob:") ||
          prenda.imagen?.startsWith("http")
            ? prenda.imagen
            : `http://localhost:3000${prenda.imagen}`
        }
        alt={prenda.alt}
      />

      {mostrarOpciones && (
        <>
          <button
            className="TarjetaPrenda__opciones"
            type="button"
            aria-label={`Opciones para ${prenda.nombre}`}
          >
            ⋯
          </button>

          {menuAbierto && (
            <ul className="TarjetaPrenda__menu">
              <li data-accion="modificar">
                <span className="material-symbols-outlined">edit</span>
                Modificar
              </li>

              <li data-accion="armar-outfit">
                <span className="material-symbols-outlined">checkroom</span>
                Armar outfit
              </li>

              <li data-accion="eliminar">
                <span className="material-symbols-outlined">
                  delete_outline
                </span>
                Eliminar
              </li>
            </ul>
          )}
        </>
      )}

      <span className="TarjetaPrenda__favorito material-symbols-outlined">
        favorite
      </span>

      <span className="TarjetaPrenda__etiqueta">{prenda.nombre}</span>
    </article>
  );
}