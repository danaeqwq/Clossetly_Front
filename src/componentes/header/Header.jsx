
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
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
    const { pathname, search } = useLocation();
    const navigate = useNavigate();

    const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
    const [cantidadNoLeidas, setCantidadNoLeidas] = useState(0);
    const [busqueda, setBusqueda] = useState("");
    const [busquedaAbierta, setBusquedaAbierta] = useState(false);
    const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
    const [actualizarNotificaciones, setActualizarNotificaciones] = useState(0);

    const esBoutique = pathname === "/boutique";
    const mostrarCarrito = esBoutique || pathname.startsWith("/detalles/");
    const nombreSeccion = nombresSeccion[pathname] || seccion;

    useEffect(() => {
        if (pathname === "/boutique") {
            const parametros = new URLSearchParams(search);
            setBusqueda(parametros.get("busqueda") || "");
        }
    }, [pathname, search]);

    const buscar = (evento) => {
        evento.preventDefault();

        const texto = busqueda.trim();

        if (!texto) {
            navigate("/boutique");
            setBusquedaAbierta(false);
            return;
        }

        navigate(`/boutique?busqueda=${encodeURIComponent(texto)}`);
        setBusquedaAbierta(false);
    };

    useEffect(() => {
        const cargarCantidadNoLeidas = () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setCantidadNoLeidas(0);
                return;
            }
            axios.get("http://localhost:3000/api/notificaciones", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((respuesta) => {
                    const cantidad = respuesta.data.filter(
                        (notificacion) => !Boolean(Number(notificacion.visto))
                    ).length;

                    setCantidadNoLeidas(cantidad);
                })
                .catch((error) => {
                    console.error("Error al obtener cantidad de notificaciones:", error);
                });
        };

        cargarCantidadNoLeidas();

        const intervalo = setInterval(cargarCantidadNoLeidas, 15000);

        return () => clearInterval(intervalo);
    }, [actualizarNotificaciones]);

    return (
        <header className={`Header${busquedaAbierta ? " Header--busquedaAbierta" : ""}`}>
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
                <form className="Header__buscador" onSubmit={buscar}>
                    <label
                        className="Header__srOnly"
                        htmlFor="Header-busqueda"
                    >
                        Buscar prenda
                    </label>

                    <input
                        id="Header-busqueda"
                        type="search"
                        placeholder="Buscar prenda..."
                        value={busqueda}
                        onChange={(evento) => setBusqueda(evento.target.value)}
                    />

                    <button
                        className="Header__buscadorIcono material-symbols-outlined"
                        type="submit"
                        aria-label="Buscar"
                        onClick={(evento) => {
                            if (window.matchMedia("(max-width: 640px)").matches && !busquedaAbierta) {
                                evento.preventDefault();
                                setMenuMovilAbierto(false);
                                setBusquedaAbierta(true);
                            }
                        }}
                    >
                        search
                    </button>
                </form>

                <button
                    className="Header__menuBoton"
                    type="button"
                    aria-label={menuMovilAbierto ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={menuMovilAbierto}
                    onClick={() => {
                        setBusquedaAbierta(false);
                        setMenuMovilAbierto((abierto) => !abierto);
                    }}
                >
                    <span className="material-symbols-outlined" aria-hidden="true">
                        {menuMovilAbierto ? "close" : "menu"}
                    </span>
                </button>

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
                        setActualizarNotificaciones((actual) => actual + 1);
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

                {mostrarCarrito && (
                    <button
                        className="Header__icono"
                        type="button"
                        onClick={onAlternarCarrito}
                    >
                        <span
                            className="material-symbols-outlined"
                            aria-hidden="true"
                        >
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
                        <span
                            className="material-symbols-outlined"
                            aria-hidden="true"
                        >
                            tune
                        </span>
                    </button>
                )}
            </div>

            {menuMovilAbierto && (
                <nav className="Header__menuMovil" aria-label="Menú principal">
                    {mostrarCarrito && (
                        <button
                            type="button"
                            onClick={() => {
                                onAlternarCarrito?.();
                                setMenuMovilAbierto(false);
                            }}
                        >
                            <span className="material-symbols-outlined" aria-hidden="true">
                                shopping_cart
                            </span>
                            Carrito
                        </button>
                    )}

                    {esBoutique && (
                        <button
                            type="button"
                            onClick={() => {
                                onAbrirFiltros?.();
                                setMenuMovilAbierto(false);
                            }}
                        >
                            <span className="material-symbols-outlined" aria-hidden="true">
                                tune
                            </span>
                            Filtros
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => setMenuMovilAbierto(false)}
                    >
                        <span className="material-symbols-outlined" aria-hidden="true">
                            favorite_border
                        </span>
                        Favoritos
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setMostrarNotificaciones(true);
                            setMenuMovilAbierto(false);
                            setActualizarNotificaciones((actual) => actual + 1);
                        }}
                    >
                        <span className="material-symbols-outlined" aria-hidden="true">
                            notifications_none
                        </span>
                        Notificaciones
                    </button>
                </nav>
            )}

            {mostrarNotificaciones && (
                <Notificaciones
                    onClose={() => setMostrarNotificaciones(false)}
                    onCambioNotificaciones={() =>
                        setActualizarNotificaciones((actual) => actual + 1)
                    }
                />
            )}
        </header>
    );
}
