import Modal from "../../../../../componentes/modal/Modal";
import "./crearPrenda3Intercambio.css";

const tiposPrenda = ["Pantalones", "Accesorios", "Remeras", "Cortos", "Camperas", "Zapatos"];

export default function CrearPrenda3Intercambio() {
  return (
    <Modal
      className="Modal--intercambio"
      titulo="Prenda Para Intercambiar"
      descripcion="Completa la información para agregar una prenda a tu armario"
      confirmar={{ texto: <>Guardar <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span></> }}
      cancelar={{ texto: "Salir sin guardar", icono: "logout" }}
    >
      <form className="Intercambiar" aria-label="Datos de la prenda para intercambiar">
        <div className="Intercambiar__datos">
          <label className="Intercambiar__campo">
            <span className="Intercambiar__etiqueta">Precio</span>
            <span className="Intercambiar__entrada Intercambiar__entrada--precio">
              <span aria-hidden="true">$</span>
              <input aria-label="Precio" inputMode="decimal" placeholder="Ej: 10.000" />
            </span>
          </label>
          <label className="Intercambiar__campo">
            <span className="Intercambiar__etiqueta">Stock</span>
            <span className="Intercambiar__entrada Intercambiar__entrada--stock">
              <span aria-hidden="true">Unidades</span>
              <input aria-label="Cantidad" inputMode="numeric" placeholder="Ej: 100" />
            </span>
          </label>
        </div>

        <fieldset className="Intercambiar__tipos">
          <legend>Tipos de prendas que acepta</legend>
          <div className="Intercambiar__opciones">
            {tiposPrenda.map((tipo) => (
              <label className="Intercambiar__opcion" key={tipo}>
                <input type="checkbox" />
                <span>{tipo}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="Intercambiar__selectores">
          <label className="Intercambiar__selector">
            <span>Estado mínimo aceptado</span>
            <select defaultValue="TODOS" aria-label="Estado mínimo aceptado">
              <option>TODOS</option>
              <option>NUEVA CON ETIQUETA</option>
              <option>NUEVA SIN ETIQUETA</option>
              <option>COMO NUEVA</option>
              <option>MUY BUEN ESTADO</option>
              <option>BUEN ESTADO</option>
            </select>
          </label>
          <label className="Intercambiar__selector">
            <span>Talle que busca</span>
            <select defaultValue="M" aria-label="Talle que busca">
              <option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option>
            </select>
          </label>
        </div>
      </form>
    </Modal>
  );
}
