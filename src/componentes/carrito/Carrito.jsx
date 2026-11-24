
import { useState, useEffect } from "react";
import axios from "axios";
import PanelDesplegable from "../panelDesplegable/PanelDesplegable";
import { Link } from "react-router";
import iconoWhatsapp from "../../assets/logo wsp mi armario.svg";
import ProductoCarrito from "./productoCarrito/ProductoCarrito";
import "./carrito.css";

const URL_BASE = "http://localhost:3000";
const URL_PEDIDOS = `${URL_BASE}/api/pedidos`;
const URL_PEDIDO_ITEMS = `${URL_BASE}/api/pedido-items`;

// Obtener la URL completa de las imágenes
const obtenerImagen = (imagen) => {
    if (!imagen) return null;

    if (
        imagen.startsWith("http://") ||
        imagen.startsWith("https://")
    ) {
        return imagen;
    }

    const rutaLimpia = imagen.replace(/\\/g, "/");

    return `${URL_BASE}/${rutaLimpia.replace(/^\/+/, "")}`;
};

// Formatear precios
const formatearPrecio = (precio) =>
    `$${Number(precio || 0).toLocaleString("es-AR")}`;

// Generar mensaje para WhatsApp
const generarUrlWhatsapp = (pedido, subtotal) => {
    const productos = pedido.productos
        .map(
            (producto) =>
                `- ${producto.nombre} x${producto.cantidad}: ${formatearPrecio(
                    producto.precio * producto.cantidad
                )}`
        )
        .join("\n");

    const mensaje = `¡Hola! Estoy interesado/a en coordinar el siguiente pedido de Clossetly:
${productos}
Subtotal: ${formatearPrecio(subtotal)}
Usuario: ${pedido.usuario}
¿Podemos coordinar el pago y la entrega?`;

    return `https://wa.me/${pedido.telefono}?text=${encodeURIComponent(
        mensaje
    )}`;
};

// Apariencia de los estados
const aparienciaEstado = {
    "En contacto": {
        icono: "schedule",
        clase: "contacto",
    },
    Confirmado: {
        icono: "check",
        clase: "confirmado",
    },
    Completado: {
        icono: "verified",
        clase: "completado",
    },
};

export default function Carrito({ onCerrar }) {
    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [itemsProcesando, setItemsProcesando] = useState([]);
    const [pedidosProcesando, setPedidosProcesando] = useState([]);
    const [limpiando, setLimpiando] = useState(false);

    // Obtener pedidos e items del usuario autenticado
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("No se encontró una sesión activa.");
            setCargando(false);
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        // Realizar las dos peticiones
        Promise.all([
            axios.get(URL_PEDIDOS, config),
            axios.get(URL_PEDIDO_ITEMS, config),
        ])
            .then(([respuestaPedidos, respuestaItems]) => {
                const pedidosRecibidos =
                    respuestaPedidos.data.pedidos || [];

                const itemsRecibidos =
                    respuestaItems.data.pedidoItems || [];

                // Agrupar los productos por ID de pedido
                const productosPorPedido = {};

                itemsRecibidos.forEach((item) => {
                    const idPedido = String(item.idPedido);

                    if (!productosPorPedido[idPedido]) {
                        productosPorPedido[idPedido] = [];
                    }

                    productosPorPedido[idPedido].push({
                        ...item,
                        imagen: obtenerImagen(item.imagen),
                    });
                });

                // Asociar los productos con cada pedido
                const pedidosPreparados = pedidosRecibidos.map((pedido) => ({
                    ...pedido,

                    imagenVendedora: obtenerImagen(
                        pedido.imagenVendedora
                    ),

                    expandido: false,

                    productos:
                        productosPorPedido[String(pedido.id)] || [],
                }));

                setPedidos(pedidosPreparados);
            })
            .catch((error) => {
                console.error(
                    "Error al obtener los pedidos y sus productos:",
                    error
                );

                setError(
                    error.response?.data?.mensaje ||
                    "No se pudieron cargar los pedidos."
                );
            })
            .finally(() => {
                setCargando(false);
            });
    }, []);

    // Desplegar o contraer un pedido
    const alternarPedido = (idPedido) => {
        setPedidos((actuales) =>
            actuales.map((pedido) =>
                pedido.id === idPedido
                    ? {
                        ...pedido,
                        expandido: !pedido.expandido,
                    }
                    : pedido
            )
        );
    };

    // MODIFICAR CANTIDAD DE UN PRODUCTO
    const cambiarCantidad = (idPedido, productoId, cambio) => {
        const pedido = pedidos.find(
            (pedido) => pedido.id === idPedido
        );

        if (!pedido) return;

        const producto = pedido.productos.find(
            (producto) => producto.id === productoId
        );

        if (!producto) return;

        // Calcular nueva cantidad
        const nuevaCantidad =
            Number(producto.cantidad) + cambio;

        // Validar cantidad y stock
        if (
            nuevaCantidad < 1 ||
            nuevaCantidad > Number(producto.stock)
        ) {
            return;
        }

        // Evitar solicitudes repetidas
        if (itemsProcesando.includes(productoId)) return;

        const token = localStorage.getItem("token");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        setItemsProcesando((actuales) => [
            ...actuales,
            productoId,
        ]);

        // Actualizar cantidad en el backend
        axios.patch(
            `${URL_PEDIDO_ITEMS}/${productoId}`,
            {
                cantidad: nuevaCantidad,
            },
            config
        )
            .then((respuesta) => {

                // Actualizar cantidad en pantalla
                setPedidos((actuales) =>
                    actuales.map((pedido) =>
                        pedido.id === idPedido
                            ? {
                                ...pedido,
                                productos: pedido.productos.map(
                                    (producto) =>
                                        producto.id === productoId
                                            ? {
                                                ...producto,
                                                cantidad: respuesta.data.cantidad,
                                            }
                                            : producto
                                ),
                            }
                            : pedido
                    )
                );

            })
            .catch((error) => {
                console.error(
                    "Error al modificar la cantidad:",
                    error
                );

                alert(
                    error.response?.data?.mensaje ||
                    "No se pudo modificar la cantidad."
                );
            })
            .finally(() => {
                setItemsProcesando((actuales) =>
                    actuales.filter((id) => id !== productoId)
                );
            });
    };

    // ELIMINAR UN PRODUCTO DEL CARRITO
    const eliminarProducto = (idPedido, productoId) => {
        // Evitar solicitudes repetidas
        if (itemsProcesando.includes(productoId)) return;

        const token = localStorage.getItem("token");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        setItemsProcesando((actuales) => [
            ...actuales,
            productoId,
        ]);

        // Eliminar producto en el backend
        axios.delete(
            `${URL_PEDIDO_ITEMS}/${productoId}`,
            config
        )
            .then(() => {

                // Quitar producto de la pantalla
                setPedidos((actuales) =>
                    actuales.map((pedido) =>
                        pedido.id === idPedido
                            ? {
                                ...pedido,
                                productos: pedido.productos.filter(
                                    (producto) => producto.id !== productoId
                                ),
                            }
                            : pedido
                    )
                );

            })
            .catch((error) => {
                console.error(
                    "Error al eliminar el producto:",
                    error
                );

                alert(
                    error.response?.data?.mensaje ||
                    "No se pudo eliminar el producto."
                );
            })
            .finally(() => {
                setItemsProcesando((actuales) =>
                    actuales.filter((id) => id !== productoId)
                );
            });
    };

    // Eliminar un pedido completo
    const eliminarPedido = (idPedido) => {
        if (pedidosProcesando.includes(idPedido)) return;

        const confirmar = window.confirm(
            "¿Estás segura de que querés eliminar este pedido?"
        );

        if (!confirmar) return;

        const token = localStorage.getItem("token");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        setPedidosProcesando((actuales) => [
            ...actuales,
            idPedido,
        ]);

        // Eliminar pedido en el backend
        axios.delete(`${URL_PEDIDOS}/${idPedido}`, config)
            .then(() => {

                // Actualizar la pantalla cuando se confirme la eliminación
                setPedidos((actuales) =>
                    actuales.filter((pedido) => pedido.id !== idPedido)
                );

            })
            .catch((error) => {
                console.error("Error al eliminar el pedido:", error);

                alert(
                    error.response?.data?.mensaje ||
                    "No se pudo eliminar el pedido."
                );
            })
            .finally(() => {
                setPedidosProcesando((actuales) =>
                    actuales.filter((id) => id !== idPedido)
                );
            });
    };

    // Calcular subtotal de cada pedido
    const calcularSubtotal = (productos) =>
        productos.reduce(
            (total, producto) =>
                total +
                Number(producto.precio || 0) *
                Number(producto.cantidad || 0),
            0
        );

    // Calcular total de compra
    const totalCompra = pedidos.reduce(
        (total, pedido) =>
            total + calcularSubtotal(pedido.productos),
        0
    );

    // VACIAR CARRITO
    const limpiarCarrito = () => {
        if (pedidosProcesando.length > 0 || limpiando) return;

        const pedidosPendientes = pedidos.filter(
            (pedido) => !pedido.estado
        );

        if (pedidosPendientes.length === 0) {
            alert("No tenés pedidos pendientes para eliminar.");
            return;
        }

        const confirmar = window.confirm(
            "¿Estás segura de que querés eliminar todos los pedidos pendientes del carrito?"
        );

        if (!confirmar) return;

        const token = localStorage.getItem("token");

        setLimpiando(true);

        axios.delete(
            `${URL_PEDIDOS}/limpiar`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((respuesta) => {
                // Eliminar de la pantalla únicamente los pedidos pendientes.
                setPedidos((actuales) =>
                    actuales.filter((pedido) => pedido.estado)
                );

                alert(respuesta.data.mensaje);
            })
            .catch((error) => {
                console.error("Error al limpiar el carrito:", error);

                alert(
                    error.response?.data?.mensaje ||
                    "No se pudo vaciar el carrito."
                );
            })
            .finally(() => {
                setLimpiando(false);
            });
    };

    // CONTACTAR AL VENDEDOR POR WHATSAPP
    const contactarWhatsapp = (pedido, subtotal) => {
        if (!pedido.telefono || pedido.productos.length === 0) {
            alert("No se puede contactar al vendedor.");
            return;
        }

        const url = generarUrlWhatsapp(pedido, subtotal);

        // Abrir WhatsApp
        window.open(url, "_blank");

        // Si ya tiene estado, no hace falta modificarlo.
        if (pedido.estado) return;

        const token = localStorage.getItem("token");

        axios.patch(
            `${URL_PEDIDOS}/${pedido.id}/contacto`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((respuesta) => {
                // Actualizar el estado del pedido en pantalla.
                setPedidos((actuales) =>
                    actuales.map((actual) =>
                        actual.id === pedido.id
                            ? {
                                ...actual,
                                estado: respuesta.data.estado,
                            }
                            : actual
                    )
                );
            })
            .catch((error) => {
                console.error("Error al cambiar el estado del pedido:", error);

                alert(
                    error.response?.data?.mensaje ||
                    "WhatsApp se abrió, pero no se pudo actualizar el estado del pedido."
                );
            });
    };

    return (
        <PanelDesplegable
            titulo="Carrito"
            icono="shopping_cart"
            className="Carrito"
            onClose={onCerrar}
        >
            <div className="Carrito__layout">

                <Link
                    className="Carrito__ayuda"
                    to="/preguntas-frecuentes"
                >
                    ¿Cómo funcionan los estados del pedido?
                </Link>

                <div className="Carrito__pedidos">

                    {cargando ? (
                        <p className="Carrito__vacio">
                            Cargando pedidos...
                        </p>

                    ) : error ? (
                        <p className="Carrito__vacio">
                            {error}
                        </p>

                    ) : pedidos.length > 0 ? (

                        pedidos.map((pedido) => {
                            const subtotal = calcularSubtotal(
                                pedido.productos
                            );

                            return (
                                <section
                                    className="Carrito__pedido"
                                    key={pedido.id}
                                >

                                    <header className="Carrito__pedidoEncabezado">

                                        <img
                                            className="Carrito__vendedoraImagen"
                                            src={
                                                pedido.imagenVendedora ||
                                                "/imagen-default.png"
                                            }
                                            alt={`Foto de ${pedido.usuario}`}
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src =
                                                    "/imagen-default.png";
                                            }}
                                        />

                                        <div className="Carrito__vendedoraDatos">

                                            <div className="Carrito__vendedoraLinea">

                                                <span className="Carrito__usuario">
                                                    {pedido.usuario}
                                                </span>

                                                {pedido.estado && (
                                                    <span
                                                        className={`Carrito__estado Carrito__estado--${
                                                            aparienciaEstado[pedido.estado]?.clase ||
                                                            "contacto"
                                                        }`}
                                                    >
                                                        <span
                                                            className="material-symbols-outlined"
                                                            aria-hidden="true"
                                                        >
                                                            {
                                                                aparienciaEstado[pedido.estado]?.icono ||
                                                                "schedule"
                                                            }
                                                        </span>

                                                        {pedido.estado}
                                                    </span>
                                                )}

                                            </div>

                                            <span className="Carrito__subtotal">
                                                SubTotal: {formatearPrecio(subtotal)}
                                            </span>

                                        </div>

                                        <button
                                            className="Carrito__botonDesplegar"
                                            type="button"
                                            aria-expanded={pedido.expandido}
                                            onClick={() =>
                                                alternarPedido(pedido.id)
                                            }
                                        >
                                            <span
                                                className={`material-symbols-outlined Carrito__desplegar${
                                                    pedido.expandido
                                                        ? " Carrito__desplegar--abierto"
                                                        : ""
                                                }`}
                                                aria-hidden="true"
                                            >
                                                expand_more
                                            </span>
                                        </button>

                                    </header>

                                    {pedido.expandido && (
                                        <>

                                            <div className="Carrito__productos">

                                                {pedido.productos.length > 0 ? (

                                                    pedido.productos.map((producto) => (
                                                        <ProductoCarrito
                                                            key={producto.id}
                                                            producto={producto}
                                                            editable={
                                                                !pedido.estado &&
                                                                !itemsProcesando.includes(producto.id)
                                                            }
                                                            onCambiarCantidad={(cambio) =>
                                                                cambiarCantidad(
                                                                    pedido.id,
                                                                    producto.id,
                                                                    cambio
                                                                )
                                                            }
                                                            onEliminar={() =>
                                                                eliminarProducto(
                                                                    pedido.id,
                                                                    producto.id
                                                                )
                                                            }
                                                        />
                                                    ))

                                                ) : (
                                                    <p className="Carrito__vacio">
                                                        Este pedido todavía no tiene productos.
                                                    </p>
                                                )}

                                            </div>

                                            <div className="Carrito__accionesPedido">

                                                <button
                                                    className="Carrito__contactar"
                                                    type="button"
                                                    onClick={() =>
                                                        contactarWhatsapp(
                                                            pedido,
                                                            subtotal
                                                        )
                                                    }
                                                    disabled={
                                                        pedido.productos.length === 0
                                                    }
                                                >
                                                    <img
                                                        src={iconoWhatsapp}
                                                        alt=""
                                                        aria-hidden="true"
                                                    />

                                                    Contactar Al Whatsapp
                                                </button>

                                                <button
                                                    className="Carrito__eliminarPedido"
                                                    type="button"
                                                    title="Eliminar pedido"
                                                    disabled={pedidosProcesando.includes(pedido.id)}
                                                    onClick={() => eliminarPedido(pedido.id)}
                                                >
                                                    <span
                                                        className="material-symbols-outlined"
                                                        aria-hidden="true"
                                                    >
                                                        delete_outline
                                                    </span>
                                                </button>

                                            </div>

                                        </>
                                    )}

                                </section>
                            );
                        })

                    ) : (
                        <p className="Carrito__vacio">
                            Tu carrito está vacío.
                        </p>
                    )}

                </div>

                <footer className="Carrito__resumen">

                    <div className="Carrito__total">
                        <span>Total de compra:</span>

                        <strong>
                            {formatearPrecio(totalCompra)}
                        </strong>
                    </div>

                    <Link
                        className="Carrito__seguir"
                        to="/boutique"
                    >
                        <span
                            className="material-symbols-outlined"
                            aria-hidden="true"
                        >
                            shopping_bag
                        </span>

                        Seguir Explorando
                    </Link>

                    <button
                        className="Carrito__limpiar"
                        type="button"
                        onClick={limpiarCarrito}
                        disabled={limpiando}
                    >
                        <span
                            className="material-symbols-outlined"
                            aria-hidden="true"
                        >
                            delete_outline
                        </span>

                        {limpiando ? "Vaciando carrito..." : "Limpiar carrito"}
                    </button>

                </footer>

            </div>
        </PanelDesplegable>
    );
}
