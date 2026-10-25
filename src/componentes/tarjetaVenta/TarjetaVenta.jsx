import "./tarjetaVenta.css";

export default function TarjetaVenta() {
  return (
    <article className="TarjetaVenta">
      <img
        className="TarjetaVenta__imagen"
        src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=85"
        alt="Remera a rayas rosa y blanca"
      />

      <span className="TarjetaVenta__tipo">
        <span className="material-symbols-outlined" aria-hidden="true">sell</span>
        VENTA
      </span>
      <span className="TarjetaVenta__favorito material-symbols-outlined" aria-label="Favorito">
        favorite_border
      </span>

      <div className="TarjetaVenta__pie">
        <div className="TarjetaVenta__datos">
          <span className="TarjetaVenta__nombre">Remera rayas</span>
          <span className="TarjetaVenta__precio">$10.000</span>
        </div>
        <span className="TarjetaVenta__accion material-symbols-outlined" aria-hidden="true">
          shopping_cart
        </span>
      </div>
    </article>
  );
}
