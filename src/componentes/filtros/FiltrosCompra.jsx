import PanelDesplegable from "../panelDesplegable/PanelDesplegable";
import Select from "../select/Select";
import Boton from "../Boton/Boton";
import "./filtrosIntercambio.css";
import "./filtrosCompra.css";

const categorias = [
  { valor: "compra", texto: "COMPRA", activa: true },
  { valor: "todas", texto: "TODAS" },
  { valor: "intercambio", texto: "INTERCAMBIO" },
];

const filtrosGenerales = [
  { etiqueta: "Prenda", opciones: ["TODAS", "VESTIDOS", "BLUSAS", "PANTALONES", "FALDAS", "ABRIGOS"] },
  { etiqueta: "Talle", opciones: ["TODOS", "XS", "S", "M", "L", "XL"] },
  { etiqueta: "Temporada", opciones: ["TODAS", "PRIMAVERA", "VERANO", "OTOÑO", "INVIERNO"] },
  { etiqueta: "Estado", opciones: ["TODAS", "COMO NUEVA", "MUY BUENO", "BUENO"] },
  { etiqueta: "Ocasión", opciones: ["TODAS", "CASUAL", "FORMAL", "FIESTA"] },
  { etiqueta: "Género", opciones: ["TODAS", "MUJER", "HOMBRE", "UNISEX"] },
];

const colores = [
  { nombre: "Rojo", color: "var(--color-rojo)" },
  { nombre: "Amarillo", color: "var(--color-amarillo)" },
  { nombre: "Rosa", color: "var(--color-rosa)" },
  { nombre: "Naranja", color: "var(--color-naranja)" },
  { nombre: "Verde", color: "var(--color-verde)" },
  { nombre: "Negro", color: "var(--color-negro)" },
  { nombre: "Azul", color: "var(--color-azul)" },
  { nombre: "Morado", color: "var(--color-morado)" },
  { nombre: "Blanco", color: "var(--color-blancaso)", borde: true },
];

const estilos = [
  "Art Hoe", "Coquette", "Deportivo", "Avant-Garde", "Cottage Core", "Formal",
  "Athleisure", "Cyberpunk", "Goth", "Balletcore", "Dark Academia",
  "Gothic Lolita", "Boho Chic", "Darkwear", "Gorpcore",
];

export default function FiltrosCompra() {
  return (
    <PanelDesplegable titulo="Filtros" icono="tune" className="FiltrosIntercambio FiltrosCompra">
      <div className="FiltrosIntercambio__contenido">
        <section className="FiltrosIntercambio__generales" aria-labelledby="FiltrosCompra-generales">
          <h3 className="FiltrosIntercambio__subtitulo" id="FiltrosCompra-generales">Filtros generales</h3>
          <Select
            opciones={categorias}
            ariaLabel="Sección de filtros"
            className="FiltrosIntercambio__categorias"
          />

          <div className="FiltrosIntercambio__campos">
            {filtrosGenerales.map(({ etiqueta, opciones }) => (
              <label className="FiltrosIntercambio__campo" key={etiqueta}>
                <span className="FiltrosIntercambio__etiqueta">{etiqueta}</span>
                <select defaultValue={opciones[0]} aria-label={etiqueta}>
                  {opciones.map((opcion) => <option key={opcion}>{opcion}</option>)}
                </select>
              </label>
            ))}
          </div>

          <fieldset className="FiltrosIntercambio__grupoColores">
            <legend className="FiltrosIntercambio__tituloGrupo">COLORES</legend>
            <div className="FiltrosIntercambio__colores">
              {colores.map(({ nombre, color, borde }) => (
                <label className="FiltrosIntercambio__color" key={nombre}>
                  <input type="checkbox" aria-label={nombre} />
                  <span
                    className={`FiltrosIntercambio__muestra${borde ? " FiltrosIntercambio__muestra--borde" : ""}`}
                    style={{ "--muestra-color": color }}
                    aria-hidden="true"
                  />
                  <span>{nombre}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <section className="FiltrosIntercambio__grupoEstilos" aria-labelledby="FiltrosCompra-estilos">
            <h3 className="FiltrosIntercambio__tituloGrupo" id="FiltrosCompra-estilos">ESTILOS</h3>
            <p className="FiltrosIntercambio__ayuda">Elegí una o más categorías para explorar</p>
            <div className="FiltrosIntercambio__estilos">
              {estilos.map((estilo, indice) => (
                <button
                  className={`FiltrosIntercambio__estilo${[0, 2, 4, 7].includes(indice) ? " FiltrosIntercambio__estilo--activo" : ""}`}
                  key={estilo}
                  type="button"
                  aria-pressed={[0, 2, 4, 7].includes(indice)}
                >
                  {estilo}
                </button>
              ))}
            </div>
            <button className="FiltrosIntercambio__mostrarMas" type="button">Mostrar más</button>
          </section>
        </section>

        <section className="FiltrosIntercambio__especificos" aria-labelledby="FiltrosCompra-especificos">
          <h3 className="FiltrosIntercambio__subtitulo FiltrosIntercambio__subtitulo--italica" id="FiltrosCompra-especificos">Filtros específicos</h3>
          <label className="FiltrosIntercambio__campo FiltrosCompra__campoPrecio">
            <span className="FiltrosIntercambio__etiqueta">Precio</span>
            <select defaultValue="MAYOR MENOR" aria-label="Ordenar por precio">
              <option>MAYOR MENOR</option>
              <option>MENOR MAYOR</option>
            </select>
          </label>
        </section>

        <div className="FiltrosIntercambio__acciones">
          <Boton texto="Guardar cambios" variante="principal" type="button" />
        </div>
      </div>
    </PanelDesplegable>
  );
}
