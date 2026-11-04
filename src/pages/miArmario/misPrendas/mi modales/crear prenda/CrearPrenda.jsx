import Modal from "../../../../../componentes/modal/Modal";
import Select from "../../../../../componentes/select/Select";
import "./crearPrenda.css";

const tiposPublicacion = [
  { valor: "prenda", icono: "apparel", texto: "PRENDA", activa: true },
  { valor: "intercambio", icono: "autorenew", texto: "INTERCAMBIO" },
  { valor: "compra", icono: "shopping_basket", texto: "COMPRA" },
];

const etiquetas = [
  { nombre: "Prenda", valor: "REMERA" },
  { nombre: "Talle", valor: "M" },
  { nombre: "Temporada", valor: "PRIMAVERA" },
  { nombre: "Ocasión", valor: "FORMAL" },
  { nombre: "Género", valor: "UNISEX" },
  { nombre: "Estado", valor: "NUEVA" },
];

export default function CrearPrenda() {
  return (
    <Modal
      titulo="Agregar Prenda"
      descripcion="Completá la información para agregar una prenda a tu armario"
      confirmar={{ texto: <>Siguiente paso <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span></> }}
      cancelar={{ texto: "Salir sin guardar", icono: "logout" }}
    >
      <div className="AgregarPrenda">
        <div className="AgregarPrenda__tipos" aria-label="Tipo de publicación">
          <span className="AgregarPrenda__tiposTitulo">Tipo de publicación:</span>
          <Select
            opciones={tiposPublicacion}
            ariaLabel="Tipo de publicación"
            className="AgregarPrenda__select"
          />
        </div>

        <div className="AgregarPrenda__contenido">
          <div className="AgregarPrenda__foto" aria-label="Agregar foto de la prenda">
            <span className="material-symbols-outlined" aria-hidden="true">photo_camera</span>
            <span>Agregar foto</span>
          </div>

          <div className="AgregarPrenda__formulario">
            <div className="AgregarPrenda__campo AgregarPrenda__campo--nombre">
              <label htmlFor="crear-prenda-nombre">Nombre</label>
              <input id="crear-prenda-nombre" readOnly value="" placeholder="Ej: remera vintage" />
              <span className="AgregarPrenda__contador">0/12</span>
            </div>

            <div className="AgregarPrenda__campo AgregarPrenda__campo--descripcion">
              <label htmlFor="crear-prenda-descripcion">Descripción</label>
              <input id="crear-prenda-descripcion" readOnly value="" placeholder="Contá algo sobre la prenda..." />
            </div>

            <div className="AgregarPrenda__privacidad">
              <span>Privacidad</span>
              <span className="AgregarPrenda__publica">Pública</span>
              <span className="AgregarPrenda__switch" aria-hidden="true"><span /></span>
            </div>

            <div className="AgregarPrenda__etiquetas">
              {etiquetas.map((etiqueta) => (
                <div className="AgregarPrenda__etiqueta" key={etiqueta.nombre}>
                  <span>{etiqueta.nombre}</span>
                  <b>{etiqueta.valor}</b>
                  <i className="material-symbols-outlined" aria-hidden="true">keyboard_arrow_down</i>
                </div>
              ))}
            </div>
            <span className="AgregarPrenda__ayuda">¿Qué significa cada estado de una prenda?</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
