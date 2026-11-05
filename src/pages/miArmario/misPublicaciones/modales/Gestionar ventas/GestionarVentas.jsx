import Modal from "../../../../../componentes/modal/Modal";
import "./gestionarVentas.css";
import iconwsp from "../../../../../assets/logo wsp mi armario.svg";
const ventas = [
  { usuario: "@uwu", estado: "CONFIRMADO", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&h=96&q=80" },
  { usuario: "@lol", estado: "EN CONTACTO", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&h=96&q=80" },
];

export default function GestionarVentas() {
  return (
    <Modal
      className="Modal--gestionarVentas"
      titulo="Gestionar Ventas"
      descripcion="Acá podés gestionar tus ventas y solicitudes de venta."
      confirmar={{ texto: "Guardar" }}
      cancelar={{ texto: "Salir sin guardar", icono: "logout" }}
    >
      <div className="GestionarVentas" aria-label="Solicitudes de venta">
        {ventas.map(({ usuario, estado, avatar }) => (
          <article className="GestionarVentas__fila" key={usuario}>
            <span className="GestionarVentas__avatar" aria-hidden="true">
              <img src={avatar} alt="" />
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
              <img src={iconwsp} alt="" aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>
    </Modal>
  );
}
