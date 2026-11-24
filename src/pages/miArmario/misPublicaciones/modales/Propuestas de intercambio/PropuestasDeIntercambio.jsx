
import { useState } from "react";
import axios from "axios";
import Modal from "../../../../../componentes/modal/Modal";
import "./propuestasDeIntercambio.css";

export default function PropuestasDeIntercambio({ propuestas = [], onGuardar, onVerDetalle, onClose }) {
  const [propuestasActuales, setPropuestasActuales] = useState(propuestas);
  const [cargando, setCargando] = useState(null);
  const [error, setError] = useState("");

  const resolverPropuesta = async (id, decision) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Tu sesión venció. Iniciá sesión nuevamente.");
      return;
    }

    setCargando(id);
    setError("");

    try {
      await axios.patch(
        `http://localhost:3000/api/propuestas/${id}/estado`,
        {
          decision,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const estado = decision === "aceptar" ? "Confirmado" : "Rechazado";

      const actualizadas = propuestasActuales.map((propuesta) =>
        propuesta.id === id
          ? { ...propuesta, estado }
          : propuesta
      );

      setPropuestasActuales(actualizadas);
      onGuardar?.(actualizadas);

    } catch (error) {
      console.error(
        "Error al resolver la propuesta:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.mensaje ||
        "No se pudo actualizar la propuesta. Intentá nuevamente."
      );
    } finally {
      setCargando(null);
    }
  };

  const propuestasPendientes = propuestasActuales.filter(
    (propuesta) => propuesta.estado?.toLowerCase() === "pendiente"
  );

  return (
    <Modal
      titulo="Propuestas De Intercambio"
      descripcion="Acá aparecen las propuestas de intercambio que recibiste."
      cancelar={{
        texto: "Cerrar",
        icono: "logout",
        onClick: onClose,
      }}
      onClose={onClose}
    >
      <div className="PropuestasIntercambio" aria-label="Propuestas recibidas">

        {error && (
          <p className="PropuestasIntercambio__error">
            {error}
          </p>
        )}

        {propuestasPendientes.length === 0 ? (
          <p className="PropuestasIntercambio__vacio">
            No tenés propuestas pendientes para esta publicación.
          </p>
        ) : (
          propuestasPendientes.map((propuesta) => (
            <article
              className="PropuestasIntercambio__tarjeta"
              key={propuesta.id}
            >
              <img
                className="PropuestasIntercambio__imagen"
                src={propuesta.imagen}
                alt={`Prenda propuesta por ${propuesta.usuario}`}
              />

              <button
                className="PropuestasIntercambio__detalle"
                type="button"
                onClick={() => onVerDetalle?.(propuesta.producto)}
              >
                Ver detalle
              </button>

              <div
                className="PropuestasIntercambio__decisiones"
                aria-label={`Decisión sobre la propuesta de ${propuesta.usuario}`}
              >
                <button
                  className="PropuestasIntercambio__aceptar"
                  type="button"
                  aria-label={`Aceptar propuesta de ${propuesta.usuario}`}
                  disabled={cargando !== null}
                  onClick={() => resolverPropuesta(propuesta.id, "aceptar")}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    check
                  </span>
                </button>

                <button
                  className="PropuestasIntercambio__rechazar"
                  type="button"
                  aria-label={`Rechazar propuesta de ${propuesta.usuario}`}
                  disabled={cargando !== null}
                  onClick={() => resolverPropuesta(propuesta.id, "rechazar")}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    close
                  </span>
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </Modal>
  );
}
