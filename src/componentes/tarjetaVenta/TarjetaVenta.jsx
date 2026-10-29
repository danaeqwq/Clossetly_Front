import "./tarjetaVenta.css";

export default function TarjetaVenta({ variante = "explorar", nombre = "Remera rayas", imagen }) {
  if (variante === "armario") {
    return (
      <article className="TarjetaVenta TarjetaVenta--armario">
        <img
          className="TarjetaVenta__imagen"
          src={imagen || "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=85"}
          alt={nombre}
        />
        <div className="TarjetaVenta__datosArmario">
          <span className="TarjetaVenta__nombreArmario">{nombre}</span>
          <span className="TarjetaVenta__stock">Stock: 2</span>
        </div>
        <div className="TarjetaVenta__metricasArmario">
          <span>Ventas: <b>10</b></span>
          <span className="TarjetaVenta__enlaceArmario">Gestionar ventas</span>
          <span>Solicitudes pendientes: <b>5</b></span>
        </div>
        <div className="TarjetaVenta__accionesArmario">
          <span><i className="material-symbols-outlined" aria-hidden="true">edit</i>Modificar</span>
          <span className="TarjetaVenta__eliminar"><i className="material-symbols-outlined" aria-hidden="true">delete_outline</i>Eliminar</span>
        </div>
      </article>
    );
  }

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
