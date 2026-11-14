import Modal from "../../../../../componentes/modal/Modal";
import "./crearPrenda3Intercambio.css";

const tiposPrenda = ["Pantalones", "Accesorios", "Remeras", "Cortos", "Camperas", "Zapatos"];

export default function CrearPrenda3Intercambio({ datos, mensajeError, onCambiar, onGuardar, onVolver, onClose }) {
  const alternarTipo = (tipo) => {
    const tipos = datos.tiposAceptados.includes(tipo)
      ? datos.tiposAceptados.filter((actual) => actual !== tipo)
      : [...datos.tiposAceptados, tipo];
    onCambiar("tiposAceptados", tipos);
  };

  return (
    <Modal
      className="Modal--intercambio"
      titulo="Prenda Para Intercambiar"
      descripcion="Completa la información para agregar una prenda a tu armario"
      confirmar={{ texto: <>Guardar <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span></>, onClick: onGuardar }}
      cancelar={{ texto: "Salir sin guardar", icono: "logout", onClick: onClose }}
      onClose={onClose}
    >
      <form className="Intercambiar" aria-label="Datos de la prenda para intercambiar">
        <button className="Intercambiar__volver" type="button" onClick={onVolver} aria-label="Volver al paso anterior">
          <span className="material-symbols-outlined" aria-hidden="true">chevron_left</span>
        </button>
        <div className="Intercambiar__datos">
          <label className="Intercambiar__campo">
            <span className="Intercambiar__etiqueta">Precio</span>
            <span className="Intercambiar__entrada Intercambiar__entrada--precio">
              <span aria-hidden="true">$</span>
              <input aria-label="Precio" inputMode="decimal" value={datos.precio} onChange={(evento) => onCambiar("precio", evento.target.value)} placeholder="Ej: 10.000" />
            </span>
          </label>
          <label className="Intercambiar__campo">
            <span className="Intercambiar__etiqueta">Stock</span>
            <span className="Intercambiar__entrada Intercambiar__entrada--stock">
              <span aria-hidden="true">Unidades</span>
              <input aria-label="Cantidad" inputMode="numeric" value={datos.stock} onChange={(evento) => onCambiar("stock", evento.target.value)} placeholder="Ej: 100" />
            </span>
          </label>
        </div>

        <fieldset className="Intercambiar__tipos">
          <legend>Tipos de prendas que acepta</legend>
          <div className="Intercambiar__opciones">
            {tiposPrenda.map((tipo) => (
              <label className="Intercambiar__opcion" key={tipo}>
                <input type="checkbox" checked={datos.tiposAceptados.includes(tipo)} onChange={() => alternarTipo(tipo)} />
                <span>{tipo}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="Intercambiar__selectores">
          <label className="Intercambiar__selector">
            <span>Estado mínimo aceptado</span>
            <select value={datos.estadoMinimo} onChange={(evento) => onCambiar("estadoMinimo", evento.target.value)} aria-label="Estado mínimo aceptado">
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
            <select value={datos.talleBuscado} onChange={(evento) => onCambiar("talleBuscado", evento.target.value)} aria-label="Talle que busca">
              <option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option>
            </select>
          </label>
        </div>
        {mensajeError && <p className="Intercambiar__error" role="alert">{mensajeError}</p>}
      </form>
    </Modal>
  );
}
