
import "./tarjetaOutfit.css";
import { useNavigate } from "react-router";

export default function TarjetaOutfit({ outfit = {} }) {
  const navigate = useNavigate();
  const imagenes = (outfit.fotos?.length ? outfit.fotos : outfit.prendas?.map((prenda) => prenda.imagen).filter(Boolean) || []).slice(0, 3);
  return (
    <article
      className="TarjetaOutfit TarjetaOutfit--clickeable"
      role="link"
      tabIndex={0}
      aria-label="Ver detalle del outfit"
      onClick={() => navigate("/detalles/outfit")}
      onKeyDown={(evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
          evento.preventDefault();
          navigate("/detalles/outfit");
        }
      }}
    >
      {/* Collage de imágenes */}
      <div className="TarjetaOutfit__fotos">
        {imagenes.map((imagen, indice) => <img key={`${outfit.id}-${indice}`} src={imagen} alt={`${outfit.nombre || "Outfit"} ${indice + 1}`} />)}

        {/* Cuadrado translúcido con información */}
        <div className="TarjetaOutfit__overlay">
          <b>{outfit.nombre || "Outfit"}</b>
          {outfit.descripcion && <span>{outfit.descripcion}</span>}
          <small>{outfit.prendas?.length || 0} prendas</small>
        </div>
      </div>

      {/* Etiqueta OUTFIT */}
      <span className="TarjetaOutfit__tipo">
        <span className="material-symbols-outlined">
          checkroom
        </span>
        OUTFIT
      </span>

      {/* Favorito */}
      <span className="TarjetaOutfit__favorito material-symbols-outlined">
        favorite
      </span>

    </article>
  );
}
