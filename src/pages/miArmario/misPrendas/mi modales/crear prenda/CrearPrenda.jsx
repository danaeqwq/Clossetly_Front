import Modal from "../../../../../componentes/modal/Modal";
import Select from "../../../../../componentes/select/Select";
import "./crearPrenda.css";

const tiposPublicacion = [
  { valor: "prenda", icono: "apparel", texto: "PRENDA", activa: true },
  { valor: "intercambio", icono: "autorenew", texto: "INTERCAMBIO" },
  { valor: "venta", icono: "shopping_basket", texto: "VENTA" },
];

const etiquetas = [
  { nombre: "Categoría", campo: "categoria", placeholder: "Seleccioná una categoría" },
  { nombre: "Talle", campo: "talle", placeholder: "Seleccioná un talle" },
  { nombre: "Temporada", campo: "temporada", placeholder: "Seleccioná una temporada" },
  { nombre: "Ocasión", campo: "ocasion", placeholder: "Seleccioná una ocasión" },
  { nombre: "Género", campo: "genero", placeholder: "Seleccioná un género" },
  { nombre: "Estado", campo: "estado", placeholder: "Seleccioná un estado" },
];

export default function CrearPrenda({
  datos,
  categorias = [],
  talles = [],
  temporadas = [],
  ocasiones = [],
  generos = [],
  estados = [],
  mensajeError,
  onCambiar,
  onContinuar,
  onClose,
}) {
  const seleccionarImagen = (evento) => {
    const archivo = evento.target.files?.[0];
    if (!archivo) return;

    if (!archivo.type.startsWith("image/")) {
      evento.target.value = "";
      return;
    }
    const vistaPrevia = URL.createObjectURL(archivo);
    onCambiar("imagen", archivo);
    onCambiar("vistaPrevia", vistaPrevia);
    evento.target.value = "";
  };

  return (
    <Modal
      titulo="Agregar Prenda"
      descripcion="Completá la información para agregar una prenda a tu armario"
      confirmar={{ texto: <>Siguiente paso <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span></>, onClick: onContinuar }}
      cancelar={{ texto: "Salir sin guardar", icono: "logout", onClick: onClose }}
      onClose={onClose}
    >
      <div className="AgregarPrenda">
        <div className="AgregarPrenda__tipos">
          <span className="AgregarPrenda__tiposTitulo">Tipo de publicación:</span>
          <Select
            opciones={tiposPublicacion}
            seleccionada={datos.tipoPublicacion}
            onChange={(tipo) => onCambiar("tipoPublicacion", tipo)}
            ariaLabel="Tipo de publicación"
            className="AgregarPrenda__select"
          />
        </div>

        <div className="AgregarPrenda__contenido">
          <div className="AgregarPrenda__fotoContenedor">
            <label className="AgregarPrenda__foto" htmlFor="crear-prenda-imagen">
              <input
                id="crear-prenda-imagen"
                type="file"
                accept="image/*"
                onChange={seleccionarImagen}
              />
              {datos.vistaPrevia ? (
                <img
                  src={datos.vistaPrevia}
                  alt="Vista previa de la prenda"
                />
              ) : (
                <>
                  <span className="material-symbols-outlined" aria-hidden="true">
                    photo_camera
                  </span>
                  <span>Agregar foto</span>
                </>
              )}
            </label>
            {datos.imagen && (
              <button type="button" className="AgregarPrenda__quitarFoto" onClick={() => onCambiar("imagen", "")}>
                Quitar imagen
              </button>
            )}
          </div>

          <div className="AgregarPrenda__formulario">
            <div className="AgregarPrenda__campo AgregarPrenda__campo--nombre">
              <label htmlFor="crear-prenda-nombre">Nombre</label>
              <input
                id="crear-prenda-nombre"
                value={datos.nombre}
                maxLength={40}
                onChange={(evento) => onCambiar("nombre", evento.target.value)}
                placeholder="Ej: remera vintage"
              />
              <span className="AgregarPrenda__contador">{datos.nombre.length}/40</span>
            </div>

            <div className="AgregarPrenda__campo AgregarPrenda__campo--descripcion">
              <label htmlFor="crear-prenda-descripcion">Descripción</label>
              <input
                id="crear-prenda-descripcion"
                value={datos.descripcion}
                onChange={(evento) => onCambiar("descripcion", evento.target.value)}
                placeholder="Contá algo sobre la prenda..."
              />
            </div>

            <div className="AgregarPrenda__privacidad">
              <span>Privacidad</span>
              <span className="AgregarPrenda__publica">{datos.privacidad ? "Pública" : "Privada"}</span>
              <button
                className={`AgregarPrenda__switch${datos.privacidad ? " AgregarPrenda__switch--activa" : ""}`}
                type="button"
                aria-pressed={datos.privacidad}
                onClick={() => onCambiar("privacidad", !datos.privacidad)}
              ><span /></button>
            </div>

            <div className="AgregarPrenda__etiquetas">
              {etiquetas.map((etiqueta) => {
                let opciones = [];

                switch (etiqueta.campo) {
                  case "categoria":
                    opciones = categorias.map((item) => item.categoria);
                    break;
                  case "talle":
                    opciones = talles.map((item) => item.talla);
                    break;
                  case "temporada":
                    opciones = temporadas.map((item) => item.temporada);
                    break;
                  case "ocasion":
                    opciones = ocasiones.map((item) => item.ocacion);
                    break;
                  case "genero":
                    opciones = generos.map((item) => item.genero);
                    break;
                  case "estado":
                    opciones = estados.map((item) => item.estado_prenda);
                    break;
                  default:
                    opciones = [];
                }

                return (
                  <label className="AgregarPrenda__etiqueta" key={etiqueta.campo}>
                    <span>{etiqueta.nombre}</span>

                    <select
                      value={datos[etiqueta.campo]}
                      onChange={(evento) =>
                        onCambiar(etiqueta.campo, evento.target.value)
                      }
                    >
                      <option value="">{etiqueta.placeholder}</option>

                      {opciones.map((opcion) => (
                        <option key={opcion} value={opcion}>
                          {opcion}
                        </option>
                      ))}
                    </select>

                    <b aria-hidden="true">
                      {datos[etiqueta.campo] || etiqueta.placeholder}
                    </b>

                    <i className="material-symbols-outlined" aria-hidden="true">
                      keyboard_arrow_down
                    </i>
                  </label>
                );
              })}
            </div>
            <span className="AgregarPrenda__ayuda">¿Qué significa cada estado de una prenda?</span>
            {mensajeError && <p className="AgregarPrenda__error" role="alert">{mensajeError}</p>}
          </div>
        </div>
      </div>
    </Modal>
  );
}
