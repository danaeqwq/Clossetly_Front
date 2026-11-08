
import "./tarjetaOutfit.css";
import { useNavigate } from "react-router";

export default function TarjetaOutfit() {
  const navigate = useNavigate();
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
        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=85" alt="Zapatillas negras" />
        <img src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=85" alt="Pantalón del outfit" />
        <img src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=85" alt="Prenda del outfit" />

        {/* Cuadrado translúcido con información */}
        <div className="TarjetaOutfit__overlay">
          <b>+2<br />PRENDAS</b>
          <span>CONTRASTE</span>
          <small>5 Prendas</small>
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
