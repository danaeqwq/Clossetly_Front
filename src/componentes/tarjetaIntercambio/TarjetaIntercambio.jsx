
import "./tarjetaIntercambio.css";

export default function TarjetaIntercambio({ producto }) {
  return (
    <article className="TarjetaIntercambio">
      <img
        className="TarjetaIntercambio__imagen"
        src={producto.imagen}
        alt={producto.alt}
      />

      <span className="TarjetaIntercambio__tipo">
        <span className="material-symbols-outlined" aria-hidden="true">
          autorenew
        </span>
        INTERCAMBIO
      </span>

      <span
        className="TarjetaIntercambio__favorito material-symbols-outlined"
        aria-label="Favorito"
      >
        favorite_border
      </span>

      <div className="TarjetaIntercambio__pie">
        <div className="TarjetaIntercambio__datos">
          <span className="TarjetaIntercambio__nombre">
            {producto.nombre}
          </span>

          <span className="TarjetaIntercambio__talle">
            Talle: {producto.talle}
          </span>
        </div>

        <span
          className="TarjetaIntercambio__accion material-symbols-outlined"
          aria-hidden="true"
        >
          autorenew
        </span>
      </div>
    </article>
  );
}
