import { useState } from "react";
import Modal from "../../../../../componentes/modal/Modal";
import "./gestionarVentas.css";
import iconwsp from "../../../../../assets/logo wsp mi armario.svg";

export default function GestionarVentas({ solicitudes = [], onGuardar, onClose }) {
  const [solicitudesLocales, setSolicitudesLocales] = useState(solicitudes);

  const contactarWhatsapp = (telefono) => {
    const url = `https://wa.me/${telefono}`;
    window.open(url, "_blank");
  };

  const cambiarEstado = (id, estado) => {
    setSolicitudesLocales((actuales) => actuales.map((solicitud) => (
      solicitud.id === id ? { ...solicitud, estado } : solicitud
    )));
  };

  const guardar = () => {
    onGuardar?.(solicitudesLocales);
    onClose?.();
  };

  return (
    <Modal
      className="Modal--gestionarVentas"
      titulo="Gestionar Ventas"
      descripcion="Acá podés gestionar tus ventas y solicitudes de venta."
      confirmar={{ texto: "Guardar", onClick: guardar }}
      cancelar={{ texto: "Salir sin guardar", icono: "logout", onClick: onClose }}
      onClose={onClose}
    >
      <div className="GestionarVentas" aria-label="Solicitudes de venta">
        {solicitudesLocales.map(({ id, usuario, estado, avatar, telefono }) => (
          <article className="GestionarVentas__fila" key={id}>
            <span className="GestionarVentas__avatar" aria-hidden="true">
              <img src={avatar} alt="" />
            </span>
            <span className="GestionarVentas__usuario">{usuario}</span>
            <label className="GestionarVentas__estado">
              <span>Estado de pedido:</span>
              <select aria-label={`Estado de pedido de ${usuario}`} value={estado} onChange={(evento) => cambiarEstado(id, evento.target.value)}>
                <option>CONFIRMADO</option>
                <option>EN CONTACTO</option>
              </select>
            </label>
            <button className="GestionarVentas__contacto" type="button" aria-label={`Contactar a ${usuario}`} onClick={() => contactarWhatsapp(telefono)}>
              <img src={iconwsp} alt="" aria-hidden="true"/>
            </button>
          </article>
        ))}
      </div>
    </Modal>
  );
}
