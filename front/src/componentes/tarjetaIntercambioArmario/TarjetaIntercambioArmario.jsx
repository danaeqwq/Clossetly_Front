import "./tarjetaIntercambioArmario.css";

const imagenPorDefecto = "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=700&q=85";

export default function TarjetaIntercambioArmario({
  nombre = "Vestido art",
  imagen = imagenPorDefecto,
  talle = "M",
  propuestas = 0,
  onVerPropuestas,
  onModificar,
  onEliminar,
}) {
  return (
    <article className="TarjetaIntercambioArmario">
      <img className="TarjetaIntercambioArmario__imagen" src={imagen} alt={nombre} />
      <div className="TarjetaIntercambioArmario__datos">
        <span className="TarjetaIntercambioArmario__nombre">{nombre}</span>
        <span className="TarjetaIntercambioArmario__talle">Talle: {talle}</span>
      </div>
      <div className="TarjetaIntercambioArmario__metricas">
        <span>Propuestas: <b>{propuestas}</b></span>
        <button className="TarjetaIntercambioArmario__enlace" type="button" onClick={onVerPropuestas}>Ver propuestas</button>
      </div>
      <div className="TarjetaIntercambioArmario__acciones">
        <button type="button" onClick={onModificar}><i className="material-symbols-outlined" aria-hidden="true">edit</i>Modificar</button>
        <button className="TarjetaIntercambioArmario__eliminar" type="button" onClick={onEliminar}><i className="material-symbols-outlined" aria-hidden="true">delete_outline</i>Eliminar</button>
      </div>
    </article>
  );
}
