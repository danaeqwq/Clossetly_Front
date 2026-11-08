import "./tarjetaIntercambio.css";

export default function TarjetaIntercambio({
  producto,
  color,
  colorTexto,
  colorAccion,
  onClick,
}) {
  return (
    <article
      className="TarjetaIntercambio TarjetaIntercambio--clickeable"
      style={{
        "--tarjeta-color": color,
        "--tarjeta-texto": colorTexto,
        "--tarjeta-accion-color": colorAccion || color,
      }}
      onClick={onClick}
    >
      <img
        className="TarjetaIntercambio__imagen"
        src={producto.imagen}
        alt={producto.alt}
      />

      <span className="TarjetaIntercambio__tipo">
        <span className="material-symbols-outlined">autorenew</span>
        INTERCAMBIO
      </span>

      <span className="TarjetaIntercambio__favorito material-symbols-outlined">
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

        <span className="TarjetaIntercambio__accion material-symbols-outlined">
          autorenew
        </span>
      </div>
    </article>
  );
}