import Modal from "../../../../../componentes/modal/Modal";
import "../../../../../styles/global.css";
import "../../../../../styles/variables.css";
import "./crearPrenda2.css";

export default function CrearPrenda2({ datos, estilosDisponibles = [], coloresDisponibles = [], mensajeError, onCambiar, onSiguiente, onVolver, onClose }) {
  const nombresEstilos = estilosDisponibles.map((estilo) => estilo.estilo);
  const estilosAdicionales = datos.estilos.filter((estilo) => !nombresEstilos.includes(estilo));

  const nombresColores = coloresDisponibles.map((color) => color.color);
  const coloresAdicionales = datos.colores.filter((color) => !nombresColores.includes(color));
  const alternarEstilo = (estilo) => {
    const seleccionados = datos.estilos.includes(estilo)
      ? datos.estilos.filter((actual) => actual !== estilo)
      : [...datos.estilos, estilo];
    onCambiar("estilos", seleccionados);
  };

  const alternarColor = (color) => {
    const seleccionados = datos.colores.includes(color)
      ? datos.colores.filter((actual) => actual !== color)
      : [...datos.colores, color];
    onCambiar("colores", seleccionados);
  };

  return (
    <Modal
      titulo="Agregar Prenda"
      descripcion="Completá la información para agregar una prenda a tu armario"
      onClose={onClose}
    >
      <div className="CrearPrenda2">
        <section className="CrearPrenda2__seccion" aria-labelledby="crear-prenda-estilos">
          <h3 id="crear-prenda-estilos">Estilos</h3>
          <p>Elegí uno o más categorías</p>
          <div className="CrearPrenda2__listaEstilos">
            <ul>
              {nombresEstilos.map((estilo) => (
                <li key={estilo}>
                  <button
                    className={datos.estilos.includes(estilo) ? "CrearPrenda2__estilo--seleccionado" : ""}
                    type="button"
                    aria-pressed={datos.estilos.includes(estilo)}
                    onClick={() => alternarEstilo(estilo)}
                  >
                    {estilo}
                  </button>
                </li>
              ))}
            </ul>
            {estilosAdicionales.length > 0 && (
              <ul>{estilosAdicionales.map((estilo) => (
                <li key={`guardado-${estilo}`}><button className="CrearPrenda2__estilo--seleccionado" type="button" aria-pressed="true" onClick={() => alternarEstilo(estilo)}>{estilo}</button></li>
              ))}</ul>
            )}
          </div>
        </section>

        <section className="CrearPrenda2__seccion CrearPrenda2__seccion--colores" aria-labelledby="crear-prenda-colores">
          <h3 id="crear-prenda-colores">Colores</h3>
          <div className="CrearPrenda2__listaColores">
            {coloresDisponibles.map((color) => (
              <button
                className="CrearPrenda2__color"
                key={color.id_color}
                type="button"
                aria-pressed={datos.colores.includes(color.color)}
                onClick={() => alternarColor(color.color)}
              >
                <span className="CrearPrenda2__casilla" aria-hidden="true" />
                <span
                  className={`CrearPrenda2__muestra${color.color === "Blanco" ? " CrearPrenda2__muestra--borde" : ""}`}
                  style={{ backgroundColor: color.codigo }}
                  aria-hidden="true"
                />
                {color.color}
              </button>
            ))}
            {coloresAdicionales.map((color) => (
              <button className="CrearPrenda2__color" key={`guardado-${color}`} type="button" aria-pressed="true" onClick={() => alternarColor(color)}>
                <span className="CrearPrenda2__casilla" aria-hidden="true" />
                <span className="CrearPrenda2__muestra CrearPrenda2__muestra--borde" data-color="guardado" aria-hidden="true" />
                {color}
              </button>
            ))}
          </div>
        </section>
        {mensajeError && <p className="CrearPrenda2__error" role="alert">{mensajeError}</p>}
        <footer className="CrearPrenda2__acciones Modal__acciones">
          <button className="CrearPrenda2__volver Modal__accion" type="button" aria-label="Volver al paso anterior" onClick={onVolver}>
            <span className="material-symbols-outlined" aria-hidden="true">chevron_left</span>
          </button>
          <button className="Modal__accion Modal__accion--confirmar" type="button" onClick={onSiguiente}>
            Siguiente paso <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
          </button>
          <button className="Modal__accion Modal__accion--cancelar" type="button" onClick={onClose}>
            Salir sin guardar <span className="material-symbols-outlined" aria-hidden="true">logout</span>
          </button>
        </footer>
      </div>
    </Modal>
  );
}
