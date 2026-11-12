
import { useState } from "react";

import PanelDesplegable from "../panelDesplegable/PanelDesplegable";
import Select from "../select/Select";
import Boton from "../Boton/Boton";

import "./filtros.css";

// Opciones de prendas
const opcionesPrenda = [
  "TODAS",
  "Remeras",
  "Pantalones",
  "Buzos",
  "Camperas",
  "Abrigos",
  "Vestidos",
  "Faldas",
  "Shorts",
  "Zapatos",
  "Accesorios",
];

const estados = [
  { id: 1, nombre: "Nueva con etiqueta" },
  { id: 2, nombre: "Nueva sin etiqueta" },
  { id: 3, nombre: "Como nueva" },
  { id: 4, nombre: "Muy buen estado" },
  { id: 5, nombre: "Buen estado" },
  { id: 6, nombre: "Usada" },
];

// Todos los campos de filtros
const campos = [
  {
    clave: "prenda",
    etiqueta: "Prenda",
    opciones: opcionesPrenda,
  },
  {
    clave: "talle",
    etiqueta: "Talle",
    opciones: [
      "TODOS",
      "XS", "S", "M", "L", "XL",
      "28", "29", "30", "31", "32",
      "33", "34", "35", "36", "37",
      "38", "39", "40", "41", "42",
      "43", "44", "45",
    ],
  },
  {
    clave: "temporada",
    etiqueta: "Temporada",
    opciones: ["TODAS", "PRIMAVERA", "VERANO", "OTOÑO", "INVIERNO"],
  },
  {
    clave: "estado",
    etiqueta: "Estado",
    opciones: estados,
    tipo: "estado",
  },
  {
    clave: "ocasion",
    etiqueta: "Ocasión",
    opciones: ["TODOS", "CASUAL", "FORMAL", "FIESTA"],
  },
  {
    clave: "genero",
    etiqueta: "Género",
    opciones: ["TODOS", "Mujer", "Hombre", "Unisex"]
  },
];

// Colores disponibles
const opcionesColores = [
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

// Estilos disponibles
const estilos = [
  "art hoe", "athleisure", "balletcore", "boho chic", "clean girl",
  "coquette", "cottagecore", "cyberpunk", "dark academia", "darkwear",
  "deportivo", "formal", "goth", "gothic lolita", "gorpcore", "gyaru",
  "hippie", "indie sleaze", "kawaii", "light academia", "lolita",
  "mcbling", "mob wife", "old money", "preppy", "punk", "quiet luxury",
  "skater", "soft girl", "soft grunge", "streetwear", "techwear",
  "vintage", "western", "y2k",
];
// Categorías de Boutique
const categorias = [
  { valor: "todos", texto: "TODOS" },
  { valor: "compra", texto: "COMPRA" },
  { valor: "intercambio", texto: "INTERCAMBIO" },
];

export default function Filtros({
  tipo = "todos",
  onChange,
  categoriasActivas = [],
  setCategoriasActivas,
  criterios = {},
  setCriterios,
  onCerrar,
  colores = [],
  setColores,
  tiposAceptados = [],
  setTiposAceptados,
}) {
  const [mostrarTodasCategorias, setMostrarTodasCategorias] = useState(false);

  const claseTipo = {
    todos: "FiltrosTodo",
    compra: "FiltrosCompra",
    intercambio: "FiltrosIntercambio",
  }[tipo] || "FiltrosTodo";

  // Actualizar un criterio de filtro
  const actualizarCriterio = (clave, valor) => {
    setCriterios((actuales) => ({
      ...actuales,
      [clave]: valor,
    }));
  };

  // Seleccionar o deseleccionar un elemento de una lista
  const alternarElemento = (setter, elemento) => {
    setter((actuales) =>
      actuales.includes(elemento)
        ? actuales.filter((item) => item !== elemento)
        : [...actuales, elemento]
    );
  };
  const alternarColor = (nombre) => {
    alternarElemento(setColores, nombre.toLowerCase());
  };

  const alternarPrendaAceptada = (prenda) => {
    alternarElemento(setTiposAceptados, prenda);
  };

  const alternarCategoria = (estilo) => {
    alternarElemento(setCategoriasActivas, estilo);
  };
  return (
    <PanelDesplegable
      titulo="Filtros"
      icono="tune"
      className={`FiltrosIntercambio FiltrosBoutique ${claseTipo}`}
      onClose={onCerrar}
    >
      <div className="FiltrosIntercambio__contenido">
        {/* FILTROS GENERALES */}
        <section
          className="FiltrosIntercambio__generales"
        >
          <h3
            className="FiltrosIntercambio__subtitulo"
            id="FiltrosBoutique-generales"
          >
            Filtros generales
          </h3>

          <Select
            opciones={categorias}
            seleccionada={tipo}
            onChange={onChange}
            className="FiltrosIntercambio__categorias"
          />

          <div className="FiltrosIntercambio__campos">
            {campos.map(
            ({ clave, etiqueta, opciones, tipo: tipoCampo }) => (
              <label
                className="FiltrosIntercambio__campo"
                key={clave}
              >
                <span className="FiltrosIntercambio__etiqueta">
                  {etiqueta}
                </span>
                <select
                  value={criterios[clave] || ""}
                  onChange={(evento) =>
                    actualizarCriterio(clave, evento.target.value)
                  }
                >
                  {tipoCampo === "estado" ? (
                    <>
                      <option value="">TODAS</option>
                      {opciones.map(({ id, nombre }) => (
                        <option key={id} value={nombre}>
                          {nombre}
                        </option>
                      ))}
                    </>
                  ) : (
                    opciones.map((opcion, indice) => (
                      <option
                        key={opcion}
                        value={indice === 0 ? "" : opcion}
                      >
                        {opcion}
                      </option>
                    ))
                  )}
                </select>
              </label>
            )
          )}
          </div>

          {/* COLORES */}
          <section className="FiltrosIntercambio__grupoColores">
            <h3 className="FiltrosIntercambio__tituloGrupo">
              COLORES
            </h3>

            <div className="FiltrosIntercambio__colores">
              {opcionesColores.map(({ nombre, color, borde }) => {
                const colorSeleccionado = nombre.toLowerCase();

                return (
                  <label
                    className="FiltrosIntercambio__color"
                    key={nombre}
                  >
                    <input
                      type="checkbox"
                      checked={colores.includes(colorSeleccionado)}
                      onChange={() => alternarColor(nombre)}
                    />

                    <span
                      className={`FiltrosIntercambio__muestra${
                        borde ? " FiltrosIntercambio__muestra--borde" : ""
                      }`}
                      style={{ "--muestra-color": color }}
                      aria-hidden="true"
                    />

                    <span>{nombre}</span>
                  </label>
                );
              })}
            </div>
          </section>

          {/* ESTILOS */}
          <section
            className="FiltrosIntercambio__grupoEstilos"
          >
            <h3
              className="FiltrosIntercambio__tituloGrupo"
              id="FiltrosBoutique-estilos"
            >
              ESTILOS
            </h3>

            <p className="FiltrosIntercambio__ayuda">
              Elegí una o más categorías para explorar
            </p>

            <div className="FiltrosIntercambio__estilos">
              {estilos
                .slice(0, mostrarTodasCategorias ? estilos.length : 15)
                .map((estilo) => {
                  const activo = categoriasActivas.includes(estilo);

                  return (
                    <button
                      className={`FiltrosIntercambio__estilo${
                        activo ? " FiltrosIntercambio__estilo--activo" : ""
                      }`}
                      key={estilo}
                      type="button"
                      aria-pressed={activo}
                      onClick={() => alternarCategoria(estilo)}
                    >
                      {estilo}
                    </button>
                  );
                })}
            </div>

            <button
              className="FiltrosIntercambio__mostrarMas"
              type="button"
              aria-expanded={mostrarTodasCategorias}
              onClick={() =>
                setMostrarTodasCategorias((mostrar) => !mostrar)
              }
            >
              {mostrarTodasCategorias ? "Mostrar menos −" : "Mostrar más +"}
            </button>
          </section>
        </section>

        {/* FILTROS ESPECÍFICOS DE COMPRA */}
        {tipo === "compra" && (
          <section
            className="FiltrosIntercambio__especificos"
          >
            <h3
              className="FiltrosIntercambio__subtitulo FiltrosIntercambio__subtitulo--italica"
              id="FiltrosBoutique-especificos"
            >
              Filtros específicos
            </h3>

            <label className="FiltrosIntercambio__campo FiltrosCompra__campoPrecio">
              <span className="FiltrosIntercambio__etiqueta">
                Precio
              </span>

              <select
                value={criterios.ordenPrecio || "MAYOR MENOR"}
                onChange={(evento) =>
                  actualizarCriterio("ordenPrecio", evento.target.value)
                }
              >
                <option>MAYOR MENOR</option>
                <option>MENOR MAYOR</option>
              </select>
            </label>
          </section>
        )}
        {/* FILTROS ESPECÍFICOS DE INTERCAMBIO */}
        {tipo === "intercambio" && (
          <section
            className="FiltrosIntercambio__especificos"
          >
            <h3
              className="FiltrosIntercambio__subtitulo FiltrosIntercambio__subtitulo--italica"
              id="FiltrosBoutique-especificos"
            >
              Filtros específicos
            </h3>

            {/* TIPOS DE PRENDAS ACEPTADAS */}
            <section className="FiltrosIntercambio__grupoAcepta">
              <h3 className="FiltrosIntercambio__tituloGrupo">
                TIPOS DE PRENDAS QUE ACEPTA
              </h3>

              <div className="FiltrosIntercambio__tiposAceptados">
                {opcionesPrenda.slice(1).map((prenda) => (
                  <label
                    className="FiltrosIntercambio__opcionAceptada"
                    key={prenda}
                  >
                    <input
                      type="checkbox"
                      checked={tiposAceptados.includes(prenda)}
                      onChange={() => alternarPrendaAceptada(prenda)}
                    />

                    <span>{prenda}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* ESTADO MÍNIMO ACEPTADO */}
            <div className="FiltrosIntercambio__campos FiltrosIntercambio__campos--especificos">
              <label className="FiltrosIntercambio__campo">
                <span className="FiltrosIntercambio__etiqueta">
                  Estado mínimo aceptado
                </span>

                <select
                  value={criterios.estadoMinimoAceptado || ""}
                  onChange={(evento) =>
                    actualizarCriterio(
                      "estadoMinimoAceptado",
                      Number(evento.target.value) || ""
                    )
                  }
                >
                  <option value="">TODOS</option>

                  {estados.map(({ id, nombre }) => (
                    <option key={id} value={id}>
                      {nombre}
                    </option>
                  ))}
                </select>
              </label>

              {/* TALLE QUE BUSCA */}
              <label className="FiltrosIntercambio__campo">
                <span className="FiltrosIntercambio__etiqueta">
                  Talle que busca
                </span>

                <select
                  value={criterios.talleBuscado || ""}
                  onChange={(evento) =>
                    actualizarCriterio("talleBuscado", evento.target.value)
                  }
                >
                  <option value="">TODOS</option>
                  <option>XS</option>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </select>
              </label>
            </div>
          </section>
        )}

        {/* ACCIONES */}
        <div className="FiltrosIntercambio__acciones">
          <Boton
            texto="Guardar cambios"
            variante="principal"
            type="button"
          />
        </div>

      </div>
    </PanelDesplegable>
  );
}
