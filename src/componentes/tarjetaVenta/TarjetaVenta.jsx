import "./tarjetaVenta.css";

export default function TarjetaVenta({ producto, color, colorTexto, colorAccion }) {
  return (
    <article
      className="TarjetaVenta"
      style={{
        "--tarjeta-color": color,
        "--tarjeta-texto": colorTexto,
        "--tarjeta-accion-color": colorAccion || color,
      }}
    >
      <img
        className="TarjetaVenta__imagen"
        src={producto.imagen}
        alt={producto.alt}
      />

      <span className="TarjetaVenta__tipo">
        <span className="material-symbols-outlined" aria-hidden="true">
          sell
        </span>
        COMPRA
      </span>

      <span
        className="TarjetaVenta__favorito material-symbols-outlined"
        aria-label="Favorito"
      >
        favorite_border
      </span>

      <div className="TarjetaVenta__pie">
        <div className="TarjetaVenta__datos">
          <span className="TarjetaVenta__nombre">
            {producto.nombre}
          </span>

          <span className="TarjetaVenta__precio">
            ${producto.precio.toLocaleString("es-AR")}
          </span>
        </div>

        <span
          className="TarjetaVenta__accion material-symbols-outlined"
          aria-hidden="true"
        >
          shopping_cart
        </span>
      </div>
    </article>
  );
}
