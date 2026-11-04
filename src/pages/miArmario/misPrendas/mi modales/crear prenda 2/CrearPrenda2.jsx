import Modal from "../../../../../componentes/modal/Modal";
import "../../../../../styles/global.css";
import "../../../../../styles/variables.css";
import "./crearPrenda2.css";

const columnasEstilos = [
  ["Art Hoe", "Coquette", "Deportivo", "Goth", "Indie Sleaze", "Mob Wife", "Skater", "Vintage"],
  ["Avant-Garde", "Cottage Core", "Formal", "Gothic Lolita", "Hawai", "Old Money", "Soft Girl", "Western"],
  ["Athleisure", "Cyberpunk", "Goth", "Gorpcore", "Light Academia", "Preppy", "Soft Grunge", "Y2K"],
  ["Balletcore", "Dark Academia", "Gothic Lolita", "Gyaru", "Lolita", "Punk", "Streetwear"],
  ["Boho Chic", "Darkwear", "Gorpcore", "Hippie", "McBling", "Quiet Luxury", "Techwear"],
];

const estilosDestacados = new Set(["Art Hoe", "Coquette", "Cottage Core", "Cyberpunk", "Deportivo"]);

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

export default function CrearPrenda2() {
  return (
    <Modal
      titulo="Agregar Prenda"
      descripcion="Completá la información para agregar una prenda a tu armario"
      confirmar={{ texto: <>siguiente paso <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span></> }}
      cancelar={{ texto: "Salir sin guardar", icono: "logout" }}
    >
      <div className="CrearPrenda2">
        <section className="CrearPrenda2__seccion" aria-labelledby="crear-prenda-estilos">
          <h3 id="crear-prenda-estilos">Estilos</h3>
          <p>Elegí uno o más categorías</p>
          <div className="CrearPrenda2__listaEstilos">
            {columnasEstilos.map((columna, indice) => (
              <ul key={`columna-${indice}`}>
                {columna.map((estilo) => (
                  <li className={estilosDestacados.has(estilo) ? "CrearPrenda2__estilo--destacado" : ""} key={estilo}>
                    {estilo}
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
              <span className="CrearPrenda2__color" key={color.nombre}>
                <span className="CrearPrenda2__casilla" aria-hidden="true" />
                <span
                  className={`CrearPrenda2__muestra${color.borde ? " CrearPrenda2__muestra--borde" : ""}`}
                  style={{ "--color-muestra": color.tono }}
                  aria-hidden="true"
                />
                {color.nombre}
              </span>
            ))}
          </div>
        </section>
      </div>
    </Modal>
  );
}
