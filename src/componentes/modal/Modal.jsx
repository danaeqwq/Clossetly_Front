import "./modal.css";
import { useEffect } from "react";

export default function Modal({ titulo, descripcion, children }) {
  useEffect(() => {
    const desplazamientoAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = desplazamientoAnterior;
    };
  }, []);

  return (
    <div className="Modal" role="presentation">
      <section
        className="Modal__ventana"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
      >
        <header className="Modal__encabezado">
          <div className="Modal__encabezadoTexto">
            <h2 className="Modal__titulo" id="modal-titulo">{titulo}</h2>
            {descripcion && <p className="Modal__descripcion">{descripcion}</p>}
          </div>
          <button className="Modal__cerrar" type="button" aria-label="Cerrar">
            <span className="material-symbols-outlined" aria-hidden="true">close</span>
          </button>
        </header>
        <div className="Modal__contenido">{children}</div>
      </section>
    </div>
  );
}
