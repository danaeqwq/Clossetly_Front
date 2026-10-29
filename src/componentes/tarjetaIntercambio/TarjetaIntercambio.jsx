import "./tarjetaIntercambio.css";

export default function TarjetaIntercambio({ variante = "explorar", nombre = "Vestido art", imagen }) {
  if (variante === "armario") {
    return (
      <article className="TarjetaIntercambio TarjetaIntercambio--armario">
        <img
          className="TarjetaIntercambio__imagen"
          src={imagen || "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=700&q=85"}
          alt={nombre}
        />
        <div className="TarjetaIntercambio__datosArmario">
          <span className="TarjetaIntercambio__nombreArmario">{nombre}</span>
          <span>Talle: M</span>
        </div>
        <div className="TarjetaIntercambio__metricasArmario">
          <span>Propuestas: <b>1</b></span>
          <span className="TarjetaIntercambio__enlaceArmario">Ver propuestas</span>
        </div>
        <div className="TarjetaIntercambio__accionesArmario">
          <span><i className="material-symbols-outlined" aria-hidden="true">edit</i>Modificar</span>
          <span className="TarjetaIntercambio__eliminar"><i className="material-symbols-outlined" aria-hidden="true">delete_outline</i>Eliminar</span>
        </div>
      </article>
    );
  }

  return (
    <article className="TarjetaIntercambio">
      <img
        className="TarjetaIntercambio__imagen"
        src="https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=700&q=85"
        alt="Vestido color terracota con estampado floral"
      />

      <span className="TarjetaIntercambio__tipo">
        <span className="material-symbols-outlined" aria-hidden="true">swap_horiz</span>
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
          swap_horiz
        </span>
      </div>
    </article>
  );
}
