<<<<<<< Updated upstream
=======
import axios from "axios";
>>>>>>> Stashed changes
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import "./PublicacionesArmario.css";
import TarjetaVentaArmario from "../../../componentes/tarjetaVentaArmario/TarjetaVentaArmario";
import TarjetaIntercambioArmario from "../../../componentes/tarjetaIntercambioArmario/TarjetaIntercambioArmario";
import GestionarVentas from "./modales/Gestionar ventas/GestionarVentas";
import PropuestasDeIntercambio from "./modales/Propuestas de intercambio/PropuestasDeIntercambio";
import EliminarPublicacion from "./modales/eliminarPublicacion/EliminarPublicacion";
import ropaEjemplo from "../../../assets/Ropa__ejemplo.jpg";
import ropaUno from "../../../assets/ropa1.jpg";
import CrearPrenda from "../misPrendas/mi modales/crear prenda/CrearPrenda";
import CrearPrenda2 from "../misPrendas/mi modales/crear prenda 2/CrearPrenda2";
import CrearPrenda3Venta from "../misPrendas/mi modales/crear prenda 3 venta/CrearPrenda3Venta";
import CrearPrenda3Intercambio from "../misPrendas/mi modales/crear prenda 3 intercambio/CrearPrenda3Intercambio";

const avatarEjemplo = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&h=96&q=80";
const claveRegistro = (registro, tipo) => registro.claveArmario || `${tipo}-${registro.id}`;

const normalizarCategoria = (categoria) => {
  const categorias = ["Remeras", "Pantalones", "Cortos", "Camperas", "Accesorios", "Zapatos"];
  return categorias.find((opcion) => opcion.toLowerCase() === String(categoria || "").toLowerCase())
    || categorias.find((opcion) => opcion.toLowerCase().startsWith(String(categoria || "").toLowerCase()))
    || "Remeras";
};

const normalizarOpcion = (valor, opciones, predeterminado) => {
  const texto = String(valor || "").toLowerCase();
  return opciones.find((opcion) => opcion.toLowerCase() === texto)
    || opciones.find((opcion) => texto.includes(opcion.toLowerCase()))
    || predeterminado;
};

const crearDatosEdicion = (publicacion, tipo) => {
  const datos = {
    tipoPublicacion: tipo,
    nombre: publicacion.nombre || "",
    descripcion: publicacion.descripcion || "",
    imagen: publicacion.imagen || "",
    categoria: normalizarCategoria(publicacion.categoria || publicacion.prenda),
    talle: publicacion.talle || "M",
    temporada: normalizarOpcion(publicacion.temporada, ["PRIMAVERA", "VERANO", "OTOÑO", "INVIERNO"], "PRIMAVERA"),
    ocasion: normalizarOpcion(publicacion.ocasion, ["CASUAL", "FORMAL", "FIESTA", "DEPORTE"], "FORMAL"),
    genero: normalizarOpcion(publicacion.genero, ["UNISEX", "MUJER", "HOMBRE"], "UNISEX"),
    estado: normalizarOpcion(publicacion.estado, ["NUEVA CON ETIQUETA", "NUEVA SIN ETIQUETA", "COMO NUEVA", "MUY BUEN ESTADO", "BUEN ESTADO"], "NUEVA CON ETIQUETA"),
    privacidad: publicacion.privacidad ?? true,
    estilos: publicacion.estilos || [],
<<<<<<< Updated upstream
    colores: publicacion.colores || [],
=======
    colores: publicacion.colores || (publicacion.color ? [publicacion.color] : []),
>>>>>>> Stashed changes
    precio: publicacion.precio == null ? "" : String(publicacion.precio),
    stock: publicacion.stock == null ? "" : String(publicacion.stock),
    tiposAceptados: publicacion.tiposAceptados || [],
    estadoMinimo: normalizarOpcion(publicacion.estadoMinimo || publicacion.estadoMinimoAceptado, ["TODOS", "NUEVA CON ETIQUETA", "NUEVA SIN ETIQUETA", "COMO NUEVA", "MUY BUEN ESTADO", "BUEN ESTADO"], "TODOS"),
<<<<<<< Updated upstream
    talleBuscado: publicacion.talleBuscado || "M",
=======
    talleBuscado: publicacion.talleBuscado || publicacion.talle_buscado || "",
>>>>>>> Stashed changes
  };
  return { ...datos, tipo, id: publicacion.id, original: publicacion, valoresIniciales: { ...datos } };
};

const mismoValor = (a, b) => JSON.stringify(a) === JSON.stringify(b);

<<<<<<< Updated upstream
const publicacionesVentaIniciales = [
  {
    id: 1,
    nombre: "Abrigo Nocturne",
    imagen: ropaEjemplo,
    stock: 2,
    solicitudes: [
      { id: "venta-1-1", usuario: "@uwu", estado: "CONFIRMADO", avatar: avatarEjemplo, telefono:"542901535032" },
      { id: "venta-1-2", usuario: "@lol", estado: "EN CONTACTO", avatar: avatarEjemplo, telefono:"542901535032" },
      { id: "venta-1-3", usuario: "@dani", estado: "EN CONTACTO", avatar: avatarEjemplo, telefono:"542901535032" },
    ],
  },
  {
    id: 2,
    nombre: "Remera rayada",
    imagen: ropaUno,
    stock: 2,
    solicitudes: [
      { id: "venta-2-1", usuario: "@mora", estado: "CONFIRMADO", avatar: avatarEjemplo, telefono:"542901535032"},
      { id: "venta-2-2", usuario: "@luz", estado: "CONFIRMADO", avatar: avatarEjemplo, telefono:"542901535032" },
      { id: "venta-2-3", usuario: "@sol", estado: "EN CONTACTO", avatar: avatarEjemplo, telefono:"542901535032" },
    ],
  },
];

const publicacionesIntercambioIniciales = [
  {
    id: 1,
    tipo: "intercambio",
    nombre: "Abrigo Nocturne",
    imagen: ropaEjemplo,
    talle: "M",
    temporada: "otoño / invierno",
    prenda: "Campera",
    estilos: ["Urbano", "Vintage"],
    estado: "Muy buen estado",
    genero: "Mujer",
    tiposAceptados: ["Remeras", "Camperas"],
    estadoMinimoAceptado: "Buen estado",
    colores: ["bordo", "negro"],
    propuestas: [
      {
        id: "propuesta-1-1",
        usuario: "@mila",
        estado: "PENDIENTE",
        imagen: ropaUno,
        producto: {
          id: "prenda-propuesta-1",
          tipo: "intercambio",
          nombre: "Remera estampada",
          imagen: ropaUno,
          temporada: "primavera / verano",
          prenda: "Remera",
          estilos: ["Casual", "Vintage"],
          estado: "Buen estado",
          genero: "Mujer",
          tiposAceptados: ["Camperas", "Pantalones"],
          estadoMinimoAceptado: "Buen estado",
          colores: ["rosa", "blanco"],
          talle: "M",
        },
      },
      {
        id: "propuesta-1-2",
        usuario: "@sol",
        estado: "PENDIENTE",
        imagen: ropaEjemplo,
        producto: {
          id: "prenda-propuesta-2",
          tipo: "intercambio",
          nombre: "Vestido estampado",
          imagen: ropaEjemplo,
          temporada: "verano",
          prenda: "Vestido",
          estilos: ["Boho"],
          estado: "Como nuevo",
          genero: "Mujer",
          tiposAceptados: ["Camperas"],
          estadoMinimoAceptado: "Como nuevo",
          colores: ["naranja", "verde"],
          talle: "S",
        },
      },
    ],
  },
  {
    id: 2,
    tipo: "intercambio",
    nombre: "Remera rayada",
    imagen: ropaUno,
    talle: "S",
    temporada: "primavera / verano",
    prenda: "Remera",
    estilos: ["Casual"],
    estado: "Buen estado",
    genero: "Mujer",
    tiposAceptados: ["Camperas", "Vestidos"],
    estadoMinimoAceptado: "Buen estado",
    colores: ["rosa", "blanco"],
    propuestas: [
      {
        id: "propuesta-2-1",
        usuario: "@dani",
        estado: "PENDIENTE",
        imagen: ropaEjemplo,
        producto: {
          id: "prenda-propuesta-3",
          tipo: "intercambio",
          nombre: "Abrigo estampado",
          imagen: ropaEjemplo,
          temporada: "otoño / invierno",
          prenda: "Abrigo",
          estilos: ["Urbano"],
          estado: "Muy buen estado",
          genero: "Mujer",
          tiposAceptados: ["Remeras"],
          estadoMinimoAceptado: "Buen estado",
          colores: ["bordo"],
          talle: "M",
        },
      },
    ],
  },
];

export default function PublicacionesArmario({ publicacionesCreadas = { venta: [], intercambio: [] }, onPublicacionActualizada, onPublicacionConvertida, onPublicacionConvertidaAPrenda }) {
  const navigate = useNavigate();
  const [publicacionesVenta, setPublicacionesVenta] = useState(() => [
    ...publicacionesVentaIniciales,
    ...publicacionesCreadas.venta,
  ]);
  const [publicacionesIntercambio, setPublicacionesIntercambio] = useState(() => [
    ...publicacionesIntercambioIniciales,
    ...publicacionesCreadas.intercambio,
  ]);
=======
export default function PublicacionesArmario({ publicacionesCreadas = { venta: [], intercambio: [] }, onPublicacionActualizada, onPublicacionConvertida, onPublicacionConvertidaAPrenda }) {
  const navigate = useNavigate();
  const [publicacionesVenta, setPublicacionesVenta] = useState([]);
  const [publicacionesIntercambio, setPublicacionesIntercambio] = useState([]);
>>>>>>> Stashed changes
  const [ventaEnGestion, setVentaEnGestion] = useState(null);
  const [publicacionConPropuestas, setPublicacionConPropuestas] = useState(null);
  const [publicacionEnEdicion, setPublicacionEnEdicion] = useState(null);
  const [pasoEdicion, setPasoEdicion] = useState(1);
  const [errorEdicion, setErrorEdicion] = useState("");
  const [publicacionAEliminar, setPublicacionAEliminar] = useState(null);
  const publicacionesRecibidas = useRef(new Set([
    ...publicacionesCreadas.venta.map((publicacion) => `venta-${publicacion.id}`),
    ...publicacionesCreadas.intercambio.map((publicacion) => `intercambio-${publicacion.id}`),
  ]));

<<<<<<< Updated upstream
=======
  const [categorias, setCategorias] = useState([]);
  const [talles, setTalles] = useState([]);
  const [temporadas, setTemporadas] = useState([]);
  const [ocasiones, setOcasiones] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [estados, setEstados] = useState([]);
  const [colores, setColores] = useState([]);
  const [estilos, setEstilos] = useState([]);

  useEffect(() => {
    const cargarPublicaciones = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [ventasRes, intercambiosRes] = await Promise.all([
          axios.get(
            "http://localhost:3000/api/publicaciones/compra/mis",
            config
          ),
          axios.get(
            "http://localhost:3000/api/publicaciones/intercambio/mis",
            config
          ),
        ]);

        const ventas = (ventasRes.data.publicaciones || []).map((p) => ({
          ...p,
          imagen: p.imagen?.startsWith("http")
            ? p.imagen
            : `http://localhost:3000${p.imagen}`,
          solicitudes: [],
        }));

        const intercambios = (Array.isArray(intercambiosRes.data)
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

        setPublicacionesVenta(ventas);
        setPublicacionesIntercambio(intercambios);
      } catch (error) {
        console.error(
          "Error al cargar las publicaciones:",
          error.response?.data || error.message
        );
      }
    };

    cargarPublicaciones();
  }, []);

>>>>>>> Stashed changes
  useEffect(() => {
    const nuevasVentas = publicacionesCreadas.venta.filter((publicacion) => (
      !publicacionesRecibidas.current.has(`venta-${publicacion.id}`)
    ));
    const nuevosIntercambios = publicacionesCreadas.intercambio.filter((publicacion) => (
      !publicacionesRecibidas.current.has(`intercambio-${publicacion.id}`)
    ));

    if (nuevasVentas.length) {
      setPublicacionesVenta((actuales) => [...actuales, ...nuevasVentas]);
      nuevasVentas.forEach((publicacion) => publicacionesRecibidas.current.add(`venta-${publicacion.id}`));
    }
    if (nuevosIntercambios.length) {
      setPublicacionesIntercambio((actuales) => [...actuales, ...nuevosIntercambios]);
      nuevosIntercambios.forEach((publicacion) => publicacionesRecibidas.current.add(`intercambio-${publicacion.id}`));
    }
  }, [publicacionesCreadas]);

<<<<<<< Updated upstream
=======
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

>>>>>>> Stashed changes
  const cerrarEdicion = () => {
    setPublicacionEnEdicion(null);
    setPasoEdicion(1);
    setErrorEdicion("");
  };

  const iniciarEdicion = (publicacion, tipo) => {
<<<<<<< Updated upstream
    setPublicacionEnEdicion(crearDatosEdicion(publicacion, tipo));
=======
    const datos = crearDatosEdicion(publicacion, tipo);

    if (tipo === "intercambio") {
      const talleEncontrado = talles.find(
        (talle) => Number(talle.id_talla) === Number(publicacion.talle_buscado)
      );

      datos.talleBuscado = talleEncontrado?.talla || "";
      datos.valoresIniciales.talleBuscado = datos.talleBuscado;
    }

    setPublicacionEnEdicion(datos);
>>>>>>> Stashed changes
    setPasoEdicion(1);
    setErrorEdicion("");
  };

  const actualizarCampoEdicion = (campo, valor) => {
    if (campo === "tipoPublicacion") return;
    setPublicacionEnEdicion((publicacion) => ({ ...publicacion, [campo]: valor }));
    setErrorEdicion("");
  };

  const continuarEdicion = () => {
    if (!publicacionEnEdicion.nombre.trim() || !publicacionEnEdicion.imagen) {
      setErrorEdicion("Ingresá un nombre y seleccioná una imagen para continuar.");
      return;
    }
    setErrorEdicion("");
    setPasoEdicion(2);
  };

  const continuarEdicionDesdeEstilos = () => {
    if (publicacionEnEdicion.estilos.length === 0 && publicacionEnEdicion.original.estilos?.length > 0) {
      setErrorEdicion("Seleccioná al menos un estilo para continuar.");
      return;
    }
    setErrorEdicion("");
    if (publicacionEnEdicion.tipoPublicacion === "prenda") guardarEdicion();
    else setPasoEdicion(3);
  };

  const valorGuardado = (campo, campoOriginal = campo) => {
    const cambio = publicacionEnEdicion[campo];
    if (!mismoValor(cambio, publicacionEnEdicion.valoresIniciales[campo])) return cambio;
    return publicacionEnEdicion.original[campoOriginal] ?? cambio;
  };

<<<<<<< Updated upstream
  const guardarEdicion = () => {
    if (!publicacionEnEdicion) return;
    const { tipo, original } = publicacionEnEdicion;
    const claveOrigen = claveRegistro(original, tipo);
    const categoria = valorGuardado("categoria", tipo === "venta" ? "categoria" : "prenda");
    const actualizada = {
      ...original,
      tipoPublicacion: tipoDestino,
      nombre: valorGuardado("nombre"),
      imagen: valorGuardado("imagen"),
      descripcion: valorGuardado("descripcion"),
      privacidad: valorGuardado("privacidad"),
      talle: valorGuardado("talle"),
      temporada: valorGuardado("temporada"),
      ocasion: valorGuardado("ocasion"),
      genero: valorGuardado("genero"),
      estado: valorGuardado("estado"),
      estilos: valorGuardado("estilos"),
      colores: valorGuardado("colores"),
    };

    const tipoDestino = publicacionEnEdicion.tipoPublicacion;
    if (tipo !== tipoDestino) actualizada.claveArmario = `${tipoDestino}-${original.id}-${Date.now()}`;
    if (tipoDestino === "venta") {
      actualizada.categoria = categoria;
      const precio = valorGuardado("precio");
      const stock = valorGuardado("stock");
      if (precio !== "" && precio != null) actualizada.precio = Number(precio);
      if (stock !== "" && stock != null) actualizada.stock = Number(stock);
      delete actualizada.tipo;
      delete actualizada.tiposAceptados;
      delete actualizada.estadoMinimoAceptado;
      delete actualizada.estadoMinimo;
      delete actualizada.talleBuscado;
      if (tipo !== tipoDestino) { delete actualizada.propuestas; }
      if (tipo === "venta") setPublicacionesVenta((items) => items.map((item) => claveRegistro(item, "venta") === claveOrigen ? actualizada : item));
      else {
        setPublicacionesIntercambio((items) => items.filter((item) => claveRegistro(item, "intercambio") !== claveOrigen));
        setPublicacionesVenta((items) => [...items, actualizada]);
      }
      if (tipo !== tipoDestino) {
        publicacionesRecibidas.current.add(`${tipoDestino}-${actualizada.id}`);
        onPublicacionConvertida?.(actualizada, tipo, tipoDestino, claveOrigen);
      }
      else onPublicacionActualizada?.(actualizada, tipo);
    } else if (tipoDestino === "intercambio") {
      actualizada.tipo = "intercambio";
      actualizada.prenda = categoria;
      actualizada.tiposAceptados = valorGuardado("tiposAceptados");
      actualizada.estadoMinimoAceptado = valorGuardado("estadoMinimo", "estadoMinimoAceptado");
      actualizada.talleBuscado = valorGuardado("talleBuscado");
      delete actualizada.precio;
      delete actualizada.stock;
      if (tipo !== tipoDestino) { delete actualizada.solicitudes; }
      if (tipo === "intercambio") setPublicacionesIntercambio((items) => items.map((item) => claveRegistro(item, "intercambio") === claveOrigen ? actualizada : item));
      else {
        setPublicacionesVenta((items) => items.filter((item) => claveRegistro(item, "venta") !== claveOrigen));
        setPublicacionesIntercambio((items) => [...items, actualizada]);
      }
      if (tipo !== tipoDestino) {
        publicacionesRecibidas.current.add(`${tipoDestino}-${actualizada.id}`);
        onPublicacionConvertida?.(actualizada, tipo, tipoDestino, claveOrigen);
      }
      else onPublicacionActualizada?.(actualizada, tipo);
    } else {
      delete actualizada.tipo;
      delete actualizada.precio;
      delete actualizada.stock;
      delete actualizada.solicitudes;
      delete actualizada.propuestas;
      delete actualizada.tiposAceptados;
      delete actualizada.estadoMinimoAceptado;
      delete actualizada.estadoMinimo;
      delete actualizada.talleBuscado;
      setPublicacionesVenta((items) => items.filter((item) => claveRegistro(item, "venta") !== claveOrigen));
      setPublicacionesIntercambio((items) => items.filter((item) => claveRegistro(item, "intercambio") !== claveOrigen));
      onPublicacionConvertidaAPrenda?.({
        ...actualizada,
        tipo: "prenda",
        tipoPublicacion: "prenda",
        categoria,
        id: original.id,
      }, tipo, claveOrigen);
    }
    cerrarEdicion();
=======
  const guardarEdicion = async () => {
    if (!publicacionEnEdicion) return;

    const { tipo, original } = publicacionEnEdicion;
    const tipoDestino = publicacionEnEdicion.tipoPublicacion;

    // Por ahora no guardamos conversiones entre tipos.
    if (tipo !== tipoDestino) {
      setErrorEdicion(
        "Por ahora solo podés modificar publicaciones sin cambiar su tipo."
      );
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setErrorEdicion("Tu sesión venció. Iniciá sesión nuevamente.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const categoria = valorGuardado(
        "categoria",
        tipo === "venta" ? "categoria" : "prenda"
      );

      const colores = valorGuardado("colores");
      const estilos = valorGuardado("estilos");
      const imagen = valorGuardado("imagen");

      // 1. Actualizar los datos de la prenda.
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

      // Solo enviamos imagen cuando se seleccionó un archivo nuevo.
      if (imagen instanceof File) {
        datosPrenda.append("imagen", imagen);
      }

      await axios.put(
        `http://localhost:3000/api/prendas/${original.idPrenda}`,
        datosPrenda,
        config
      );

      // 2. Actualizar los datos propios de la publicación.
      if (tipo === "venta") {
        const precio = Number(valorGuardado("precio"));
        const stock = Number(valorGuardado("stock"));

        await axios.put(
          `http://localhost:3000/api/publicaciones/compra/${original.id}`,
          {
            precio_unitario: precio,
            stock,
          },
          config
        );
      }

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
            : buscarId(estados, "estado_prenda", estadoMinimo);

        const talleSeleccionado = buscarId(
          talles,
          "talla",
          talleBuscado
        );

        const categoriasSeleccionadas = tiposAceptados.map((nombre) =>
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

        await axios.put(
          `http://localhost:3000/api/publicaciones/intercambio/${original.id}`,
          {
            estado_MA: estadoSeleccionado?.id_estado_prenda ?? null,
            talle_buscado: talleSeleccionado.id_talla,
            categoriasAceptadas: categoriasSeleccionadas,
          },
          config
        );
      }

      // 3. Actualizar las tarjetas cuando el backend confirmó los cambios.
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
        actualizada.precio = Number(valorGuardado("precio"));
        actualizada.stock = Number(valorGuardado("stock"));

        setPublicacionesVenta((items) =>
          items.map((item) =>
            item.id === original.id ? actualizada : item
          )
        );
      }

      if (tipo === "intercambio") {
        actualizada.tiposAceptados = valorGuardado("tiposAceptados");
        actualizada.estadoMinimoAceptado = valorGuardado(
          "estadoMinimo",
          "estadoMinimoAceptado"
        );
        actualizada.talleBuscado = valorGuardado("talleBuscado");

        setPublicacionesIntercambio((items) =>
          items.map((item) =>
            item.id === original.id ? actualizada : item
          )
        );
      }

      onPublicacionActualizada?.(actualizada, tipo);
      cerrarEdicion();

    } catch (error) {
      console.error(
        "Error al guardar la modificación:",
        error.response?.data || error
      );

      setErrorEdicion(
        error.response?.data?.mensaje ||
        "No se pudieron guardar los cambios. Intentá nuevamente."
      );
    }
>>>>>>> Stashed changes
  };

  const guardarVentaEditada = () => {
    const precio = Number(publicacionEnEdicion.precio);
    const stock = Number(publicacionEnEdicion.stock);
    const original = publicacionEnEdicion.original;
    if ((publicacionEnEdicion.precio !== "" || original.precio != null) && precio <= 0) {
      setErrorEdicion("Ingresá un precio mayor a cero.");
      return;
    }
    if ((publicacionEnEdicion.stock !== "" || original.stock != null) && stock <= 0) {
      setErrorEdicion("Ingresá una cantidad de stock mayor a cero.");
      return;
    }
    guardarEdicion();
  };

  const guardarIntercambioEditado = () => {
    if (publicacionEnEdicion.tiposAceptados.length === 0) {
      setErrorEdicion("Seleccioná al menos un tipo de prenda aceptado.");
      return;
    }
    guardarEdicion();
  };

  const eliminarPublicacion = (publicacion, tipo) => setPublicacionAEliminar({ ...publicacion, tipo });

<<<<<<< Updated upstream
  const confirmarEliminacion = () => {
    if (!publicacionAEliminar) return;

    if (publicacionAEliminar.tipo === "venta") {
      setPublicacionesVenta((publicaciones) => publicaciones.filter((publicacion) => claveRegistro(publicacion, "venta") !== claveRegistro(publicacionAEliminar, "venta")));
    } else {
      setPublicacionesIntercambio((publicaciones) => publicaciones.filter((publicacion) => claveRegistro(publicacion, "intercambio") !== claveRegistro(publicacionAEliminar, "intercambio")));
    }

    setPublicacionAEliminar(null);
  };

=======

  const confirmarEliminacion = async () => {
    if (!publicacionAEliminar) return;

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Tu sesión venció. Iniciá sesión nuevamente.");
      return;
    }

    const tipo = publicacionAEliminar.tipo;
    const id = publicacionAEliminar.id;

    const ruta = tipo === "venta"
      ? `http://localhost:3000/api/publicaciones/compra/${id}`
      : `http://localhost:3000/api/publicaciones/intercambio/${id}`;

    try {
      await axios.delete(ruta, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

    } catch (error) {
      console.error(
        "Error al eliminar la publicación:",
        error.response?.data || error.message
      );
    }
  };


>>>>>>> Stashed changes
  const actualizarSolicitudes = (id, solicitudes) => {
    setPublicacionesVenta((publicaciones) => publicaciones.map((publicacion) => (
      publicacion.id === id ? { ...publicacion, solicitudes } : publicacion
    )));
  };

  const guardarPropuestasPendientes = (publicacionId, propuestas) => {
    setPublicacionesIntercambio((publicaciones) => publicaciones.map((publicacion) => (
      publicacion.id === publicacionId
        ? { ...publicacion, propuestas }
        : publicacion
    )));
  };

  const abrirDetallePropuesta = (producto) => {
    navigate("/detalles/intercambio", {
      state: { producto, productos: publicacionesIntercambio },
    });
  };

  return (
    <section className="MiArmario__publicaciones" aria-label="Mis publicaciones">
      <div className="MiArmario__panelPublicaciones">
        <header className="MiArmario__encabezadoPublicaciones">
          <h2><span className="material-symbols-outlined" aria-hidden="true">autorenew</span>Intercambio</h2>
          <span>{publicacionesIntercambio.length} Publicaciones</span>
        </header>
        <div className="MiArmario__listaPublicaciones">
          {publicacionesIntercambio.map((publicacion) => (
            <TarjetaIntercambioArmario
              key={claveRegistro(publicacion, "intercambio")}
              {...publicacion}
              propuestas={publicacion.propuestas.filter((propuesta) => propuesta.estado === "PENDIENTE").length}
              onVerPropuestas={() => setPublicacionConPropuestas(publicacion.id)}
              onModificar={() => iniciarEdicion(publicacion, "intercambio")}
              onEliminar={() => eliminarPublicacion(publicacion, "intercambio")}
            />
          ))}
        </div>
      </div>
      <div className="MiArmario__panelPublicaciones">
        <header className="MiArmario__encabezadoPublicaciones">
          <h2><span className="material-symbols-outlined" aria-hidden="true">shopping_basket</span>Venta</h2>
          <span>{publicacionesVenta.length} Publicaciones</span>
        </header>
        <div className="MiArmario__listaPublicaciones">
          {publicacionesVenta.map((publicacion) => {
            const ventasConfirmadas = publicacion.solicitudes.filter((solicitud) => solicitud.estado === "CONFIRMADO").length;
            const solicitudesPendientes = publicacion.solicitudes.filter((solicitud) => solicitud.estado === "EN CONTACTO").length;

            return (
              <TarjetaVentaArmario
                key={claveRegistro(publicacion, "venta")}
                {...publicacion}
                ventas={ventasConfirmadas}
                solicitudesPendientes={solicitudesPendientes}
                onGestionarVentas={() => setVentaEnGestion(publicacion.id)}
                onModificar={() => iniciarEdicion(publicacion, "venta")}
                onEliminar={() => eliminarPublicacion(publicacion, "venta")}
              />
            );
          })}
        </div>
      </div>
      {ventaEnGestion !== null && (() => {
        const publicacion = publicacionesVenta.find((item) => item.id === ventaEnGestion);
        return publicacion && (
          <GestionarVentas
            key={publicacion.id}
            solicitudes={publicacion.solicitudes}
            onGuardar={(solicitudes) => actualizarSolicitudes(publicacion.id, solicitudes)}
            onClose={() => setVentaEnGestion(null)}
          />
        );
      })()}
      {publicacionConPropuestas !== null && (() => {
        const publicacion = publicacionesIntercambio.find((item) => item.id === publicacionConPropuestas);
        return publicacion && (
          <PropuestasDeIntercambio
            key={publicacion.id}
            propuestas={publicacion.propuestas}
            onGuardar={(propuestas) => guardarPropuestasPendientes(publicacion.id, propuestas)}
            onVerDetalle={abrirDetallePropuesta}
            onClose={() => setPublicacionConPropuestas(null)}
          />
        );
      })()}
      {publicacionAEliminar && (
        <EliminarPublicacion
          onConfirmar={confirmarEliminacion}
          onCancelar={() => setPublicacionAEliminar(null)}
        />
      )}
      {publicacionEnEdicion && (
        pasoEdicion === 1 ? (
          <CrearPrenda
            datos={publicacionEnEdicion}
<<<<<<< Updated upstream
=======
            categorias={categorias}
            talles={talles}
            temporadas={temporadas}
            ocasiones={ocasiones}
            generos={generos}
            estados={estados}
>>>>>>> Stashed changes
            onCambiar={actualizarCampoEdicion}
            mensajeError={errorEdicion}
            onContinuar={continuarEdicion}
            onClose={cerrarEdicion}
          />
        ) : pasoEdicion === 2 ? (
          <CrearPrenda2
            datos={publicacionEnEdicion}
<<<<<<< Updated upstream
=======
            estilosDisponibles={estilos}
            coloresDisponibles={colores}
>>>>>>> Stashed changes
            onCambiar={actualizarCampoEdicion}
            mensajeError={errorEdicion}
            onVolver={() => { setErrorEdicion(""); setPasoEdicion(1); }}
            onSiguiente={continuarEdicionDesdeEstilos}
            onClose={cerrarEdicion}
          />
        ) : publicacionEnEdicion.tipoPublicacion === "venta" ? (
          <CrearPrenda3Venta
            datos={publicacionEnEdicion}
            onCambiar={actualizarCampoEdicion}
            mensajeError={errorEdicion}
            onVolver={() => { setErrorEdicion(""); setPasoEdicion(2); }}
            onGuardar={guardarVentaEditada}
            onClose={cerrarEdicion}
          />
        ) : publicacionEnEdicion.tipoPublicacion === "intercambio" ? (
          <CrearPrenda3Intercambio
            datos={publicacionEnEdicion}
<<<<<<< Updated upstream
=======
            talles={talles}
>>>>>>> Stashed changes
            onCambiar={actualizarCampoEdicion}
            mensajeError={errorEdicion}
            onVolver={() => { setErrorEdicion(""); setPasoEdicion(2); }}
            onGuardar={guardarIntercambioEditado}
            onClose={cerrarEdicion}
          />
        ) : null
      )}
    </section>
  );
}
