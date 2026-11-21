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
    colores: publicacion.colores || [],
    precio: publicacion.precio == null ? "" : String(publicacion.precio),
    stock: publicacion.stock == null ? "" : String(publicacion.stock),
    tiposAceptados: publicacion.tiposAceptados || [],
    estadoMinimo: normalizarOpcion(publicacion.estadoMinimo || publicacion.estadoMinimoAceptado, ["TODOS", "NUEVA CON ETIQUETA", "NUEVA SIN ETIQUETA", "COMO NUEVA", "MUY BUEN ESTADO", "BUEN ESTADO"], "TODOS"),
    talleBuscado: publicacion.talleBuscado || "M",
  };
  return { ...datos, tipo, id: publicacion.id, original: publicacion, valoresIniciales: { ...datos } };
};

const mismoValor = (a, b) => JSON.stringify(a) === JSON.stringify(b);

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

  const cerrarEdicion = () => {
    setPublicacionEnEdicion(null);
    setPasoEdicion(1);
    setErrorEdicion("");
  };

  const iniciarEdicion = (publicacion, tipo) => {
    setPublicacionEnEdicion(crearDatosEdicion(publicacion, tipo));
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

  const confirmarEliminacion = () => {
    if (!publicacionAEliminar) return;

    if (publicacionAEliminar.tipo === "venta") {
      setPublicacionesVenta((publicaciones) => publicaciones.filter((publicacion) => claveRegistro(publicacion, "venta") !== claveRegistro(publicacionAEliminar, "venta")));
    } else {
      setPublicacionesIntercambio((publicaciones) => publicaciones.filter((publicacion) => claveRegistro(publicacion, "intercambio") !== claveRegistro(publicacionAEliminar, "intercambio")));
    }

    setPublicacionAEliminar(null);
  };

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
            onCambiar={actualizarCampoEdicion}
            mensajeError={errorEdicion}
            onContinuar={continuarEdicion}
            onClose={cerrarEdicion}
          />
        ) : pasoEdicion === 2 ? (
          <CrearPrenda2
            datos={publicacionEnEdicion}
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
