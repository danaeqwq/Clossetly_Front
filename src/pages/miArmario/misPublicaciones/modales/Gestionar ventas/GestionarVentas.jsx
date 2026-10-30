import Modal from "../../../../../componentes/modal/Modal";
import "./gestionarVentas.css";

const ventas = [
  { usuario: "@uwu", estado: "CONFIRMADO", avatar: "GV__avatar--rosa" },
  { usuario: "@lol", estado: "EN CONTACTO", avatar: "GV__avatar--oscuro" },
];

export default function GestionarVentas() {
  return (
    <Modal
      titulo="Gestionar Ventas"
      descripcion="Acá podés gestionar tus ventas y solicitudes de venta."
      confirmar={{ texto: "Guardar" }}
      cancelar={{ texto: "Salir sin guardar", icono: "logout" }}
    >
      <div className="GestionarVentas" aria-label="Solicitudes de venta">
        {ventas.map(({ usuario, estado, avatar }) => (
          <article className="GestionarVentas__fila" key={usuario}>
            <span className={`GestionarVentas__avatar ${avatar}`} aria-hidden="true">
              <span className="material-symbols-outlined">person</span>
            </span>
            <span className="GestionarVentas__usuario">{usuario}</span>
            <label className="GestionarVentas__estado">
              <span>Estado de pedido:</span>
              <select aria-label={`Estado de pedido de ${usuario}`} defaultValue={estado}>
                <option>CONFIRMADO</option>
                <option>EN CONTACTO</option>
              </select>
            </label>
            <button className="GestionarVentas__contacto" type="button" aria-label={`Contactar a ${usuario}`}>
              <span className="material-symbols-outlined" aria-hidden="true">call</span>
            </button>
          </article>
        ))}
      </div>
    </Modal>
  );
}
