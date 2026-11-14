import "./modal.css";
export default function Modal({
  titulo,
  descripcion,
  children,
  confirmar,
  cancelar,
  className = "",
  onClose,
}) {

  return (
    <div className={`Modal ${className}`.trim()} role="presentation">
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
            <span className="material-symbols-outlined" aria-hidden="true" onClick={onClose}>close</span>
          </button>
        </header>
        <div className="Modal__contenido">{children}</div>
        {(confirmar || cancelar) && (
          <footer className="Modal__acciones">
            {confirmar && (
              <button
                className="Modal__accion Modal__accion--confirmar"
                type={confirmar.type || "button"}
                onClick={confirmar.onClick}
              >
                {confirmar.texto}
              </button>
            )}
            {cancelar && (
              <button
                className="Modal__accion Modal__accion--cancelar"
                type={cancelar.type || "button"}
                onClick={cancelar.onClick}
              >
                {cancelar.texto}
                {cancelar.icono && <span className="material-symbols-outlined" aria-hidden="true">{cancelar.icono}</span>}
              </button>
            )}
          </footer>
        )}
      </section>
    </div>
  );
}
