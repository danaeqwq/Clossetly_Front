import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import "./PublicacionesArmario.css";
import TarjetaVentaArmario from "../../../componentes/tarjetaVentaArmario/TarjetaVentaArmario";
import TarjetaIntercambioArmario from "../../../componentes/tarjetaIntercambioArmario/TarjetaIntercambioArmario";
import GestionarVentas from "./modales/Gestionar ventas/GestionarVentas";
import PropuestasDeIntercambio from "./modales/Propuestas de intercambio/PropuestasDeIntercambio";
import EliminarPublicacion from "./modales/eliminarPublicacion/EliminarPublicacion";
import Modal from "../../../componentes/modal/Modal";
import ropaEjemplo from "../../../assets/Ropa__ejemplo.jpg";
import ropaUno from "../../../assets/ropa1.jpg";

const avatarEjemplo = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&h=96&q=80";

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

export default function PublicacionesArmario({ publicacionesCreadas = { venta: [], intercambio: [] } }) {
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

  const cerrarEdicion = () => setPublicacionEnEdicion(null);

  const guardarEdicion = () => {
    if (!publicacionEnEdicion) return;

    if (publicacionEnEdicion.tipo === "venta") {
      setPublicacionesVenta((publicaciones) => publicaciones.map((publicacion) => (
        publicacion.id === publicacionEnEdicion.id
          ? { ...publicacion, nombre: publicacionEnEdicion.nombre, stock: publicacionEnEdicion.stock }
          : publicacion
      )));
    } else {
      setPublicacionesIntercambio((publicaciones) => publicaciones.map((publicacion) => (
        publicacion.id === publicacionEnEdicion.id
          ? { ...publicacion, nombre: publicacionEnEdicion.nombre, talle: publicacionEnEdicion.talle }
          : publicacion
      )));
    }

    cerrarEdicion();
  };

  const actualizarCampoEdicion = (campo, valor) => {
    setPublicacionEnEdicion((publicacion) => ({ ...publicacion, [campo]: valor }));
  };

  const eliminarPublicacion = (id, tipo) => setPublicacionAEliminar({ id, tipo });

  const confirmarEliminacion = () => {
    if (!publicacionAEliminar) return;

    if (publicacionAEliminar.tipo === "venta") {
      setPublicacionesVenta((publicaciones) => publicaciones.filter((publicacion) => publicacion.id !== publicacionAEliminar.id));
    } else {
      setPublicacionesIntercambio((publicaciones) => publicaciones.filter((publicacion) => publicacion.id !== publicacionAEliminar.id));
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
              key={publicacion.id}
              {...publicacion}
              propuestas={publicacion.propuestas.filter((propuesta) => propuesta.estado === "PENDIENTE").length}
              onVerPropuestas={() => setPublicacionConPropuestas(publicacion.id)}
              onModificar={() => setPublicacionEnEdicion({ tipo: "intercambio", ...publicacion })}
              onEliminar={() => eliminarPublicacion(publicacion.id, "intercambio")}
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
                key={publicacion.id}
                {...publicacion}
                ventas={ventasConfirmadas}
                solicitudesPendientes={solicitudesPendientes}
                onGestionarVentas={() => setVentaEnGestion(publicacion.id)}
                onModificar={() => setPublicacionEnEdicion({ tipo: "venta", ...publicacion })}
                onEliminar={() => eliminarPublicacion(publicacion.id, "venta")}
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
        <Modal
          titulo="Modificar publicación"
          descripcion="Revisá los datos de tu publicación."
          confirmar={{ texto: "Guardar cambios", onClick: guardarEdicion }}
          cancelar={{ texto: "Cancelar", onClick: cerrarEdicion }}
          onClose={cerrarEdicion}
        >
          <div className="MiArmario__formularioEdicion">
            <label>
              Nombre de la publicación
              <input
                type="text"
                value={publicacionEnEdicion.nombre}
                onChange={(evento) => actualizarCampoEdicion("nombre", evento.target.value)}
              />
            </label>
            {publicacionEnEdicion.tipo === "venta" ? (
              <label>
                Stock
                <input
                  type="number"
                  min="0"
                  value={publicacionEnEdicion.stock}
                  onChange={(evento) => actualizarCampoEdicion("stock", Number(evento.target.value))}
                />
              </label>
            ) : (
              <label>
                Talle
                <select
                  value={publicacionEnEdicion.talle}
                  onChange={(evento) => actualizarCampoEdicion("talle", evento.target.value)}
                >
                  <option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option>
                </select>
              </label>
            )}
          </div>
        </Modal>
      )}
    </section>
  );
}
