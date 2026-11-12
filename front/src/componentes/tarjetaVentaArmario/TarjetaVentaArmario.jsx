import "./tarjetaVentaArmario.css";

const imagenPorDefecto = "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=85";

export default function TarjetaVentaArmario({ nombre = "Remera rayas", imagen = imagenPorDefecto }) {
  return (
    <article className="TarjetaVentaArmario">
      <img className="TarjetaVentaArmario__imagen" src={imagen} alt={nombre} />
      <div className="TarjetaVentaArmario__datos">
        <span className="TarjetaVentaArmario__nombre">{nombre}</span>
        <span className="TarjetaVentaArmario__stock">Stock: 2</span>
      </div>
      <div className="TarjetaVentaArmario__metricas">
        <span>Ventas: <b>10</b></span>
        <span className="TarjetaVentaArmario__enlace">Gestionar ventas</span>
        <span>Solicitudes pendientes: <b>5</b></span>
      </div>
      <div className="TarjetaVentaArmario__acciones">
        <span><i className="material-symbols-outlined" aria-hidden="true">edit</i>Modificar</span>
        <span className="TarjetaVentaArmario__eliminar"><i className="material-symbols-outlined" aria-hidden="true">delete_outline</i>Eliminar</span>
      </div>
    </article>
  );
}
