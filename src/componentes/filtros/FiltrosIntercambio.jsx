import PanelDesplegable from "../panelDesplegable/PanelDesplegable";
import Select from "../select/Select";
import Boton from "../Boton/Boton";
import "./filtrosIntercambio.css";

const categorias = [
  { valor: "compra", texto: "COMPRA" },
  { valor: "todas", texto: "TODAS" },
  { valor: "intercambio", texto: "INTERCAMBIO", activa: true },
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

const tiposAceptados = ["Remeras", "Pantalones", "Accesorios", "Cortos", "Camperas", "Zapatos"];

export default function FiltrosIntercambio() {
  return (
    <PanelDesplegable titulo="Filtros" icono="tune" className="FiltrosIntercambio">
      <div className="FiltrosIntercambio__contenido">
        <section className="FiltrosIntercambio__generales" aria-labelledby="FiltrosIntercambio-generales">
          <h3 className="FiltrosIntercambio__subtitulo" id="FiltrosIntercambio-generales">Filtros generales</h3>

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

          <section className="FiltrosIntercambio__grupoEstilos" aria-labelledby="FiltrosIntercambio-estilos">
            <h3 className="FiltrosIntercambio__tituloGrupo" id="FiltrosIntercambio-estilos">ESTILOS</h3>
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
            <button className="FiltrosIntercambio__mostrarMas" type="button">Mostrar más +</button>
          </section>
        </section>

        <section className="FiltrosIntercambio__especificos" aria-labelledby="FiltrosIntercambio-especificos">
          <h3 className="FiltrosIntercambio__subtitulo FiltrosIntercambio__subtitulo--italica" id="FiltrosIntercambio-especificos">Filtros específicos</h3>
          <fieldset className="FiltrosIntercambio__grupoAcepta">
            <legend className="FiltrosIntercambio__tituloGrupo">TIPOS DE PRENDAS QUE ACEPTA</legend>
            <div className="FiltrosIntercambio__tiposAceptados">
              {tiposAceptados.map((tipo) => (
                <label className="FiltrosIntercambio__opcionAceptada" key={tipo}>
                  <input type="checkbox" />
                  <span>{tipo}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="FiltrosIntercambio__campos FiltrosIntercambio__campos--especificos">
            <label className="FiltrosIntercambio__campo">
              <span className="FiltrosIntercambio__etiqueta">Estado mínimo aceptado</span>
              <select defaultValue="TODOS" aria-label="Estado mínimo aceptado">
                <option>TODOS</option><option>COMO NUEVO</option><option>MUY BUENO</option><option>BUENO</option>
              </select>
            </label>
            <label className="FiltrosIntercambio__campo">
              <span className="FiltrosIntercambio__etiqueta">Talle que busca</span>
              <select defaultValue="TODOS" aria-label="Talle que busca">
                <option>TODOS</option><option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option>
              </select>
            </label>
          </div>
        </section>

        <div className="FiltrosIntercambio__acciones">
          <Boton texto="Guardar cambios" variante="principal" type="button" />
        </div>
      </div>
    </PanelDesplegable>
  );
}
