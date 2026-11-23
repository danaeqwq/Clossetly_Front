import { useState, useEffect } from "react";
import axios from "axios";

import PanelDesplegable from "../panelDesplegable/PanelDesplegable";
import Select from "../select/Select";

import "./filtros.css";

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
  onAplicar,
}) {
  const [mostrarTodasCategorias, setMostrarTodasCategorias] = useState(false);

  // Opciones provenientes de MySQL
  const [opciones, setOpciones] = useState({
    categorias: [],
    talles: [],
    temporadas: [],
    estados: [],
    ocasiones: [],
    generos: [],
    colores: [],
    estilos: [],
  });

  // Obtener opciones de filtros desde el backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
        .get("http://localhost:3000/api/filtros", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((respuesta) => {
            setOpciones(respuesta.data);
        })
        .catch((error) => {
            console.error("Error al obtener opciones de filtros:", error);
        });
  }, []);

  // Opciones dinámicas
  const opcionesPrenda = [
    "TODAS",
    ...opciones.categorias.map((item) => item.categoria),
  ];

  const estados = opciones.estados.map((item) => ({
    id: item.id_estado_prenda,
    nombre: item.estado_prenda,
  }));

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
        ...opciones.talles.map((item) => item.talla),
      ],
    },
    {
      clave: "temporada",
      etiqueta: "Temporada",
      opciones: [
        "TODAS",
        ...opciones.temporadas.map((item) => item.temporada),
      ],
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
      opciones: [
        "TODOS",
        ...opciones.ocasiones.map((item) => item.ocacion),
      ],
    },
    {
      clave: "genero",
      etiqueta: "Género",
      opciones: [
        "TODOS",
        ...opciones.generos.map((item) => item.genero),
      ],
    },
  ];

  const opcionesColores = opciones.colores.map((item) => ({
    nombre: item.color,
    color: item.codigo,
    borde: item.color.toLowerCase() === "blanco",
  }));

  const estilos = opciones.estilos.map((item) => item.estilo);

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

  // Seleccionar o deseleccionar elementos
  const alternarElemento = (setter, elemento) => {
    setter((actuales) =>
      actuales.includes(elemento)
        ? actuales.filter((item) => item !== elemento)
        : [...actuales, elemento]
    );
  };

  const alternarColor = (nombre) => {
  alternarElemento(setColores, nombre);
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
        <section className="FiltrosIntercambio__generales">
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
            {campos.map(({ clave, etiqueta, opciones, tipo: tipoCampo }) => (
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
            ))}
          </div>

          {/* COLORES */}
          <section className="FiltrosIntercambio__grupoColores">
            <h3 className="FiltrosIntercambio__tituloGrupo">
              COLORES
            </h3>

            <div className="FiltrosIntercambio__colores">
              {opcionesColores.map(({ nombre, color, borde }) => {
                const colorSeleccionado = nombre;

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
                        borde
                          ? " FiltrosIntercambio__muestra--borde"
                          : ""
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
          <section className="FiltrosIntercambio__grupoEstilos">
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
                        activo
                          ? " FiltrosIntercambio__estilo--activo"
                          : ""
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
              {mostrarTodasCategorias
                ? "Mostrar menos −"
                : "Mostrar más +"}
            </button>
          </section>
        </section>

        {/* FILTROS ESPECÍFICOS DE COMPRA */}
        {tipo === "compra" && (
          <section className="FiltrosIntercambio__especificos">
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
          <section className="FiltrosIntercambio__especificos">
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

            {/* ESTADO MÍNIMO ACEPTADO Y TALLE BUSCADO */}
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

                  {opciones.talles.map(({ talla }) => (
                    <option key={talla} value={talla}>
                      {talla}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>
        )}

      </div>
    </PanelDesplegable>
  );
}
