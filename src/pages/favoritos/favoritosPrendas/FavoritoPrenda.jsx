import "./FavoritoPrenda.css";
import PanelDesplegable from "../../../componentes/panelDesplegable/PanelDesplegable";
import Select from "../../../componentes/select/Select";
import Boton from "../../../componentes/Boton/Boton";

const categorias = [
  { valor: "outfits", texto: "OUTFITS", activa: true },
  { valor: "compra", texto: "COMPRA" },
  { valor: "intercambio", texto: "INTERCAMBIO" },
];

const filtrosGenerales = [
  { etiqueta: "Prenda", opciones: ["TODAS", "VESTIDOS", "BLUSAS", "FALDAS", "PANTALONES", "ABRIGOS"] },
  { etiqueta: "Ocasión", opciones: ["TODOS", "CASUAL", "FORMAL", "FIESTA"] },
  { etiqueta: "Temporada", opciones: ["TODAS", "PRIMAVERA", "VERANO", "OTOÑO", "INVIERNO"] },
  { etiqueta: "Género", opciones: ["TODAS", "MUJER", "HOMBRE", "UNISEX"] },
];

const colores = [
  { nombre: "Rojo", modificador: "rojo" },
  { nombre: "Amarillo", modificador: "amarillo" },
  { nombre: "Rosa", modificador: "rosa" },
  { nombre: "Naranja", modificador: "naranja" },
  { nombre: "Verde", modificador: "verde" },
  { nombre: "Negro", modificador: "negro" },
  { nombre: "Azul", modificador: "azul" },
  { nombre: "Morado", modificador: "morado" },
  { nombre: "Blanco", modificador: "blanco" },
];

const estilos = [
  "Art Hoe", "Coquette", "Deportivo", "Avant-Garde", "Cottage Core", "Formal",
  "Athleisure", "Cyberpunk", "Goth", "Balletcore", "Dark Academia",
  "Gothic Lolita", "Boho Chic", "Darkwear", "Gorpcore",
];

export default function FavoritoPrenda() {
  return (
    <PanelDesplegable titulo="Filtros" icono="tune" className="FavoritoPrenda">
      <div className="FavoritoPrenda__contenido">
        <h3 className="FavoritoPrenda__subtitulo">Filtros generales</h3>

        <Select
          opciones={categorias}
          ariaLabel="Categorías de favoritos"
          className="FavoritoPrenda__categorias"
        />

        <div className="FavoritoPrenda__filtrosGenerales">
          {filtrosGenerales.map(({ etiqueta, opciones }) => (
            <label className="FavoritoPrenda__campo" key={etiqueta}>
              <span className="FavoritoPrenda__etiqueta">{etiqueta}</span>
              <select className="FavoritoPrenda__select" defaultValue={opciones[0]}>
                {opciones.map((opcion) => (
                  <option key={opcion} value={opcion}>{opcion}</option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <fieldset className="FavoritoPrenda__grupoColores">
          <legend className="FavoritoPrenda__tituloGrupo">COLORES</legend>
          <div className="FavoritoPrenda__colores">
            {colores.map(({ nombre, modificador }) => (
              <label className="FavoritoPrenda__color" key={nombre}>
                <input className="FavoritoPrenda__casilla" type="checkbox" />
                <span className={`FavoritoPrenda__muestra FavoritoPrenda__muestra--${modificador}`} aria-hidden="true" />
                <span>{nombre}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <section className="FavoritoPrenda__grupoEstilos" aria-labelledby="FavoritoPrenda-estilos">
          <h3 className="FavoritoPrenda__tituloGrupo" id="FavoritoPrenda-estilos">ESTILOS</h3>
          <p className="FavoritoPrenda__ayuda">Elegí una o más categorías para explorar</p>
          <div className="FavoritoPrenda__estilos">
            {estilos.map((estilo, indice) => (
              <button
                className={`FavoritoPrenda__estilo${indice === 0 ? " FavoritoPrenda__estilo--activo" : ""}`}
                key={estilo}
                type="button"
                aria-pressed={indice === 0}
              >
                {estilo}
              </button>
            ))}
          </div>
          <button className="FavoritoPrenda__mostrarMas" type="button">Mostrar más +</button>
        </section>

        <div className="FavoritoPrenda__acciones">
          <Boton texto="Guardar cambios" variante="principal" type="button" />
        </div>
      </div>
    </PanelDesplegable>
  );
}
