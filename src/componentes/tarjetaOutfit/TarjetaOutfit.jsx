import "./tarjetaOutfit.css";
import { useNavigate } from "react-router";

export default function TarjetaOutfit({ outfit = {} }) {
  const navigate = useNavigate();

  const obtenerImagen = (imagen) => {
    if (!imagen) return "";

    if (
      imagen.startsWith("http") ||
      imagen.startsWith("data:") ||
      imagen.startsWith("blob:")
    ) {
      return imagen;
    }

    return `http://localhost:3000${imagen}`;
  };

  const imagenes = (
    outfit.fotos?.length
      ? outfit.fotos
      : outfit.prendas?.map((prenda) => prenda.imagen).filter(Boolean) || []
  ).slice(0, 3);

  const irAlDetalle = () => {
      navigate(`/detalles/outfit/${outfit.id}`);
  };

  return (
    <article
      className="TarjetaOutfit TarjetaOutfit--clickeable"
      role="link"
      tabIndex={0}
      aria-label="Ver detalle del outfit"
      onClick={irAlDetalle}
      onKeyDown={(evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
          evento.preventDefault();
          irAlDetalle();
        }
      }}
    >
      <div className="TarjetaOutfit__fotos">
        {imagenes.map((imagen, indice) => (
          <img
            key={`${outfit.id}-${indice}`}
            src={obtenerImagen(imagen)}
            alt={`${outfit.nombre || "Outfit"} ${indice + 1}`}
          />
        ))}

        <div className="TarjetaOutfit__overlay">
          <b>{outfit.nombre || "Outfit"}</b>

          {outfit.descripcion && (
            <span>{outfit.descripcion}</span>
          )}

          <small>{outfit.prendas?.length || 0} prendas</small>
        </div>
      </div>

      <span className="TarjetaOutfit__tipo">
        <span className="material-symbols-outlined">
          checkroom
        </span>
        OUTFIT
      </span>

      <span className="TarjetaOutfit__favorito material-symbols-outlined">
        favorite
      </span>
    </article>
  );
}