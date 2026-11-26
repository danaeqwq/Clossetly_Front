import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import "./notificaciones.css";
import "../../styles/variables.css";
import "../../styles/global.css";

import PanelDesplegable from "../panelDesplegable/PanelDesplegable";

export default function Notificaciones({ onClose, onCambioNotificaciones }) {
    const navigate = useNavigate();

    const [notificaciones, setNotificaciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const cargarNotificaciones = () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Debés iniciar sesión para ver tus notificaciones");
                setCargando(false);
                return;
            }

            axios.get("http://localhost:3000/api/notificaciones", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((respuesta) => {
                    const notificacionesFormateadas = respuesta.data.map((notificacion) => ({
                        id: notificacion.Id_notificacion,
                        usuario: notificacion.usuario,
                        accion: notificacion.accion,
                        detalle: notificacion.detalle || notificacion.mensaje,
                        foto_perfil: notificacion.foto_perfil,
                        telefono: notificacion.telefono,
                        fecha: notificacion.fecha,
                        leida: Boolean(Number(notificacion.visto)),
                    }));
                    setNotificaciones(notificacionesFormateadas);
                })
                .catch((error) => {
                    console.error("Error al cargar notificaciones:", error);
                    setError("No se pudieron cargar las notificaciones");
                })
                .finally(() => {
                    setCargando(false);
                });
        };
        cargarNotificaciones();
    }, []);

    const marcarComoLeida = (id) => {
        const notificacion = notificaciones.find(
            (notificacion) => notificacion.id === id
        );

        if (!notificacion || notificacion.leida) return;
        const token = localStorage.getItem("token");

        axios.patch(
            `http://localhost:3000/api/notificaciones/${id}/leida`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then(() => {
                setNotificaciones((actuales) =>
                    actuales.map((notificacion) =>
                        notificacion.id === id
                            ? { ...notificacion, leida: true }
                            : notificacion
                    )
                );
                onCambioNotificaciones?.();
            })
            .catch((error) => {
                console.error("Error al marcar notificación:", error);
            });
    };

    const abrirNotificacion = (notificacion) => {
        marcarComoLeida(notificacion.id);
        onClose?.();
        const mensaje = (notificacion.detalle || "").toLowerCase();
        const esPropuestaNueva =
            mensaje.includes("nueva propuesta") ||
            mensaje.includes("te envió una propuesta");
        if (esPropuestaNueva) {
            navigate("/armario", {
                state: {
                    abrirPublicaciones: true,
                    abrirPropuestas: true,
                },
            });
        }
    };

    const formatearFecha = (fecha) => {
        const fechaNotificacion = new Date(fecha);
        const ahora = new Date();
        if (Number.isNaN(fechaNotificacion.getTime())) return "";
        const diferencia = Math.floor(
            (ahora.getTime() - fechaNotificacion.getTime()) / 1000
        );
        if (diferencia < 60) return "Hace unos segundos";
        const minutos = Math.floor(diferencia / 60);
        if (minutos < 60) {
            return `Hace ${minutos} ${minutos === 1 ? "minuto" : "minutos"}`;
        }
        const horas = Math.floor(minutos / 60);
        if (horas < 24) {
            return `Hace ${horas} ${horas === 1 ? "hora" : "horas"}`;
        }
        const dias = Math.floor(horas / 24);
        return `Hace ${dias} ${dias === 1 ? "día" : "días"}`;
    };

    const obtenerFoto = (foto) => {
        if (!foto) return "";
        if (foto.startsWith("http") || foto.startsWith("data:") || foto.startsWith("blob:")) {
            return foto;
        }
        return `http://localhost:3000/${foto.replace(/^\/+/, "")}`;
    };

    const obtenerEnlaceWhatsApp = (telefono) => {
        if (!telefono) return "";
        const numero = String(telefono).replace(/\D/g, "");
        if (!numero) return "";
        return `https://wa.me/${numero}`;
    };

    return (
        <PanelDesplegable
            titulo="Notificaciones"
            icono="notifications"
            className="Notificaciones"
            onClose={onClose}
        >
            <section
                className="Notificaciones__lista"
                aria-label="Notificaciones recientes"
            >
                <h3 className="Notificaciones__fecha">Hoy</h3>

                {cargando && (
                    <p className="Notificaciones__mensaje">
                        Cargando notificaciones...
                    </p>
                )}

                {!cargando && error && (
                    <p className="Notificaciones__mensaje">
                        {error}
                    </p>
                )}

                {!cargando && !error && notificaciones.length === 0 && (
                    <p className="Notificaciones__mensaje">
                        No tenés notificaciones por ahora.
                    </p>
                )}

                {!cargando &&
                    !error &&
                    notificaciones.map((notificacion) => {
                        const mensaje = (notificacion.detalle || "").toLowerCase();

                        const esPropuestaNueva =
                            mensaje.includes("te envió una propuesta");

                        const propuestaAceptada =
                            mensaje.includes("fue aceptada");

                        const propuestaRechazada =
                            mensaje.includes("fue rechazada");

                        const enlaceWhatsApp = propuestaAceptada
                            ? obtenerEnlaceWhatsApp(notificacion.telefono)
                            : "";

                        return (
                            <article
                                className={`Notificaciones__tarjeta ${notificacion.leida
                                    ? "Notificaciones__tarjeta--leido"
                                    : "Notificaciones__tarjeta--no-leido"
                                    }`}
                                key={notificacion.id}
                                onClick={() => abrirNotificacion(notificacion)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(evento) => {
                                    if (evento.key === "Enter" || evento.key === " ") {
                                        evento.preventDefault();
                                        abrirNotificacion(notificacion);
                                    }
                                }}
                            >
                                {notificacion.foto_perfil ? (
                                    <img
                                        className="Notificaciones__avatar"
                                        src={obtenerFoto(notificacion.foto_perfil)}
                                        alt=""
                                    />
                                ) : (
                                    <span className="Notificaciones__avatar material-symbols-outlined">
                                        person
                                    </span>
                                )}

                                <div className="Notificaciones__contenido">
                                    <div className="Notificaciones__encabezado">
                                        <strong className="Notificaciones__usuario">
                                            {notificacion.usuario || "Usuario"}
                                        </strong>

                                        <time className="Notificaciones__hora">
                                            {formatearFecha(notificacion.fecha)}
                                        </time>
                                    </div>

                                    <p className="Notificaciones__texto">
                                        {esPropuestaNueva ? (
                                            <>
                                                Recibiste una nueva{" "}
                                                <strong className="Notificaciones__destacado">
                                                    Propuesta
                                                </strong>{" "}
                                                de intercambio.
                                            </>
                                        ) : propuestaAceptada ? (
                                            <>
                                                ¡Tu propuesta de intercambio fue{" "}
                                                <strong className="Notificaciones__destacado">
                                                    aceptada
                                                </strong>
                                                ! Ahora podés comunicarte por WhatsApp para coordinar
                                                el intercambio.
                                            </>
                                        ) : propuestaRechazada ? (
                                            <>
                                                Tu propuesta de intercambio fue{" "}
                                                <strong className="Notificaciones__destacado">
                                                    rechazada
                                                </strong>.
                                            </>
                                        ) : (
                                            notificacion.detalle || notificacion.accion
                                        )}
                                    </p>

                                    {propuestaAceptada && enlaceWhatsApp && (
                                        <a
                                            className="Notificaciones__whatsapp"
                                            href={enlaceWhatsApp}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(evento) => {
                                                evento.stopPropagation();
                                                marcarComoLeida(notificacion.id);
                                            }}
                                        >
                                            <span className="material-symbols-outlined">
                                                chat
                                            </span>
                                            Contactar por WhatsApp
                                        </a>
                                    )}

                                    {propuestaAceptada && !enlaceWhatsApp && (
                                        <p className="Notificaciones__mensaje">
                                            No hay un teléfono disponible para contactar.
                                        </p>
                                    )}
                                </div>
                            </article>
                        );
                    })}
            </section>
        </PanelDesplegable>
    );
}
