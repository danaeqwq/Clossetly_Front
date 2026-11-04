import Modal from "../../../../../componentes/modal/Modal";
import "./crearPrenda3Venta.css";

export default function CrearPrenda3Venta() {
  return (
    <Modal
      titulo="Prenda Para Vender"
      descripcion="Completa la información para agregar una prenda a tu armario"
      confirmar={{ texto: "Guardar" }}
      cancelar={{ texto: "Salir sin guardar", icono: "logout" }}
    >
      <form className="Venta" aria-label="Datos de la prenda para vender">
        <div className="Venta__campos">
          <label className="Venta__campo">
            <span className="Venta__etiqueta">Precio</span>
            <span className="Venta__entrada Venta__entrada--precio">
              <span aria-hidden="true">$</span>
              <input aria-label="Precio" inputMode="decimal" placeholder="Ej: 10.000" />
            </span>
          </label>
          <label className="Venta__campo">
            <span className="Venta__etiqueta">Stock</span>
            <span className="Venta__entrada Venta__entrada--stock">
              <span aria-hidden="true">Unidades</span>
              <input aria-label="Unidades en stock" inputMode="numeric" placeholder="Ej: 100" />
            </span>
          </label>
        </div>

      </form>
    </Modal>
  );
}
