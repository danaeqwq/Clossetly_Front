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
        src={prenda.imagen}
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
              <li>edit Modificar</li>
              <li>checkroom Armar outfit</li>
              <li>delete_outline Eliminar</li>
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