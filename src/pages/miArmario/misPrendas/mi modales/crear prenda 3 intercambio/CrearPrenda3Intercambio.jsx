import Modal from "../../../../../componentes/modal/Modal";
import "./crearPrenda3Intercambio.css";

const tiposPrenda = ["Pantalones", "Accesorios", "Remeras", "Cortos", "Camperas", "Zapatos"];

<<<<<<< Updated upstream
export default function CrearPrenda3Intercambio({ datos, mensajeError, onCambiar, onGuardar, onVolver, onClose }) {
=======
export default function CrearPrenda3Intercambio({ datos, talles = [], mensajeError, onCambiar, onGuardar, onVolver, onClose }) {
>>>>>>> Stashed changes
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
      confirmar={{ texto: <><span className="Intercambiar__volver" role="button" tabIndex={0} aria-label="Volver al paso anterior" onClick={(evento) => { evento.stopPropagation(); onVolver(); }} onKeyDown={(evento) => { if (evento.key === "Enter" || evento.key === " ") { evento.preventDefault(); evento.stopPropagation(); onVolver(); } }}><span className="material-symbols-outlined" aria-hidden="true">chevron_left</span></span>Guardar <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span></>, onClick: onGuardar }}
      cancelar={{ texto: "Salir sin guardar", icono: "logout", onClick: onClose }}
      onClose={onClose}
    >
      <form className="Intercambiar" aria-label="Datos de la prenda para intercambiar">
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
<<<<<<< Updated upstream
            <select value={datos.talleBuscado} onChange={(evento) => onCambiar("talleBuscado", evento.target.value)} aria-label="Talle que busca">
              <option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option>
=======
            <select
              value={datos.talleBuscado}
              onChange={(evento) => onCambiar("talleBuscado", evento.target.value)}
            >
              {talles.map((talle) => (
                <option key={talle.id_talla} value={talle.talla}>
                  {talle.talla}
                </option>
              ))}
>>>>>>> Stashed changes
            </select>
          </label>
        </div>
        {mensajeError && <p className="Intercambiar__error" role="alert">{mensajeError}</p>}
      </form>
    </Modal>
  );
}
