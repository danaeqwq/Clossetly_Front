import { useEffect, useState } from "react";
import axios from "axios";
import "./PrendasArmario.css";
import TarjetaPrenda from "../../../componentes/tarjetaPrenda/TarjetaPrenda";
import CrearOutfit from "./mi modales/crear oufit/CrearOutfit";
import CrearPrenda from "./mi modales/crear prenda/CrearPrenda";
import CrearPrenda2 from "./mi modales/crear prenda 2/CrearPrenda2";
import CrearPrenda3Venta from "./mi modales/crear prenda 3 venta/CrearPrenda3Venta";
import CrearPrenda3Intercambio from "./mi modales/crear prenda 3 intercambio/CrearPrenda3Intercambio";
import EliminarPrenda from "./mi modales/eliminarPrenda/EliminarPrenda";

const clavePrenda = (prenda) => prenda.claveArmario || `prenda-${prenda.id}`;

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

export default function PrendasArmario({ onPublicacionCreada, prendasConvertidas = [], onAccionesChange, onOutfitCreado }) {

  useEffect(() => {
    obtenerPrendas();
  }, []);

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

  const iniciarSeleccionOutfit = (prenda) => {
    setPrendasOutfit([prenda]);
    setCategoriasAbiertas(
      categorias.map((categoria) => categoria.categoria)
    );
    setModoSeleccionOutfit(true);
  };

  const alternarSeleccionPrenda = (prenda) => {
    setPrendasOutfit((actuales) => actuales.some((seleccionada) => clavePrenda(seleccionada) === clavePrenda(prenda))
      ? actuales.filter((seleccionada) => clavePrenda(seleccionada) !== clavePrenda(prenda))
      : [...actuales, prenda]);
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

  const guardarNuevoOutfit = (datos) => {
    onOutfitCreado?.(datos);
    cerrarCrearOutfit();
  };

  function abrirAltaPrenda() {
    setBorradorPrenda({ ...borradorInicial });
    setPasoCreacion(1);
    setCrearPrendaAbierto(true);
    setErrorCreacion("");
  }

  useEffect(() => {
    setPrendas((actuales) => {
      const ids = new Set(actuales.map(clavePrenda));
      const nuevas = prendasConvertidas.filter((prenda) => !ids.has(clavePrenda(prenda)));
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
    setCategoriasAbiertas((actuales) => (
      actuales.includes(nombre)
        ? actuales.filter((categoria) => categoria !== nombre)
        : [...actuales, nombre]
    ));
  };

  const manejarAccionTarjeta = (evento, prenda) => {
    const botonOpciones = evento.target.closest(".TarjetaPrenda__opciones");
    if (botonOpciones) {
      setMenuAbiertoId((actual) => actual === clavePrenda(prenda) ? null : clavePrenda(prenda));
      return;
    }

    const opcion = evento.target.closest(".TarjetaPrenda__menu li");
    if (!opcion) {
      if (modoSeleccionOutfit && !botonOpciones) alternarSeleccionPrenda(prenda);
      return;
    }

    const icono = opcion.querySelector(".material-symbols-outlined")?.textContent.trim();
    setMenuAbiertoId(null);

    if (icono === "edit") {
      iniciarEdicionPrenda(prenda);
    } else if (icono === "checkroom") {
      iniciarSeleccionOutfit(prenda);
    } else if (icono === "delete_outline") {
      setPrendaAEliminar(prenda);
    }
  };


  const iniciarEdicionPrenda = (prenda) => {
    setPrendaEnEdicion({ ...prenda });

    setBorradorPrenda({
      ...borradorInicial,
      ...prenda,
      tipoPublicacion: "prenda",
      estilos: Array.isArray(prenda.estilos) ? prenda.estilos : [],
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
    if (
      !borradorPrenda.nombre.trim() ||
      !borradorPrenda.imagen
    ) {
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
    if (!borradorPrenda.estilos || borradorPrenda.estilos.length === 0) {
      setErrorCreacion("Seleccioná al menos un estilo para continuar.");
      return;
    }

    setErrorCreacion("");

    if (prendaEnEdicion && borradorPrenda.tipoPublicacion === "prenda") {
      guardarEdicion();
    } else if (!prendaEnEdicion && borradorPrenda.tipoPublicacion === "prenda") {
      guardarNuevaPrenda();
    } else {
      setPasoCreacion(3);
    }
  };

  const guardarVenta = () => {
    if (Number(borradorPrenda.precio) <= 0 || Number(borradorPrenda.stock) <= 0) {
      setErrorCreacion("Ingresá un precio y una cantidad de stock mayores a cero.");
      return;
    }
    if (prendaEnEdicion) guardarTipoPublicacion("venta");
    else guardarNuevaPrenda({ tipoPublicacion: "venta" });
  };

  const guardarIntercambio = () => {
    if (borradorPrenda.tiposAceptados.length === 0) {
      setErrorCreacion("Seleccioná al menos un tipo de prenda aceptado.");
      return;
    }

    if (prendaEnEdicion) guardarTipoPublicacion("intercambio");
    else guardarNuevaPrenda({ tipoPublicacion: "intercambio" });
  };

  const [categorias, setCategorias] = useState([]);
  const [talles, setTalles] = useState([]);
  const [temporadas, setTemporadas] = useState([]);
  const [ocasiones, setOcasiones] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [estados, setEstados] = useState([]);
  const [colores, setColores] = useState([]);
  const [estilos, setEstilos] = useState([]);


  useEffect(() => {
    const obtenerFiltros = async () => {
      const token = localStorage.getItem("token");

      try {
        const respuesta = await axios.get(
          "http://localhost:3000/api/filtros",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCategorias(respuesta.data.categorias || []);
        setTalles(respuesta.data.talles || []);
        setTemporadas(respuesta.data.temporadas || []);
        setOcasiones(respuesta.data.ocasiones || []);
        setGeneros(respuesta.data.generos || []);
        setEstados(respuesta.data.estados || []);
        setColores(respuesta.data.colores || []);
        setEstilos(respuesta.data.estilos || []);

      } catch (error) {
        console.error(
          "Error al obtener los filtros:",
          error.response?.data || error
        );
      }
    };

    obtenerFiltros();
  }, []);



  const guardarTipoPublicacion = (tipoPublicacion) => {
    const actualizada = {
      ...prendaEnEdicion,
      ...borradorPrenda,
      id: prendaEnEdicion.id,
      tipoPublicacion,
      nombre: borradorPrenda.nombre.trim() || prendaEnEdicion.nombre,
      alt: borradorPrenda.nombre.trim() || prendaEnEdicion.alt || prendaEnEdicion.nombre,
    };
    setPrendas((actuales) => actuales.filter((prenda) => clavePrenda(prenda) !== clavePrenda(prendaEnEdicion)));
    onPublicacionCreada?.(actualizada, prendaEnEdicion.id);
    cerrarAltaPrenda();
  };

  const obtenerPrendas = async () => {
    const token = localStorage.getItem("token");

    try {
      const respuesta = await axios.get(
        "http://localhost:3000/api/prendas",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPrendas(respuesta.data.prendas || []);

    } catch (error) {
      console.error("Error al obtener las prendas:", error);
      console.log("Respuesta del backend:", error.response?.data);
    }
  };



  const guardarNuevaPrenda = async (datosAdicionales = {}) => {
    const token = localStorage.getItem("token");

    try {
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

      // 1. Guardar la prenda
      const respuesta = await axios.post(
        "http://localhost:3000/api/prendas",
        formulario,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const idPrenda = respuesta.data.id_prenda;

      if (!idPrenda) {
        throw new Error("No se recibió el ID de la prenda");
      }

      const prendaGuardada = {
        ...borradorPrenda,
        ...datosAdicionales,
        id: idPrenda,
        imagen: respuesta.data.imagen
          ? `http://localhost:3000${respuesta.data.imagen}`
          : "",
      };

      // 2. Crear publicación de venta
      if (datosAdicionales.tipoPublicacion === "venta") {
        const respuestaPublicacion = await axios.post(
          "http://localhost:3000/api/publicaciones/compra",
          {
            id_prenda: idPrenda,
            stock: Number(borradorPrenda.stock),
            precio_unitario: Number(borradorPrenda.precio),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        onPublicacionCreada?.({
          ...prendaGuardada,
          id: respuestaPublicacion.data.id,
          idPrenda,
        });
      }

      // 3. Crear publicación de intercambio
      else if (datosAdicionales.tipoPublicacion === "intercambio") {
        const categoriaIds = borradorPrenda.tiposAceptados
          .map((nombre) =>
            categorias.find((categoria) => categoria.categoria === nombre)
              ?.id_categoria
          )
          .filter((id) => id !== undefined);

        const estadoSeleccionado = estados.find(
          (estado) => estado.estado_prenda === borradorPrenda.estadoMinimo
        );

        const talleSeleccionado = talles.find(
          (talle) => talle.talla === borradorPrenda.talleBuscado
        );

        if (
          !categoriaIds.length ||
          !talleSeleccionado ||
          (!estadoSeleccionado && borradorPrenda.estadoMinimo !== "TODOS")
        ) {
          throw new Error("No se pudieron identificar las opciones del intercambio");
        }

        const respuestaPublicacion = await axios.post(
          "http://localhost:3000/api/publicaciones/intercambio",
          {
            id_prenda: idPrenda,
            estado_MA: estadoSeleccionado?.id_estado_prenda ?? null,
            talle_buscado: talleSeleccionado.id_talla,
            categoriasAceptadas: categoriaIds,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        onPublicacionCreada?.({
          ...prendaGuardada,
          id: respuestaPublicacion.data.id,
          idPrenda,
        });
      }

      // 4. Guardar solamente como prenda normal
      else {
        setPrendas((actuales) => [...actuales, prendaGuardada]);
        setCategoriasAbiertas((actuales) => ({
          ...actuales,
          [prendaGuardada.categoria]: true,
        }));
      }

      cerrarAltaPrenda();

    } catch (error) {
      console.error(
        "Error al guardar:",
        error.response?.data || error.message || error
      );
    }
  };


  const guardarEdicion = async () => {
    if (!prendaEnEdicion) return;

    const token = localStorage.getItem("token");

    try {
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

      // Solo enviar imagen si se seleccionó una nueva
      if (borradorPrenda.imagen instanceof File) {
        formulario.append("imagen", borradorPrenda.imagen);
      }

      const respuesta = await axios.put(
        `http://localhost:3000/api/prendas/${prendaEnEdicion.id}`,
        formulario,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const prendaActualizada = {
        ...prendaEnEdicion,
        ...borradorPrenda,
        id: prendaEnEdicion.id,
        tipoPublicacion: "prenda",
        imagen: respuesta.data.imagen || prendaEnEdicion.imagen,
      };

      setPrendas((actuales) =>
        actuales.map((prenda) =>
          clavePrenda(prenda) === clavePrenda(prendaEnEdicion)
            ? prendaActualizada
            : prenda
        )
      );

      cerrarAltaPrenda();

    } catch (error) {
      console.error(
        "Error al modificar la prenda:",
        error.response?.data || error
      );
    }
  };


  const confirmarEliminacion = async () => {
    if (!prendaAEliminar) return;

    const token = localStorage.getItem("token");

    try {
      const respuesta = await axios.delete(
        `http://localhost:3000/api/prendas/${prendaAEliminar.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Prenda eliminada correctamente:", respuesta.data);

      setPrendas((actuales) =>
        actuales.filter(
          (prenda) =>
            clavePrenda(prenda) !== clavePrenda(prendaAEliminar)
        )
      );

      setPrendaAEliminar(null);

    } catch (error) {
      console.error("Error al eliminar la prenda:", error.response?.data || error);
    }
  };


  return (
    <>
      <div className="MiArmario__otrasSecciones" aria-label="Categorías de prendas">
        {categorias.map((categoria) => {
          const nombreCategoria = categoria.categoria;

          const prendasDeCategoria = prendas.filter(
            (prenda) => prenda.categoria === nombreCategoria
          );

          const abierta = categoriasAbiertas.includes(nombreCategoria);

          return (
            <section
              className={abierta ? "MiArmario__seccion" : "MiArmario__seccionCerrada"}
              aria-label={nombreCategoria}
              key={nombreCategoria}
            >
              <div className={abierta ? "MiArmario__seccionEncabezado" : "MiArmario__seccionCerradaEncabezado"}>
                <h2>{nombreCategoria}</h2>

                <span>
                  {prendasDeCategoria.length} {nombreCategoria === "Accesorios" ? "Accesorios" : "Prendas"}
                </span>

                <button
                  className="MiArmario__seccionFlecha"
                  type="button"
                  aria-label={`${abierta ? "Contraer" : "Expandir"} ${nombreCategoria}`}
                  aria-expanded={abierta}
                  onClick={() => alternarCategoria(nombreCategoria)}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    {abierta ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                  </span>
                </button>
              </div>

              {abierta && (
                <div className="MiArmario__seccionContenido">
                  <div className="MiArmario__grilla">
                    {prendasDeCategoria.map((prenda) => (
                      <div
                        className="MiArmario__tarjetaPrenda"
                        key={clavePrenda(prenda)}
                        onClick={(evento) => manejarAccionTarjeta(evento, prenda)}
                      >
                        <TarjetaPrenda
                          prenda={prenda}
                          mostrarOpciones
                          seleccionada={prendasOutfit.some(
                            (seleccionada) => clavePrenda(seleccionada) === clavePrenda(prenda)
                          )}
                          menuAbierto={menuAbiertoId === clavePrenda(prenda)}
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

      {crearPrendaAbierto && (
        pasoCreacion === 1 ? (
          <CrearPrenda
            datos={borradorPrenda}
            categorias={categorias}
            talles={talles}
            temporadas={temporadas}
            ocasiones={ocasiones}
            generos={generos}
            estados={estados}
            onCambiar={cambiarDatoPrenda}
            mensajeError={errorCreacion}
            onContinuar={continuarDesdeDatos}
            onClose={cerrarAltaPrenda}
          />
        ) : pasoCreacion === 2 ? (
          <CrearPrenda2
            datos={borradorPrenda}
            colores={colores}
            estilos={estilos}
            onCambiar={cambiarDatoPrenda}
            mensajeError={errorCreacion}
            onVolver={() => { setErrorCreacion(""); setPasoCreacion(1); }}
            onSiguiente={continuarDesdeEstilos}
            onClose={cerrarAltaPrenda}
          />
        ) : borradorPrenda.tipoPublicacion === "venta" ? (
          <CrearPrenda3Venta
            datos={borradorPrenda}
            onCambiar={cambiarDatoPrenda}
            mensajeError={errorCreacion}
            onVolver={() => { setErrorCreacion(""); setPasoCreacion(2); }}
            onGuardar={guardarVenta}
            onClose={cerrarAltaPrenda}
          />
        ) : (
          <CrearPrenda3Intercambio
            datos={borradorPrenda}
            onCambiar={cambiarDatoPrenda}
            mensajeError={errorCreacion}
            onVolver={() => { setErrorCreacion(""); setPasoCreacion(2); }}
            onGuardar={guardarIntercambio}
            onClose={cerrarAltaPrenda}
          />
        )
      )}

      {prendaAEliminar && (
        <EliminarPrenda
          onConfirmar={confirmarEliminacion}
          onCancelar={() => setPrendaAEliminar(null)}
        />
      )}
      {crearOutfitAbierto && (
        <CrearOutfit prendas={prendasOutfit} onGuardar={guardarNuevoOutfit} onClose={cerrarCrearOutfit} />
      )}
    </>
  );
}
