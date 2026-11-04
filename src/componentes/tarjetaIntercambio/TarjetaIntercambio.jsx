import "./tarjetaIntercambio.css";

export default function TarjetaIntercambio() {
  return (
    <article className="TarjetaIntercambio">
      <img
        className="TarjetaIntercambio__imagen"
        src="https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=700&q=85"
        alt="Vestido color terracota con estampado floral"
      />

      <span className="TarjetaIntercambio__tipo">
        <span className="material-symbols-outlined" aria-hidden="true">autorenew</span>
        INTERCAMBIO
      </span>
      <span className="TarjetaIntercambio__favorito material-symbols-outlined" aria-label="Favorito">
        favorite_border
      </span>

      <div className="TarjetaIntercambio__pie">
        <div className="TarjetaIntercambio__datos">
          <span className="TarjetaIntercambio__nombre">Vestido art</span>
          <span className="TarjetaIntercambio__talle">Talle: M</span>
        </div>
        <span className="TarjetaIntercambio__accion material-symbols-outlined" aria-hidden="true">
          autorenew
        </span>
      </div>
    </article>
  );
}
