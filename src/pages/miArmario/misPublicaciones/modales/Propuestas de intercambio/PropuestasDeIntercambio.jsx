import Modal from "../../../../../componentes/modal/Modal";
import "./propuestasDeIntercambio.css";

const imagenPropuesta = "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=700&q=85";
const propuestas = ["propuesta-1", "propuesta-2", "propuesta-3", "propuesta-4"];

export default function PropuestasDeIntercambio() {
  return (
    <Modal
      titulo="Propuestas De Intercambio"
      descripcion="Acá aparecen las propuestas de intercambio que recibiste."
      confirmar={{ texto: "Guardar" }}
      cancelar={{ texto: "Salir sin guardar", icono: "logout" }}
    >
      <div className="PropuestasIntercambio" aria-label="Propuestas recibidas">
        {propuestas.map((propuesta, indice) => (
          <article className="PropuestasIntercambio__tarjeta" key={propuesta}>
            <img
              className="PropuestasIntercambio__imagen"
              src={imagenPropuesta}
              alt={`Prenda de ejemplo ${indice + 1} propuesta para intercambiar`}
            />
            <button className="PropuestasIntercambio__detalle" type="button">
              Ver detalle
            </button>
            <div className="PropuestasIntercambio__decisiones" aria-label={`Decisión sobre la propuesta ${indice + 1}`}>
              <button className="PropuestasIntercambio__aceptar" type="button" aria-label={`Aceptar propuesta ${indice + 1}`}>
                <span className="material-symbols-outlined" aria-hidden="true">check</span>
              </button>
              <button className="PropuestasIntercambio__rechazar" type="button" aria-label={`Rechazar propuesta ${indice + 1}`}>
                <span className="material-symbols-outlined" aria-hidden="true">close</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </Modal>
  );
}
