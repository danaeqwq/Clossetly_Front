
import "./tarjetaVenta.css";

export default function TarjetaVenta({
  producto,
  color,
  colorTexto,
  colorAccion,
  onClick,
}) {
  return (
    <article
      className="TarjetaVenta TarjetaVenta--clickeable"
      style={{
        "--tarjeta-color": color,
        "--tarjeta-texto": colorTexto,
        "--tarjeta-accion-color": colorAccion || color,
      }}
      onClick={onClick}
    >
      <img
        className="TarjetaVenta__imagen"
        src={producto.imagen}
        alt={producto.alt}
      />

      <span className="TarjetaVenta__tipo">
        <span className="material-symbols-outlined">sell</span>
        COMPRA
      </span>

      <span className="TarjetaVenta__favorito material-symbols-outlined">
        favorite_border
      </span>

      <div className="TarjetaVenta__pie">
        <div className="TarjetaVenta__datos">
          <span className="TarjetaVenta__nombre">{producto.nombre}</span>

          <span className="TarjetaVenta__precio">
            ${producto.precio.toLocaleString("es-AR")}
          </span>
        </div>

        <span className="TarjetaVenta__accion material-symbols-outlined">
          shopping_cart
        </span>
      </div>
    </article>
  );
}
