import "./tarjetaVentaArmario.css";

const imagenPorDefecto = "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=85";

export default function TarjetaVentaArmario({
  nombre = "Remera rayas",
  imagen = imagenPorDefecto,
  stock = 2,
  ventas = 0,
  solicitudesPendientes = 0,
  onGestionarVentas,
  onModificar,
  onEliminar,
}) {
  return (
    <article className="TarjetaVentaArmario">
      <img className="TarjetaVentaArmario__imagen" src={imagen} alt={nombre} />
      <div className="TarjetaVentaArmario__datos">
        <span className="TarjetaVentaArmario__nombre">{nombre}</span>
        <span className="TarjetaVentaArmario__stock">Stock: {stock}</span>
      </div>
      <div className="TarjetaVentaArmario__metricas">
        <span>Ventas: <b>{ventas}</b></span>
        <button className="TarjetaVentaArmario__enlace" type="button" onClick={onGestionarVentas}>Gestionar ventas</button>
        <span>Solicitudes pendientes: <b>{solicitudesPendientes}</b></span>
      </div>
      <div className="TarjetaVentaArmario__acciones">
        <button type="button" onClick={onModificar}><i className="material-symbols-outlined" aria-hidden="true">edit</i>Modificar</button>
        <button className="TarjetaVentaArmario__eliminar" type="button" onClick={onEliminar}><i className="material-symbols-outlined" aria-hidden="true">delete_outline</i>Eliminar</button>
      </div>
    </article>
  );
}
