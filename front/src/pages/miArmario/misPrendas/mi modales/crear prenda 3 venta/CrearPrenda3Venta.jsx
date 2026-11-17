import Modal from "../../../../../componentes/modal/Modal";
import "./crearPrenda3Venta.css";

export default function CrearPrenda3Venta({ datos, mensajeError, onCambiar, onGuardar, onVolver, onClose }) {
  return (
    <Modal
      titulo="Prenda Para Vender"
      descripcion="Completa la información para agregar una prenda a tu armario"
      confirmar={{ texto: <><span className="Venta__volver" role="button" tabIndex={0} aria-label="Volver al paso anterior" onClick={(evento) => { evento.stopPropagation(); onVolver(); }} onKeyDown={(evento) => { if (evento.key === "Enter" || evento.key === " ") { evento.preventDefault(); evento.stopPropagation(); onVolver(); } }}><span className="material-symbols-outlined" aria-hidden="true">chevron_left</span></span>Guardar</>, onClick: onGuardar }}
      cancelar={{ texto: "Salir sin guardar", icono: "logout", onClick: onClose }}
      onClose={onClose}
    >
      <form className="Venta" aria-label="Datos de la prenda para vender">
        <div className="Venta__campos">
          <label className="Venta__campo">
            <span className="Venta__etiqueta">Precio</span>
            <span className="Venta__entrada Venta__entrada--precio">
              <span aria-hidden="true">$</span>
              <input aria-label="Precio" inputMode="decimal" value={datos.precio} onChange={(evento) => onCambiar("precio", evento.target.value)} placeholder="Ej: 10.000" />
            </span>
          </label>
          <label className="Venta__campo">
            <span className="Venta__etiqueta">Stock</span>
            <span className="Venta__entrada Venta__entrada--stock">
              <span aria-hidden="true">Unidades</span>
              <input aria-label="Unidades en stock" inputMode="numeric" value={datos.stock} onChange={(evento) => onCambiar("stock", evento.target.value)} placeholder="Ej: 100" />
            </span>
          </label>
        </div>
        {mensajeError && <p className="Venta__error" role="alert">{mensajeError}</p>}
      </form>
    </Modal>
  );
}
