import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./PublicacionesArmario.css";
import TarjetaVentaArmario from "../../../componentes/tarjetaVentaArmario/TarjetaVentaArmario";
import TarjetaIntercambioArmario from "../../../componentes/tarjetaIntercambioArmario/TarjetaIntercambioArmario";
import GestionarVentas from "./modales/Gestionar ventas/GestionarVentas";
import PropuestasDeIntercambio from "./modales/Propuestas de intercambio/PropuestasDeIntercambio";
import EliminarPublicacion from "./modales/eliminarPublicacion/EliminarPublicacion";
import CrearPrenda from "../misPrendas/mi modales/crear prenda/CrearPrenda";
import CrearPrenda2 from "../misPrendas/mi modales/crear prenda 2/CrearPrenda2";
import CrearPrenda3Venta from "../misPrendas/mi modales/crear prenda 3 venta/CrearPrenda3Venta";
import CrearPrenda3Intercambio from "../misPrendas/mi modales/crear prenda 3 intercambio/CrearPrenda3Intercambio";

const crearDatosEdicion = (publicacion, tipo) => {
  const datos = {
    tipoPublicacion: tipo,
    nombre: publicacion.nombre || "",
    descripcion: publicacion.descripcion || "",
    imagen: publicacion.imagen || "",
    categoria: publicacion.categoria || publicacion.prenda || "",
    talle: publicacion.talle || "M",
    temporada: publicacion.temporada || "",
    ocasion: publicacion.ocasion || "",
    genero: publicacion.genero || "",
    estado: publicacion.estado || "",
    privacidad: publicacion.privacidad ?? true,
    estilos: publicacion.estilos || [],
    colores:
      publicacion.colores ||
      (publicacion.color ? [publicacion.color] : []),
    precio:
      publicacion.precio == null
        ? ""
        : String(publicacion.precio),
    stock:
      publicacion.stock == null
        ? ""
        : String(publicacion.stock),
    tiposAceptados: publicacion.tiposAceptados || [],
    estadoMinimo:
      publicacion.estadoMinimo ||
      publicacion.estadoMinimoAceptado ||
      "TODOS",
    talleBuscado:
      publicacion.talleBuscado ||
      publicacion.talle_buscado ||
      "",
  };

  return {
    ...datos,
    tipo,
    id: publicacion.id,
    original: publicacion,
    valoresIniciales: { ...datos },
  };
};

export default function PublicacionesArmario({
  publicacionesCreadas = { venta: [], intercambio: [] },
  onPublicacionActualizada,
  abrirPropuestas = false,
  onPropuestasAbiertas,
}) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [publicacionesVenta, setPublicacionesVenta] = useState([]);
  const [publicacionesIntercambio, setPublicacionesIntercambio] =
    useState([]);

  const [ventaEnGestion, setVentaEnGestion] = useState(null);
  const [publicacionConPropuestas, setPublicacionConPropuestas] =
    useState(null);

  const [publicacionEnEdicion, setPublicacionEnEdicion] =
    useState(null);

  const [pasoEdicion, setPasoEdicion] = useState(1);
  const [errorEdicion, setErrorEdicion] = useState("");
  const [publicacionAEliminar, setPublicacionAEliminar] =
    useState(null);

  const [propuestasCargadas, setPropuestasCargadas] =
    useState(false);

  const recargarVentas = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    Promise.all([
      axios.get(
        "http://localhost:3000/api/publicaciones/compra/mis",
        config
      ),
      axios.get(
        "http://localhost:3000/api/ventas/contadores",
        config
      ),
    ])
      .then(([ventasRes, contadoresRes]) => {
        const contadores = contadoresRes.data.contadores || [];

        const ventas = (ventasRes.data.publicaciones || []).map((p) => {
          const contador = contadores.find(
            (item) => Number(item.idPublicacion) === Number(p.id)
          );

          return {
            ...p,
            imagen: p.imagen?.startsWith("http")
              ? p.imagen
              : `http://localhost:3000${p.imagen}`,
            solicitudes: [
              ...Array(
                Number(contador?.solicitudesPendientes || 0)
              ).fill({ estado: null }),
              ...Array(
                Number(contador?.ventas || 0)
              ).fill({ estado: "CONFIRMADO" }),
            ],
          };
        });

        setPublicacionesVenta(ventas);
      })
      .catch((error) => {
        console.error(
          "Error al actualizar las ventas:",
          error.response?.data || error.message
        );
      });
  };

  const [categorias, setCategorias] = useState([]);
  const [talles, setTalles] = useState([]);
  const [temporadas, setTemporadas] = useState([]);
  const [ocasiones, setOcasiones] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [estados, setEstados] = useState([]);
  const [colores, setColores] = useState([]);
  const [estilos, setEstilos] = useState([]);

  const cargarPropuestas = (publicaciones) => {
    return axios
      .get(
        "http://localhost:3000/api/propuestas/recibidas",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((respuesta) => {
        const datos = Array.isArray(respuesta.data)
          ? respuesta.data
          : [];
        const propuestas = datos.map((propuesta) => {
          const imagen = propuesta.imagen_ofrecida?.startsWith("http")
            ? propuesta.imagen_ofrecida
            : `http://localhost:3000${propuesta.imagen_ofrecida || ""}`;
          return {
            id: propuesta.id_propuesta,
            idPublicacion: propuesta.publicacion_intercambio,
            estado: propuesta.estado_propuesta,
            usuario: propuesta.usuario,
            mensaje: propuesta.mensaje,
            fecha: propuesta.fecha,
            imagen,
            producto: {
              id: propuesta.id_prenda_ofrecida,
              nombre: propuesta.prenda_ofrecida,
              imagen: propuesta.imagen_ofrecida?.startsWith("http")
                ? propuesta.imagen_ofrecida
                : `http://localhost:3000${propuesta.imagen_ofrecida || ""}`,
              privacidad: propuesta.privacidad_ofrecida,
              categoria: propuesta.categoria_ofrecida,
              talle: propuesta.talle_ofrecido,
              temporada: propuesta.temporada_ofrecida,
              estado: propuesta.estado_ofrecido,
              ocasion: propuesta.ocasion_ofrecida,
              genero: propuesta.genero_ofrecido,
              color: propuesta.color_ofrecido,
              codigoColor: propuesta.codigo_color_ofrecido,
              estilos: Array.isArray(propuesta.estilos_ofrecidos)
                ? propuesta.estilos_ofrecidos
                : typeof propuesta.estilos_ofrecidos === "string"
                  ? JSON.parse(propuesta.estilos_ofrecidos)
                  : [],
            },
          };
        });

        return publicaciones.map((publicacion) => ({
          ...publicacion,
          propuestas: propuestas.filter(
            (propuesta) =>
              Number(propuesta.idPublicacion) ===
              Number(publicacion.id)
          ),
        }));
      })
      .catch((error) => {
        console.error(
          "Error al cargar las propuestas:",
          error.response?.data || error.message
        );

        return publicaciones;
      });
  };

  useEffect(() => {
    if (!token) {
      setPropuestasCargadas(true);
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    Promise.all([
      axios.get(
        "http://localhost:3000/api/publicaciones/compra/mis",
        config
      ),
      axios.get(
        "http://localhost:3000/api/publicaciones/intercambio/mis",
        config
      ),
      axios.get(
        "http://localhost:3000/api/ventas/contadores",
        config
      ),
    ])
      .then(([ventasRes, intercambiosRes, contadoresRes]) => {
        const contadores = contadoresRes.data.contadores || [];

        const ventas = (
          ventasRes.data.publicaciones || []
        ).map((p) => {
          const contador = contadores.find(
            (item) =>
              Number(item.idPublicacion) === Number(p.id)
          );

          return {
            ...p,
            imagen: p.imagen?.startsWith("http")
              ? p.imagen
              : `http://localhost:3000${p.imagen}`,
            solicitudes: [
              ...Array(
                Number(contador?.solicitudesPendientes || 0)
              ).fill({ estado: null }),
              ...Array(
                Number(contador?.ventas || 0)
              ).fill({ estado: "CONFIRMADO" }),
            ],
          };
        });

        const intercambios = (
          Array.isArray(intercambiosRes.data)
            ? intercambiosRes.data
            : intercambiosRes.data.publicaciones || []
        ).map((p) => ({
          ...p,
          id: p.Id_publicacion_intercambio,
          idPrenda: p.id_prenda,
          imagen: p.imagen?.startsWith("http")
            ? p.imagen
            : `http://localhost:3000${p.imagen}`,
          propuestas: [],
          tiposAceptados: Array.isArray(p.tiposAceptados)
            ? p.tiposAceptados
            : p.tiposAceptados
              ? JSON.parse(p.tiposAceptados)
              : [],
        }));

        return cargarPropuestas(intercambios).then(
          (intercambiosConPropuestas) => {
            setPublicacionesVenta(ventas);
            setPublicacionesIntercambio(intercambiosConPropuestas);
          }
        );
      })
      .catch((error) => {
        console.error(
          "Error al cargar las publicaciones:",
          error.response?.data || error.message
        );
      })
      .finally(() => {
        setPropuestasCargadas(true);
      });
  }, []);

  useEffect(() => {
    if (!abrirPropuestas || !propuestasCargadas) return;
    const publicacion = publicacionesIntercambio.find(
      (publicacion) =>
        publicacion.propuestas?.some(
          (propuesta) =>
            propuesta.estado?.toLowerCase() === "pendiente"
        )
    );

    if (publicacion) {
      setPublicacionConPropuestas(publicacion.id);
    }

    onPropuestasAbiertas?.();
  }, [
    abrirPropuestas,
    propuestasCargadas,
    publicacionesIntercambio,
    onPropuestasAbiertas,
  ]);

  // REGISTRAR NUEVAS PUBLICACIONES
  useEffect(() => {
    setPublicacionesVenta((actuales) => {
      const nuevas = publicacionesCreadas.venta.filter(
        (nueva) =>
          !actuales.some(
            (actual) => String(actual.id) === String(nueva.id)
          )
      );

      return [...actuales, ...nuevas];
    });

    setPublicacionesIntercambio((actuales) => {
      const nuevas = publicacionesCreadas.intercambio.filter(
        (nueva) =>
          !actuales.some(
            (actual) => String(actual.id) === String(nueva.id)
          )
      );

      return [...actuales, ...nuevas];
    });
  }, [publicacionesCreadas]);

  // OBTENER FILTROS
  useEffect(() => {
    axios
      .get(
        "http://localhost:3000/api/filtros",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
  }, []);

  const cerrarEdicion = () => {
    setPublicacionEnEdicion(null);
    setPasoEdicion(1);
    setErrorEdicion("");
  };

  const iniciarEdicion = (publicacion, tipo) => {
    const datos = crearDatosEdicion(publicacion, tipo);

    if (tipo === "intercambio") {
      const talleEncontrado = talles.find(
        (talle) =>
          Number(talle.id_talla) ===
          Number(publicacion.talle_buscado)
      );

      datos.talleBuscado = talleEncontrado?.talla || "";
      datos.valoresIniciales.talleBuscado = datos.talleBuscado;
    }

    setPublicacionEnEdicion(datos);
    setPasoEdicion(1);
    setErrorEdicion("");
  };

  const actualizarCampoEdicion = (campo, valor) => {
    if (campo === "tipoPublicacion") return;

    setPublicacionEnEdicion((publicacion) => ({
      ...publicacion,
      [campo]: valor,
    }));

    setErrorEdicion("");
  };

  const continuarEdicion = () => {
    if (
      !publicacionEnEdicion.nombre.trim() ||
      !publicacionEnEdicion.imagen
    ) {
      setErrorEdicion(
        "Ingresá un nombre y seleccioná una imagen para continuar."
      );
      return;
    }

    setErrorEdicion("");
    setPasoEdicion(2);
  };

  const continuarEdicionDesdeEstilos = () => {
    if (
      publicacionEnEdicion.estilos.length === 0 &&
      publicacionEnEdicion.original.estilos?.length > 0
    ) {
      setErrorEdicion(
        "Seleccioná al menos un estilo para continuar."
      );
      return;
    }

    setErrorEdicion("");

    if (publicacionEnEdicion.tipoPublicacion === "prenda") {
      guardarEdicion();
    } else {
      setPasoEdicion(3);
    }
  };

  const valorGuardado = (campo, campoOriginal = campo) => {
    const cambio = publicacionEnEdicion[campo];
    const valorInicial = publicacionEnEdicion.valoresIniciales[campo];

    if (JSON.stringify(cambio) !== JSON.stringify(valorInicial)) {
      return cambio;
    }

    return (
      publicacionEnEdicion.original[campoOriginal] ?? cambio
    );
  };

  // GUARDAR EDICIÓN
  const guardarEdicion = () => {
    if (!publicacionEnEdicion) return;
    if (!token) {
      setErrorEdicion(
        "Tu sesión venció. Iniciá sesión nuevamente."
      );
      return;
    }
    const { tipo, original } = publicacionEnEdicion;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const categoria = valorGuardado("categoria");
    const colores = valorGuardado("colores");
    const estilos = valorGuardado("estilos");
    const imagen = valorGuardado("imagen");
    let datosIntercambio = null;
    if (tipo === "intercambio") {
      const estadoMinimo = valorGuardado(
        "estadoMinimo",
        "estadoMinimoAceptado"
      );

      const talleBuscado = valorGuardado("talleBuscado");
      const tiposAceptados = valorGuardado("tiposAceptados");

      const buscarId = (opciones, campo, valor) =>
        opciones.find(
          (opcion) =>
            String(opcion[campo]).toLowerCase() ===
            String(valor).toLowerCase()
        );

      const estadoSeleccionado =
        estadoMinimo === "TODOS"
          ? null
          : buscarId(
              estados,
              "estado_prenda",
              estadoMinimo
            );

      const talleSeleccionado = buscarId(
        talles,
        "talla",
        talleBuscado
      );

      const categoriasSeleccionadas = tiposAceptados.map(
        (nombre) =>
          buscarId(categorias, "categoria", nombre)?.id_categoria
      );

      if (
        (!estadoSeleccionado && estadoMinimo !== "TODOS") ||
        !talleSeleccionado
      ) {
        setErrorEdicion(
          "No se pudieron identificar el estado mínimo o el talle buscado."
        );
        return;
      }

      if (categoriasSeleccionadas.some((id) => !id)) {
        setErrorEdicion(
          "No se pudieron identificar todas las categorías aceptadas."
        );
        return;
      }

      datosIntercambio = {
        estado_MA: estadoSeleccionado?.id_estado_prenda ?? null,
        talle_buscado: talleSeleccionado.id_talla,
        categoriasAceptadas: categoriasSeleccionadas,
      };
    }

    const datosPrenda = new FormData();
    datosPrenda.append("nombre", valorGuardado("nombre"));
    datosPrenda.append("categoria", categoria);
    datosPrenda.append("talle", valorGuardado("talle"));
    datosPrenda.append("temporada", valorGuardado("temporada"));
    datosPrenda.append("ocasion", valorGuardado("ocasion"));
    datosPrenda.append("genero", valorGuardado("genero"));
    datosPrenda.append("estado", valorGuardado("estado"));

    datosPrenda.append(
      "privacidad",
      String(valorGuardado("privacidad"))
    );

    datosPrenda.append("colores", JSON.stringify(colores));
    datosPrenda.append("estilos", JSON.stringify(estilos));

    if (imagen instanceof File) {
      datosPrenda.append("imagen", imagen);
    }

    axios.put(
        `http://localhost:3000/api/prendas/${original.idPrenda}`,
        datosPrenda,
        config
      )
      .then(() => {
        if (tipo === "venta") {
          return axios.put(
            `http://localhost:3000/api/publicaciones/compra/${original.id}`,
            {
              precio_unitario: Number(
                valorGuardado("precio")
              ),
              stock: Number(valorGuardado("stock")),
            },
            config
          );
        }

        if (tipo === "intercambio") {
          return axios.put(
            `http://localhost:3000/api/publicaciones/intercambio/${original.id}`,
            datosIntercambio,
            config
          );
        }
      })
      .then(() => {
        const actualizada = {
          ...original,
          nombre: valorGuardado("nombre"),
          imagen:
            imagen instanceof File
              ? URL.createObjectURL(imagen)
              : original.imagen,
          categoria,
          prenda: categoria,
          talle: valorGuardado("talle"),
          temporada: valorGuardado("temporada"),
          ocasion: valorGuardado("ocasion"),
          genero: valorGuardado("genero"),
          estado: valorGuardado("estado"),
          privacidad: valorGuardado("privacidad"),
          colores,
          estilos,
        };

        if (tipo === "venta") {
          actualizada.precio = Number(
            valorGuardado("precio")
          );

          actualizada.stock = Number(
            valorGuardado("stock")
          );

          setPublicacionesVenta((items) =>
            items.map((item) =>
              item.id === original.id ? actualizada : item
            )
          );
        }

        if (tipo === "intercambio") {
          actualizada.tiposAceptados =
            valorGuardado("tiposAceptados");
          actualizada.estadoMinimoAceptado = valorGuardado(
            "estadoMinimo",
            "estadoMinimoAceptado"
          );

          actualizada.talleBuscado =
            valorGuardado("talleBuscado");

          setPublicacionesIntercambio((items) =>
            items.map((item) =>
              item.id === original.id ? actualizada : item
            )
          );
        }

        onPublicacionActualizada?.(actualizada, tipo);
        cerrarEdicion();
      })
      .catch((error) => {
        console.error(
          "Error al guardar la modificación:",
          error.response?.data || error
        );

        setErrorEdicion(
          error.response?.data?.mensaje ||
          "No se pudieron guardar los cambios. Intentá nuevamente."
        );
      });
  };

  const guardarVentaEditada = () => {
    const precio = Number(publicacionEnEdicion.precio);
    const stock = Number(publicacionEnEdicion.stock);
    const original = publicacionEnEdicion.original;

    if (
      (publicacionEnEdicion.precio !== "" ||
        original.precio != null) &&
      precio <= 0
    ) {
      setErrorEdicion("Ingresá un precio mayor a cero.");
      return;
    }

    if (
      (publicacionEnEdicion.stock !== "" ||
        original.stock != null) &&
      stock <= 0
    ) {
      setErrorEdicion(
        "Ingresá una cantidad de stock mayor a cero."
      );
      return;
    }

    guardarEdicion();
  };

  const guardarIntercambioEditado = () => {
    if (publicacionEnEdicion.tiposAceptados.length === 0) {
      setErrorEdicion(
        "Seleccioná al menos un tipo de prenda aceptado."
      );
      return;
    }

    guardarEdicion();
  };

  const eliminarPublicacion = (publicacion, tipo) =>
    setPublicacionAEliminar({ ...publicacion, tipo });

  // CONFIRMAR ELIMINACIÓN
  const confirmarEliminacion = () => {
    if (!publicacionAEliminar) return;

    if (!token) {
      console.error("Tu sesión venció. Iniciá sesión nuevamente.");
      return;
    }

    const tipo = publicacionAEliminar.tipo;
    const id = publicacionAEliminar.id;

    const ruta =
      tipo === "venta"
        ? `http://localhost:3000/api/publicaciones/compra/${id}`
        : `http://localhost:3000/api/publicaciones/intercambio/${id}`;

    axios
      .delete(ruta, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        if (tipo === "venta") {
          setPublicacionesVenta((publicaciones) =>
            publicaciones.filter(
              (publicacion) => publicacion.id !== id
            )
          );
        } else {
          setPublicacionesIntercambio((publicaciones) =>
            publicaciones.filter(
              (publicacion) => publicacion.id !== id
            )
          );
        }

        setPublicacionAEliminar(null);
      })
      .catch((error) => {
        console.error(
          "Error al eliminar la publicación:",
          error.response?.data || error.message
        );
      });
  };

  const guardarPropuestasPendientes = (publicacionId, propuestas) => {
    setPublicacionesIntercambio((publicaciones) =>
      publicaciones.map((publicacion) =>
        publicacion.id === publicacionId
          ? { ...publicacion, propuestas }
          : publicacion
      )
    );
  };

  const abrirDetallePropuesta = (propuesta) => {
    const prenda = propuesta?.producto;

    if (!prenda) {
      console.error(
        "No se encontraron los datos de la prenda ofrecida."
      );
      return;
    }

    navigate("/detalles/prenda", {
      state: { prenda },
    });
  };

  return (
    <section
      className="MiArmario__publicaciones"
      aria-label="Mis publicaciones"
    >
      <div className="MiArmario__panelPublicaciones">
        <header className="MiArmario__encabezadoPublicaciones">
          <h2>
            <span
              className="material-symbols-outlined"
              aria-hidden="true"
            >
              autorenew
            </span>
            Intercambio
          </h2>

          <span>
            {publicacionesIntercambio.length} Publicaciones
          </span>
        </header>

        <div className="MiArmario__listaPublicaciones">
          {publicacionesIntercambio.map((publicacion) => (
            <TarjetaIntercambioArmario
              key={publicacion.id}
              {...publicacion}
              propuestas={publicacion.propuestas.filter(
                (propuesta) =>
                  propuesta.estado?.toLowerCase() === "pendiente"
              ).length}
              onVerPropuestas={() =>
                setPublicacionConPropuestas(publicacion.id)
              }
              onModificar={() =>
                iniciarEdicion(publicacion, "intercambio")
              }
              onEliminar={() =>
                eliminarPublicacion(publicacion, "intercambio")
              }
            />
          ))}
        </div>
      </div>

      <div className="MiArmario__panelPublicaciones">
        <header className="MiArmario__encabezadoPublicaciones">
          <h2>
            <span
              className="material-symbols-outlined"
              aria-hidden="true"
            >
              shopping_basket
            </span>
            Venta
          </h2>

          <span>
            {publicacionesVenta.length} Publicaciones
          </span>
        </header>

        <div className="MiArmario__listaPublicaciones">
          {publicacionesVenta.map((publicacion) => {
            const ventasConfirmadas = publicacion.solicitudes.filter(
              (solicitud) =>
                ["CONFIRMADO", "COMPLETADO"].includes(
                  (solicitud.estado || "").toUpperCase()
                )
            ).length;

            const solicitudesPendientes = publicacion.solicitudes.filter(
              (solicitud) => solicitud.estado === null
            ).length;

            return (
              <TarjetaVentaArmario
                key={publicacion.id}
                {...publicacion}
                ventas={ventasConfirmadas}
                solicitudesPendientes={solicitudesPendientes}
                onGestionarVentas={() =>
                  setVentaEnGestion(publicacion.id)
                }
                onModificar={() =>
                  iniciarEdicion(publicacion, "venta")
                }
                onEliminar={() =>
                  eliminarPublicacion(publicacion, "venta")
                }
              />
            );
          })}
        </div>
      </div>

      {ventaEnGestion !== null &&
        (() => {
          const publicacion = publicacionesVenta.find(
            (item) => item.id === ventaEnGestion
          );

          return (
            publicacion && (
              <GestionarVentas
                key={publicacion.id}
                idPublicacion={publicacion.id}
                onSaved={recargarVentas}
                onClose={() => setVentaEnGestion(null)}
              />
            )
          );
        })()}

      {publicacionConPropuestas !== null &&
        (() => {
          const publicacion = publicacionesIntercambio.find(
            (item) => item.id === publicacionConPropuestas
          );

          return (
            publicacion && (
              <PropuestasDeIntercambio
                key={publicacion.id}
                propuestas={publicacion.propuestas}
                onGuardar={(propuestas) =>
                  guardarPropuestasPendientes(
                    publicacion.id,
                    propuestas
                  )
                }
                onVerDetalle={abrirDetallePropuesta}
                onClose={() => setPublicacionConPropuestas(null)}
              />
            )
          );
        })()}

      {publicacionAEliminar && (
        <EliminarPublicacion
          onConfirmar={confirmarEliminacion}
          onCancelar={() => setPublicacionAEliminar(null)}
        />
      )}

      {publicacionEnEdicion &&
        (pasoEdicion === 1 ? (
          <CrearPrenda
            datos={publicacionEnEdicion}
            categorias={categorias}
            talles={talles}
            temporadas={temporadas}
            ocasiones={ocasiones}
            generos={generos}
            estados={estados}
            onCambiar={actualizarCampoEdicion}
            mensajeError={errorEdicion}
            onContinuar={continuarEdicion}
            onClose={cerrarEdicion}
          />
        ) : pasoEdicion === 2 ? (
          <CrearPrenda2
            datos={publicacionEnEdicion}
            estilosDisponibles={estilos}
            coloresDisponibles={colores}
            onCambiar={actualizarCampoEdicion}
            mensajeError={errorEdicion}
            onVolver={() => {
              setErrorEdicion("");
              setPasoEdicion(1);
            }}
            onSiguiente={continuarEdicionDesdeEstilos}
            onClose={cerrarEdicion}
          />
        ) : publicacionEnEdicion.tipoPublicacion === "venta" ? (
          <CrearPrenda3Venta
            datos={publicacionEnEdicion}
            onCambiar={actualizarCampoEdicion}
            mensajeError={errorEdicion}
            onVolver={() => {
              setErrorEdicion("");
              setPasoEdicion(2);
            }}
            onGuardar={guardarVentaEditada}
            onClose={cerrarEdicion}
          />
        ) : publicacionEnEdicion.tipoPublicacion === "intercambio" ? (
          <CrearPrenda3Intercambio
            datos={publicacionEnEdicion}
            categoriasDisponibles={categorias}
            talles={talles}
            onCambiar={actualizarCampoEdicion}
            mensajeError={errorEdicion}
            onVolver={() => {
              setErrorEdicion("");
              setPasoEdicion(2);
            }}
            onGuardar={guardarIntercambioEditado}
            onClose={cerrarEdicion}
          />
        ) : null)}
    </section>
  );
}