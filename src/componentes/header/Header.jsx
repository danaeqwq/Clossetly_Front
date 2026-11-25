
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";

import "./header.css";
import "../../styles/global.css";

import iconoFavoritos from "../../assets/componentes/icono favoritos.svg";
import iconoCampana from "../../assets/componentes/icono campana.svg";

import Notificaciones from "../notificaciones/Notificaciones";

const nombresSeccion = {
    "/admin": "Administración",
    "/boutique": "Boutique",
    "/explorar": "Explorar",
    "/mi-cuenta": "Mi cuenta",
    "/guia-talle": "Guía de talles",
    "/armario": "Mi armario",
    "/preguntas-frecuentes": "Preguntas frecuentes",
    "/propuesta-intercambio": "Propuesta de intercambio",
    "/terminos-y-condiciones": "Términos y condiciones",
    "/registro": "Crear cuenta",
    "/detalles/prenda": "Detalle de prenda",
    "/detalles/outfit": "Detalle de outfit",
    "/detalles/venta": "Detalle de venta",
    "/detalles/intercambio": "Detalle de intercambio",
};

export default function Header({
    seccion = "Tu Armario virtual",
    onAbrirFiltros,
    onAlternarCarrito
}) {
    const { pathname } = useLocation();

    const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
    const [cantidadNoLeidas, setCantidadNoLeidas] = useState(0);

    const esBoutique = pathname === "/boutique";
    const nombreSeccion = nombresSeccion[pathname] || seccion;

    // OBTENER CANTIDAD DE NOTIFICACIONES SIN LEER
    const cargarCantidadNoLeidas = useCallback(async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setCantidadNoLeidas(0);
            return;
        }

        try {
            const respuesta = await axios.get(
                "http://localhost:3000/api/notificaciones",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const datos = Array.isArray(respuesta.data)
                ? respuesta.data
                : [];

            const cantidad = datos.filter(
                (notificacion) => !Boolean(Number(notificacion.visto))
            ).length;

            setCantidadNoLeidas(cantidad);
        } catch (error) {
            console.error("Error al obtener cantidad de notificaciones:", error);
        }
    }, []);

    // CONSULTAR AL ENTRAR Y ACTUALIZAR PERIÓDICAMENTE
    useEffect(() => {
        cargarCantidadNoLeidas();

        const intervalo = setInterval(() => {
            cargarCantidadNoLeidas();
        }, 15000);

        return () => clearInterval(intervalo);
    }, [cargarCantidadNoLeidas]);

    return (
        <header className="Header">
            <a
                className="Header__marca"
                href="#"
                aria-label="Clossetly, inicio"
            >
                Clossetly
            </a>

            <span
                className="Header__separador"
                aria-hidden="true"
            />

            <a className="Header__seccion" href="#">
                {nombreSeccion}
            </a>

            <div className="Header__acciones">
                <label className="Header__buscador">
                    <span className="Header__srOnly">
                        Buscar prenda
                    </span>

                    <input
                        type="search"
                        placeholder="Buscar prenda..."
                    />

                    <span
                        className="Header__buscadorIcono material-symbols-outlined"
                        aria-hidden="true"
                    >
                        search
                    </span>
                </label>

                <button
                    className="Header__icono"
                    type="button"
                    aria-label="Favoritos"
                >
                    <img src={iconoFavoritos} alt="" />
                </button>

                <button
                    className="Header__icono"
                    type="button"
                    aria-label={`Notificaciones${cantidadNoLeidas > 0
                        ? `, ${cantidadNoLeidas} sin leer`
                        : ""
                        }`}
                    aria-expanded={mostrarNotificaciones}
                    onClick={() => {
                        setMostrarNotificaciones(!mostrarNotificaciones);
                        cargarCantidadNoLeidas();
                    }}
                >
                    <span className="Header__campanaContenedor">
                        <img src={iconoCampana} alt="" />

                        {cantidadNoLeidas > 0 && (
                            <span className="Header__contadorNotificaciones">
                                {cantidadNoLeidas > 99 ? "99+" : cantidadNoLeidas}
                            </span>
                        )}
                    </span>
                </button>

                {esBoutique && (
                    <button
                        className="Header__icono"
                        type="button"
                        onClick={onAlternarCarrito}
                    >
                        <span className="material-symbols-outlined" aria-hidden="true">
                            shopping_cart
                        </span>
                    </button>
                )}

                {esBoutique && (
                    <button
                        className="Header__icono"
                        type="button"
                        onClick={onAbrirFiltros}
                    >
                        <span className="material-symbols-outlined" aria-hidden="true">
                            tune
                        </span>
                    </button>
                )}
            </div>

            {mostrarNotificaciones && (
                <Notificaciones
                    onClose={() => setMostrarNotificaciones(false)}
                    onCambioNotificaciones={cargarCantidadNoLeidas}
                />
            )}
        </header>
    );
}
