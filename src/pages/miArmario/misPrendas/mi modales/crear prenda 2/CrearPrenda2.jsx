import Modal from "../../../../../componentes/modal/Modal";
import "../../../../../styles/global.css";
import "../../../../../styles/variables.css";
import "./crearPrenda2.css";

const columnasEstilos = [
  ["Art Hoe", "Coquette", "Deportivo", "Goth", "Indie Sleaze", "Mob Wife", "Skater", "Vintage"],
  ["Avant-Garde", "Cottage Core", "Formal", "Gothic Lolita", "Hawai", "Old Money", "Soft Girl", "Western"],
  ["Athleisure", "Cyberpunk", "Gorpcore", "Light Academia", "Preppy", "Soft Grunge", "Y2K"],
  ["Balletcore", "Dark Academia", "Gothic Lolita", "Gyaru", "Lolita", "Punk", "Streetwear"],
  ["Boho Chic", "Darkwear", "Gorpcore", "Hippie", "McBling", "Quiet Luxury", "Techwear"],
];

const colores = [
  { nombre: "Rojo", tono: "#a24e5a" },
  { nombre: "Rosa", tono: "#c89eae" },
  { nombre: "Naranja", tono: "#d8896d" },
  { nombre: "Verde", tono: "#5d7867" },
  { nombre: "Negro", tono: "#302b30" },
  { nombre: "Azul", tono: "#6276b0" },
  { nombre: "Morado", tono: "#8b739b" },
  { nombre: "Blanco", tono: "#fff", borde: true },
  { nombre: "Amarillo", tono: "#efbd73" },
];

export default function CrearPrenda2({ datos, mensajeError, onCambiar, onSiguiente, onVolver, onClose }) {
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
      confirmar={{ texto: <>siguiente paso <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span></>, onClick: onSiguiente }}
      cancelar={{ texto: "Salir sin guardar", icono: "logout", onClick: onClose }}
      onClose={onClose}
    >
      <div className="CrearPrenda2">
        <button className="CrearPrenda2__volver" type="button" onClick={onVolver} aria-label="Volver al paso anterior">
          <span className="material-symbols-outlined" aria-hidden="true">chevron_left</span>
        </button>
        <section className="CrearPrenda2__seccion" aria-labelledby="crear-prenda-estilos">
          <h3 id="crear-prenda-estilos">Estilos</h3>
          <p>Elegí uno o más categorías</p>
          <div className="CrearPrenda2__listaEstilos">
            {columnasEstilos.map((columna, indice) => (
              <ul key={`columna-${indice}`}>
                {columna.map((estilo) => (
                  <li key={`${indice}-${estilo}`}>
                    <button
                      className={datos.estilos.includes(estilo) ? "CrearPrenda2__estilo--seleccionado" : ""}
                      type="button"
                      aria-pressed={datos.estilos.includes(estilo)}
                      onClick={() => alternarEstilo(estilo)}
                    >{estilo}</button>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>

        <section className="CrearPrenda2__seccion CrearPrenda2__seccion--colores" aria-labelledby="crear-prenda-colores">
          <h3 id="crear-prenda-colores">Colores</h3>
          <div className="CrearPrenda2__listaColores">
            {colores.map((color) => (
              <button
                className="CrearPrenda2__color"
                key={color.nombre}
                type="button"
                aria-pressed={datos.colores.includes(color.nombre)}
                onClick={() => alternarColor(color.nombre)}
              >
                <span className="CrearPrenda2__casilla" aria-hidden="true" />
                <span
                  className={`CrearPrenda2__muestra${color.borde ? " CrearPrenda2__muestra--borde" : ""}`}
                  style={{ "--color-muestra": color.tono }}
                  aria-hidden="true"
                />
                {color.nombre}
              </button>
            ))}
          </div>
        </section>
        {mensajeError && <p className="CrearPrenda2__error" role="alert">{mensajeError}</p>}
      </div>
    </Modal>
  );
}
