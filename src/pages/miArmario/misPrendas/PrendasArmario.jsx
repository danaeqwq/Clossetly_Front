
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./PrendasArmario.css";
import TarjetaPrenda from "../../../componentes/tarjetaPrenda/TarjetaPrenda";
import CrearOutfit from "./mi modales/crear oufit/CrearOutfit";
import CrearPrenda from "./mi modales/crear prenda/CrearPrenda";
import CrearPrenda2 from "./mi modales/crear prenda 2/CrearPrenda2";
import CrearPrenda3Venta from "./mi modales/crear prenda 3 venta/CrearPrenda3Venta";
import CrearPrenda3Intercambio from "./mi modales/crear prenda 3 intercambio/CrearPrenda3Intercambio";
import EliminarPrenda from "./mi modales/eliminarPrenda/EliminarPrenda";

const borradorInicial = {
  tipoPublicacion: "prenda",
  nombre: "",
  descripcion: "",
  imagen: null,
  categoria: "",
  talle: "",
  temporada: "",
  ocasion: "",
  genero: "",
  estado: "",
  privacidad: true,
  estilos: [],
  colores: [],
  precio: "",
  stock: "",
  tiposAceptados: [],
  estadoMinimo: "TODOS",
  talleBuscado: "M",
};

export default function PrendasArmario({
  onPublicacionCreada,
  prendasConvertidas = [],
  onAccionesChange,
  onOutfitCreado,
}) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [prendas, setPrendas] = useState([]);
  const [categoriasAbiertas, setCategoriasAbiertas] = useState([]);
  const [menuAbiertoId, setMenuAbiertoId] = useState(null);
  const [prendaEnEdicion, setPrendaEnEdicion] = useState(null);
  const [prendaAEliminar, setPrendaAEliminar] = useState(null);
  const [crearPrendaAbierto, setCrearPrendaAbierto] = useState(false);
  const [pasoCreacion, setPasoCreacion] = useState(1);
  const [borradorPrenda, setBorradorPrenda] = useState(borradorInicial);
  const [errorCreacion, setErrorCreacion] = useState("");
  const [modoSeleccionOutfit, setModoSeleccionOutfit] = useState(false);
  const [prendasOutfit, setPrendasOutfit] = useState([]);
  const [crearOutfitAbierto, setCrearOutfitAbierto] = useState(false);

  const [categorias, setCategorias] = useState([]);
  const [talles, setTalles] = useState([]);
  const [temporadas, setTemporadas] = useState([]);
  const [ocasiones, setOcasiones] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [estados, setEstados] = useState([]);
  const [colores, setColores] = useState([]);
  const [estilos, setEstilos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/prendas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((respuesta) => {
        setPrendas(respuesta.data.prendas || []);
      })
      .catch((error) => {
        console.error("Error al obtener las prendas:", error);
      });
  }, []);

  const iniciarSeleccionOutfit = (prenda) => {
    setPrendasOutfit([prenda]);
    setCategoriasAbiertas(
      categorias.map((categoria) => categoria.categoria)
    );
    setModoSeleccionOutfit(true);
  };

  const alternarSeleccionPrenda = (prenda) => {
    setPrendasOutfit((actuales) =>
      actuales.some((seleccionada) => seleccionada.id === prenda.id)
        ? actuales.filter((seleccionada) => seleccionada.id !== prenda.id)
        : [...actuales, prenda]
    );
  };

  const cancelarSeleccionOutfit = () => {
    setModoSeleccionOutfit(false);
    setPrendasOutfit([]);
  };

  const abrirCrearOutfit = () => {
    setModoSeleccionOutfit(false);
    setCrearOutfitAbierto(true);
  };

  const cerrarCrearOutfit = () => {
    setCrearOutfitAbierto(false);
    setPrendasOutfit([]);
  };

  function abrirAltaPrenda() {
    setBorradorPrenda(borradorInicial);
    setPasoCreacion(1);
    setCrearPrendaAbierto(true);
    setErrorCreacion("");
  }

  useEffect(() => {
    setPrendas((actuales) => {
      const ids = new Set(actuales.map((prenda) => prenda.id));

      const nuevas = prendasConvertidas.filter(
        (prenda) => !ids.has(prenda.id)
      );

      return nuevas.length ? [...actuales, ...nuevas] : actuales;
    });
  }, [prendasConvertidas]);

  useEffect(() => {
    onAccionesChange?.({
      modoSeleccionOutfit,
      cantidad: prendasOutfit.length,
      onCrearOutfit: abrirCrearOutfit,
      onCancelar: cancelarSeleccionOutfit,
      onAgregarPrendas: abrirAltaPrenda,
      prendasDisponibles: prendas,
    });
  }, [modoSeleccionOutfit, prendasOutfit.length, prendas, onAccionesChange]);

  const alternarCategoria = (nombre) => {
    setCategoriasAbiertas((actuales) =>
      actuales.some((categoria) => categoria === nombre)
        ? actuales.filter((categoria) => categoria !== nombre)
        : [...actuales, nombre]
    );
  };

  const manejarAccionTarjeta = (evento, prenda) => {
    if (evento.target.closest(".TarjetaPrenda__opciones")) {
      setMenuAbiertoId((actual) =>
        actual === prenda.id ? null : prenda.id
      );
      return;
    }

    if (evento.target.closest(".TarjetaPrenda__menu li")) {
      setMenuAbiertoId(null);
      switch (evento.target.closest("li").dataset.accion) {
        case "eliminar":
          setPrendaAEliminar(prenda);
          break;
        case "armar-outfit":
          iniciarSeleccionOutfit(prenda);
          break;
        case "modificar":
          iniciarEdicionPrenda(prenda);
          break;
      }
      return;
    }
    
    if (modoSeleccionOutfit) {
      alternarSeleccionPrenda(prenda);
    } else {
      navigate("/detalles/prenda", {
        state: { prenda },
      });
    }
  };

  const iniciarEdicionPrenda = (prenda) => {
    setPrendaEnEdicion(prenda);

    setBorradorPrenda({
      ...borradorInicial,
      ...prenda,
      tipoPublicacion: "prenda",
      estilos: prenda.estilos || [],
      colores: prenda.colores || (prenda.color ? [prenda.color] : []),
    });

    setPasoCreacion(1);
    setCrearPrendaAbierto(true);
    setErrorCreacion("");
  };

  const cambiarDatoPrenda = (campo, valor) => {
    setBorradorPrenda((actual) => ({ ...actual, [campo]: valor }));
    setErrorCreacion("");
  };

  const cerrarAltaPrenda = () => {
    setCrearPrendaAbierto(false);
    setPasoCreacion(1);
    setBorradorPrenda({ ...borradorInicial });
    setErrorCreacion("");
    setPrendaEnEdicion(null);
  };

  const continuarDesdeDatos = () => {
    if (!borradorPrenda.nombre.trim() || !borradorPrenda.imagen) {
      setErrorCreacion("Completá el nombre y seleccioná una imagen.");
      return;
    }

    if (
      !borradorPrenda.categoria ||
      !borradorPrenda.talle ||
      !borradorPrenda.temporada ||
      !borradorPrenda.ocasion ||
      !borradorPrenda.genero ||
      !borradorPrenda.estado
    ) {
      setErrorCreacion("Completá todas las categorías antes de continuar.");
      return;
    }
    setErrorCreacion("");
    setPasoCreacion(2);
  };

  const continuarDesdeEstilos = () => {
    if (!borradorPrenda.estilos.length) {
      setErrorCreacion("Seleccioná al menos un estilo para continuar.");
      return;
    }
    setErrorCreacion("");
    if (borradorPrenda.tipoPublicacion !== "prenda") {
      setPasoCreacion(3);
      return;
    }
    if (prendaEnEdicion) {
      guardarEdicion();
    } else {
      guardarNuevaPrenda();
    }
  };

  const guardarVenta = () => {
    if (Number(borradorPrenda.precio) <= 0 || Number(borradorPrenda.stock) <= 0) {
      setErrorCreacion("Ingresá un precio y una cantidad de stock mayores a cero.");
      return;
    }
    if (prendaEnEdicion) {
      guardarTipoPublicacion("venta");
      return;
    }
    guardarNuevaPrenda({ tipoPublicacion: "venta" });
  };

  const guardarIntercambio = () => {
    if (borradorPrenda.tiposAceptados.length === 0) {
      setErrorCreacion("Seleccioná al menos un tipo de prenda aceptado.");
      return;
    }
    if (prendaEnEdicion) {
      guardarTipoPublicacion("intercambio");
      return;
    }
    guardarNuevaPrenda({ tipoPublicacion: "intercambio" });
  };

  useEffect(() => {
    const obtenerFiltros = () => {
      axios.get("http://localhost:3000/api/filtros", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((respuesta) => {
          setCategorias(respuesta.data.categorias || []);
          setTalles(respuesta.data.talles || []);
          setTemporadas(respuesta.data.temporadas || []);
          setOcasiones(respuesta.data.ocasiones || []);
          setGeneros(respuesta.data.generos || []);
          setEstados(respuesta.data.estados || []);
          setColores(respuesta.data.colores || []);
          setEstilos(respuesta.data.estilos || []);
        })
        .catch((error) => {
          console.error(
            "Error al obtener los filtros:",
            error.response?.data || error
          );
        });
    };
    obtenerFiltros();
  }, []);

  const guardarTipoPublicacion = (tipoPublicacion) => {
    const nombre = borradorPrenda.nombre.trim() || prendaEnEdicion.nombre;
    const actualizada = {
      ...prendaEnEdicion,
      ...borradorPrenda,
      id: prendaEnEdicion.id,
      tipoPublicacion,
      nombre,
      alt: nombre || prendaEnEdicion.alt,
    };
    setPrendas((actuales) =>
      actuales.filter((prenda) => prenda.id !== prendaEnEdicion.id)
    );
    onPublicacionCreada?.(actualizada, prendaEnEdicion.id);
    cerrarAltaPrenda();
  };

  const buscarId = (opciones, campo, valor, id) =>
  opciones.find(
    (opcion) =>
      String(opcion[campo]).trim().toLowerCase() ===
      String(valor).trim().toLowerCase()
  )?.[id];

  const guardarNuevaPrenda = (datosAdicionales = {}) => {
    const formulario = new FormData();
    formulario.append("nombre", borradorPrenda.nombre);
    formulario.append("categoria", borradorPrenda.categoria);
    formulario.append("talle", borradorPrenda.talle);
    formulario.append("temporada", borradorPrenda.temporada);
    formulario.append("ocasion", borradorPrenda.ocasion);
    formulario.append("genero", borradorPrenda.genero);
    formulario.append("estado", borradorPrenda.estado);
    formulario.append("privacidad", borradorPrenda.privacidad ? "1" : "0");
    formulario.append("colores", JSON.stringify(borradorPrenda.colores));
    formulario.append("estilos", JSON.stringify(borradorPrenda.estilos));
    formulario.append("imagen", borradorPrenda.imagen);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios.post("http://localhost:3000/api/prendas", formulario, config)
      .then((respuesta) => {
        const idPrenda = respuesta.data.id_prenda;
        const prendaGuardada = {
          ...borradorPrenda,
          ...datosAdicionales,
          id: idPrenda,
          imagen: `http://localhost:3000${respuesta.data.imagen}`,
        };

        if (datosAdicionales.tipoPublicacion === "venta") {
          return axios.post("http://localhost:3000/api/publicaciones/compra",
              {
                id_prenda: idPrenda,
                stock: Number(borradorPrenda.stock),
                precio_unitario: Number(borradorPrenda.precio),
              },
              config
            )
            .then((respuesta) => ({
              ...prendaGuardada,
              id: respuesta.data.id,
              idPrenda,
            }));
        }

        if (datosAdicionales.tipoPublicacion === "intercambio") {
          const categoriaIds = borradorPrenda.tiposAceptados
            .map((nombre) =>
              buscarId(categorias, "categoria", nombre, "id_categoria")
            )
            .filter((id) => id != null);
          const estadoTodos = borradorPrenda.estadoMinimo
            .trim()
            .toUpperCase() === "TODOS";
          const estadoId = estadoTodos
            ? null
            : buscarId(
                estados,
                "estado_prenda",
                borradorPrenda.estadoMinimo,
                "id_estado_prenda"
              );
          const talleId = buscarId(
            talles,
            "talla",
            borradorPrenda.talleBuscado,
            "id_talla"
          );

          if (!categoriaIds.length || !talleId || (!estadoId && !estadoTodos)) {
            throw new Error("No se pudieron identificar las opciones del intercambio");
          }

          return axios.post(
              "http://localhost:3000/api/publicaciones/intercambio",
              {
                id_prenda: idPrenda,
                estado_MA: estadoId,
                talle_buscado: talleId,
                categoriasAceptadas: categoriaIds,
              },
              config
            )
            .then((respuesta) => ({
              ...prendaGuardada,
              id: respuesta.data.id,
              idPrenda,
            }));
        }

        return prendaGuardada;
      })
      .then((prendaGuardada) => {
        if (datosAdicionales.tipoPublicacion) {
          onPublicacionCreada?.(prendaGuardada, prendaGuardada.id);
        } else {
          setPrendas((actuales) => [...actuales, prendaGuardada]);

          setCategoriasAbiertas((actuales) =>
            actuales.includes(prendaGuardada.categoria)
              ? actuales
              : [...actuales, prendaGuardada.categoria]
          );
        }

        cerrarAltaPrenda();
      })
      .catch((error) => {
        console.error(
          "Error al guardar:",
          error.response?.data || error.message || error
        );
      });
  };

  const guardarEdicion = () => {
    if (!prendaEnEdicion) return;
    const formulario = new FormData();
    formulario.append("nombre", borradorPrenda.nombre);
    formulario.append("categoria", borradorPrenda.categoria);
    formulario.append("talle", borradorPrenda.talle);
    formulario.append("temporada", borradorPrenda.temporada);
    formulario.append("ocasion", borradorPrenda.ocasion);
    formulario.append("genero", borradorPrenda.genero);
    formulario.append("estado", borradorPrenda.estado);
    formulario.append("privacidad", borradorPrenda.privacidad ? "1" : "0");
    formulario.append("colores", JSON.stringify(borradorPrenda.colores));
    formulario.append("estilos", JSON.stringify(borradorPrenda.estilos));

    if (borradorPrenda.imagen instanceof File) {
      formulario.append("imagen", borradorPrenda.imagen);
    }

    axios.put(`http://localhost:3000/api/prendas/${prendaEnEdicion.id}`,
        formulario,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((respuesta) => {
        const prendaActualizada = {
          ...prendaEnEdicion,
          ...borradorPrenda,
          id: prendaEnEdicion.id,
          tipoPublicacion: "prenda",
          imagen: respuesta.data.imagen || prendaEnEdicion.imagen,
        };
        setPrendas((actuales) =>
          actuales.map((prenda) =>
            prenda.id === prendaEnEdicion.id ? prendaActualizada : prenda
          )
        );
        cerrarAltaPrenda();
      })
      .catch((error) => {
        console.error(
          "Error al modificar la prenda:",
          error.response?.data || error
        );
      });
  };

  const confirmarEliminacion = () => {
    if (!prendaAEliminar) return;
    axios.delete(`http://localhost:3000/api/prendas/${prendaAEliminar.id}`,
        { headers: { Authorization: `Bearer ${token}` } })
      .then((respuesta) => {
        console.log("Prenda eliminada correctamente:", respuesta.data);
        setPrendas((actuales) =>
          actuales.filter((prenda) => prenda.id !== prendaAEliminar.id)
        );
        setPrendaAEliminar(null);
      })
      .catch((error) => {
        console.error(
          "Error al eliminar la prenda:",
          error.response?.data || error
        );
      });
  };

  return (
    <>
      <div
        className="MiArmario__otrasSecciones"
      >
        {categorias.map((categoria) => {
          const nombreCategoria = categoria.categoria;

          const prendasDeCategoria = prendas.filter(
            (prenda) => prenda.categoria === nombreCategoria
          );

          const abierta = categoriasAbiertas.includes(nombreCategoria);

          return (
            <section
              className={
                abierta
                  ? "MiArmario__seccion"
                  : "MiArmario__seccionCerrada"
              }
              key={nombreCategoria}
            >
              <div
                className={
                  abierta
                    ? "MiArmario__seccionEncabezado"
                    : "MiArmario__seccionCerradaEncabezado"
                }
              >
                <h2>{nombreCategoria}</h2>

                <span>
                  {prendasDeCategoria.length}{" "}
                  {nombreCategoria === "Accesorios"
                    ? "Accesorios"
                    : "Prendas"}
                </span>

                <button
                  className="MiArmario__seccionFlecha"
                  type="button"
                  aria-expanded={abierta}
                  onClick={() => alternarCategoria(nombreCategoria)}
                >
                  <span
                    className="material-symbols-outlined"
                    aria-hidden="true"
                  >
                    {abierta
                      ? "keyboard_arrow_up"
                      : "keyboard_arrow_down"}
                  </span>
                </button>
              </div>

              {abierta && (
                <div className="MiArmario__seccionContenido">
                  <div className="MiArmario__grilla">
                    {prendasDeCategoria.map((prenda) => (
                      <div
                        className="MiArmario__tarjetaPrenda"
                        key={prenda.id}
                        onClick={(evento) =>
                          manejarAccionTarjeta(evento, prenda)
                        }
                      >
                        <TarjetaPrenda
                          prenda={prenda}
                          mostrarOpciones
                          seleccionada={prendasOutfit.some(
                            (seleccionada) =>
                              seleccionada.id === prenda.id
                          )}
                          menuAbierto={menuAbiertoId === prenda.id}
                          clickable={false}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {crearPrendaAbierto &&
        (pasoCreacion === 1 ? (
          <CrearPrenda
            datos={borradorPrenda}
            categorias={categorias}
            talles={talles}
            temporadas={temporadas}
            ocasiones={ocasiones}
            generos={generos}
            estados={estados}
            colores={colores}
            estilos={estilos}
            onCambiar={cambiarDatoPrenda}
            mensajeError={errorCreacion}
            onContinuar={continuarDesdeDatos}
            onClose={cerrarAltaPrenda}
          />
        ) : pasoCreacion === 2 ? (
          <CrearPrenda2
            datos={borradorPrenda}
            estilosDisponibles={estilos}
            coloresDisponibles={colores}
            onCambiar={cambiarDatoPrenda}
            mensajeError={errorCreacion}
            onVolver={() => {
              setErrorCreacion("");
              setPasoCreacion(1);
            }}
            onSiguiente={continuarDesdeEstilos}
            onClose={cerrarAltaPrenda}
          />
        ) : borradorPrenda.tipoPublicacion === "venta" ? (
          <CrearPrenda3Venta
            datos={borradorPrenda}
            onCambiar={cambiarDatoPrenda}
            mensajeError={errorCreacion}
            onVolver={() => {
              setErrorCreacion("");
              setPasoCreacion(2);
            }}
            onGuardar={guardarVenta}
            onClose={cerrarAltaPrenda}
          />
        ) : (
          <CrearPrenda3Intercambio
            datos={borradorPrenda}
            categoriasDisponibles={categorias}
            onCambiar={cambiarDatoPrenda}
            talles={talles}
            mensajeError={errorCreacion}
            onVolver={() => {
              setErrorCreacion("");
              setPasoCreacion(2);
            }}
            onGuardar={guardarIntercambio}
            onClose={cerrarAltaPrenda}
          />
        ))}

      {prendaAEliminar && (
        <EliminarPrenda
          onConfirmar={confirmarEliminacion}
          onCancelar={() => setPrendaAEliminar(null)}
        />
      )}

      {crearOutfitAbierto && (
        <CrearOutfit
          prendas={prendasOutfit}
          onGuardar={(datos) => {
            if (!datos.temporada || !datos.ocasion || !datos.genero) {
              setErrorCreacion("Completá la temporada, ocasión y género.");
              return;
            }

            setErrorCreacion("");
            onOutfitCreado(datos);
            cerrarCrearOutfit();
          }}
          onClose={cerrarCrearOutfit}
          mensajeError={errorCreacion}
        />
      )}
    </>
  );
}
