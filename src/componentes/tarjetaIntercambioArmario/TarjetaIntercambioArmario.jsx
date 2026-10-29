import "./tarjetaIntercambioArmario.css";

const imagenPorDefecto = "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=700&q=85";

export default function TarjetaIntercambioArmario({ nombre = "Vestido art", imagen = imagenPorDefecto }) {
  return (
    <article className="TarjetaIntercambioArmario">
      <img className="TarjetaIntercambioArmario__imagen" src={imagen} alt={nombre} />
      <div className="TarjetaIntercambioArmario__datos">
        <span className="TarjetaIntercambioArmario__nombre">{nombre}</span>
        <span className="TarjetaIntercambioArmario__talle">Talle: M</span>
      </div>
      <div className="TarjetaIntercambioArmario__metricas">
        <span>Propuestas: <b>1</b></span>
        <span className="TarjetaIntercambioArmario__enlace">Ver propuestas</span>
      </div>
      <div className="TarjetaIntercambioArmario__acciones">
        <span><i className="material-symbols-outlined" aria-hidden="true">edit</i>Modificar</span>
        <span className="TarjetaIntercambioArmario__eliminar"><i className="material-symbols-outlined" aria-hidden="true">delete_outline</i>Eliminar</span>
      </div>
    </article>
  );
}
