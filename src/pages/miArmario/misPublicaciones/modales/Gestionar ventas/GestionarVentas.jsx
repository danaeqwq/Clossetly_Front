import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../../../../componentes/modal/Modal";
import "./gestionarVentas.css";
import iconwsp from "../../../../../assets/logo wsp mi armario.svg";

export default function GestionarVentas({ idPublicacion, onClose }) {
  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarVentas = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Tu sesión venció. Iniciá sesión nuevamente.");
        setCargando(false);
        return;
      }

      try {
        const respuesta = await axios.get(
          "http://localhost:3000/api/ventas",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const ventasRecibidas = respuesta.data.ventas || [];

        const ventasFiltradas = ventasRecibidas.filter((venta) =>
          venta.productos?.some(
            (producto) =>
              Number(producto.idPublicacion) === Number(idPublicacion)
          )
        );

        const ventasPreparadas = ventasFiltradas.map((venta) => {
          const estadoActual = (
            venta.estado || "EN CONTACTO"
          ).toUpperCase();

          return {
            ...venta,
            usuario: venta.comprador,
            avatar: venta.imagenComprador,
            telefono: venta.telefonoComprador,
            estado: estadoActual,
            estadoOriginal: estadoActual,
          };
        });

        setVentas(ventasPreparadas);
      } catch (error) {
        console.error(
          "Error al cargar las ventas:",
          error.response?.data || error.message
        );

        setError(
          error.response?.data?.mensaje ||
          "No se pudieron cargar las ventas."
        );
      } finally {
        setCargando(false);
      }
    };

    cargarVentas();
  }, [idPublicacion]);

  const contactarWhatsapp = (telefono) => {
    if (!telefono) return;

    const numero = String(telefono).replace(/\D/g, "");

    window.open(`https://wa.me/${numero}`, "_blank");
  };

  const cambiarEstado = (id, estado) => {
    setVentas((actuales) =>
      actuales.map((venta) =>
        venta.id === id ? { ...venta, estado } : venta
      )
    );
  };

  const guardar = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Tu sesión venció. Iniciá sesión nuevamente.");
      return;
    }

    const ventasModificadas = ventas.filter(
      (venta) => venta.estado !== venta.estadoOriginal
    );

    if (ventasModificadas.length === 0) {
      onClose?.();
      return;
    }

    setGuardando(true);
    setError("");

    try {
      await Promise.all(
        ventasModificadas.map((venta) =>
          axios.patch(
            `http://localhost:3000/api/ventas/${venta.id}/estado`,
            {
              estado: venta.estado,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        )
      );

      onClose?.();
    } catch (error) {
      console.error(
        "Error al guardar los estados:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.mensaje ||
        "No se pudieron guardar los cambios."
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Modal
      className="Modal--gestionarVentas"
      titulo="Gestionar Ventas"
      descripcion="Acá podés gestionar tus ventas y solicitudes de venta."
      confirmar={{
        texto: guardando ? "Guardando..." : "Guardar",
        onClick: guardar,
      }}
      cancelar={{
        texto: "Salir sin guardar",
        icono: "logout",
        onClick: onClose,
      }}
      onClose={onClose}
    >
      <div
        className="GestionarVentas"
        aria-label="Solicitudes de venta"
      >
        {cargando && <p>Cargando ventas...</p>}

        {!cargando && error && <p>{error}</p>}

        {!cargando && !error && ventas.length === 0 && (
          <p>Todavía no hay ventas para esta publicación.</p>
        )}

        {!cargando &&
          ventas.map((venta) => (
            <article
              className="GestionarVentas__fila"
              key={venta.id}
            >
              <span
                className="GestionarVentas__avatar"
                aria-hidden="true"
              >
                {venta.avatar ? (
                  <img
                    src={
                      venta.avatar.startsWith("http")
                        ? venta.avatar
                        : `http://localhost:3000${venta.avatar}`
                    }
                    alt=""
                  />
                ) : (
                  <span className="material-symbols-outlined">
                    person
                  </span>
                )}
              </span>

              <span className="GestionarVentas__usuario">
                {venta.usuario}
              </span>

              <label className="GestionarVentas__estado">
                <span>Estado de pedido:</span>

                <select
                  aria-label={`Estado de pedido de ${venta.usuario}`}
                  value={venta.estado}
                  onChange={(evento) =>
                    cambiarEstado(venta.id, evento.target.value)
                  }
                  disabled={guardando}
                >
                  <option value="CONFIRMADO">CONFIRMADO</option>
                  <option value="EN CONTACTO">EN CONTACTO</option>
                  <option value="COMPLETADO">COMPLETADO</option>
                </select>
              </label>

              <button
                className="GestionarVentas__contacto"
                type="button"
                aria-label={`Contactar a ${venta.usuario}`}
                onClick={() =>
                  contactarWhatsapp(venta.telefono)
                }
                disabled={!venta.telefono}
              >
                <img src={iconwsp} alt="" aria-hidden="true" />
              </button>
            </article>
          ))}
      </div>
    </Modal>
  );
}
