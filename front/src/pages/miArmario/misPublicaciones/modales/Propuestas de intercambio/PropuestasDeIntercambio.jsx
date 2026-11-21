import { useState } from "react";
import Modal from "../../../../../componentes/modal/Modal";
import "./propuestasDeIntercambio.css";

export default function PropuestasDeIntercambio({ propuestas = [], onGuardar, onVerDetalle, onClose }) {
  const [propuestasTemporales, setPropuestasTemporales] = useState(() => (
    propuestas.filter((propuesta) => propuesta.estado === "PENDIENTE")
  ));

  const resolverTemporalmente = (id, estado) => {
    setPropuestasTemporales((actuales) => actuales.map((propuesta) => (
      propuesta.id === id ? { ...propuesta, estado } : propuesta
    )));
  };

  const guardar = () => {
    onGuardar?.(propuestasTemporales.filter((propuesta) => propuesta.estado === "PENDIENTE"));
    onClose?.();
  };

  return (
    <Modal
      titulo="Propuestas De Intercambio"
      descripcion="Acá aparecen las propuestas de intercambio que recibiste."
      confirmar={{ texto: "Guardar", onClick: guardar }}
      cancelar={{ texto: "Salir sin guardar", icono: "logout", onClick: onClose }}
      onClose={onClose}
    >
      <div className="PropuestasIntercambio" aria-label="Propuestas recibidas">
        {propuestasTemporales.filter((propuesta) => propuesta.estado === "PENDIENTE").map((propuesta) => (
          <article className="PropuestasIntercambio__tarjeta" key={propuesta.id}>
            <img
              className="PropuestasIntercambio__imagen"
              src={propuesta.imagen}
              alt={`Prenda propuesta por ${propuesta.usuario}`}
            />
            <button className="PropuestasIntercambio__detalle" type="button" onClick={() => onVerDetalle?.(propuesta.producto)}>
              Ver detalle
            </button>
            <div className="PropuestasIntercambio__decisiones" aria-label={`Decisión sobre la propuesta de ${propuesta.usuario}`}>
              <button className="PropuestasIntercambio__aceptar" type="button" aria-label={`Aceptar propuesta de ${propuesta.usuario}`} onClick={() => resolverTemporalmente(propuesta.id, "ACEPTADA")}>
                <span className="material-symbols-outlined" aria-hidden="true">check</span>
              </button>
              <button className="PropuestasIntercambio__rechazar" type="button" aria-label={`Rechazar propuesta de ${propuesta.usuario}`} onClick={() => resolverTemporalmente(propuesta.id, "RECHAZADA")}>
                <span className="material-symbols-outlined" aria-hidden="true">close</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </Modal>
  );
}
