
import { useState } from "react";
import PanelDesplegable from "../panelDesplegable/PanelDesplegable";
import { Link } from "react-router";
import iconoWhatsapp from "../../assets/logo wsp mi armario.svg";
import ProductoCarrito from "./productoCarrito/ProductoCarrito";
import "./carrito.css";

// Imagen de perfil de los vendedores
const imagenVendedora =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&h=96&q=80";

// Productos y pedidos de prueba
const pedidosIniciales = [
  {
    usuario: "@user67",
    telefono: "5492901650809",
    estado: null,
    expandido: false,
    productos: [
      { id: 1, nombre: "Remera rayas", precio: 10000, cantidad: 1, stock: 0 },
      { id: 2, nombre: "Remera negra", precio: 12000, cantidad: 1, stock: 3 },
    ],
  },
  {
    usuario: "@sigma",
    telefono: "5492901000001",
    estado: "En contacto",
    expandido: false,
    productos: [
      { id: 1, nombre: "Remera rayas", precio: 10000, cantidad: 1, stock: 5 },
      { id: 2, nombre: "Remera negra", precio: 12000, cantidad: 1, stock: 3 },
    ],
  },
  {
    usuario: "@luna",
    telefono: "5492901000002",
    estado: "Confirmado",
    expandido: false,
    productos: [
      { id: 1, nombre: "Remera rayas", precio: 10000, cantidad: 1, stock: 5 },
      { id: 2, nombre: "Remera negra", precio: 12000, cantidad: 1, stock: 3 },
    ],
  },
  {
    usuario: "@mora",
    telefono: "5492901000003",
    estado: "Completado",
    expandido: false,
    productos: [
      { id: 1, nombre: "Remera rayas", precio: 10000, cantidad: 1, stock: 5 },
      { id: 2, nombre: "Remera negra", precio: 12000, cantidad: 1, stock: 3 },
    ],
  },
];

// Formatear precios
const formatearPrecio = (precio) =>
  `$${precio.toLocaleString("es-AR")}`;

// Generar mensaje para WhatsApp
const contactarWhatsapp = (pedido, subtotal) => {
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

  const url = `https://wa.me/${pedido.telefono}?text=${encodeURIComponent(
    mensaje
  )}`;

  window.open(url, "_blank");
};

const aparienciaEstado = {
  "En contacto": { icono: "schedule", clase: "contacto" },
  Confirmado: { icono: "check", clase: "confirmado" },
  Completado: { icono: "verified", clase: "completado" },
};

export default function Carrito({ onCerrar }) {
  const [pedidos, setPedidos] = useState(pedidosIniciales);

  // Desplegar o contraer un pedido
  const alternarPedido = (usuario) => {
    setPedidos((actuales) =>
      actuales.map((pedido) =>
        pedido.usuario === usuario
          ? { ...pedido, expandido: !pedido.expandido }
          : pedido
      )
    );
  };

  // Modificar la cantidad de un producto según el stock disponible
  const cambiarCantidad = (usuario, productoId, cambio) => {
    setPedidos((actuales) =>
      actuales.map((pedido) =>
        pedido.usuario === usuario
          ? {
              ...pedido,
              productos: pedido.productos.map((producto) => {
                if (producto.id !== productoId) return producto;

                if (producto.stock <= 0) return producto;

                return {
                  ...producto,
                  cantidad: Math.min(
                    producto.stock,
                    Math.max(1, producto.cantidad + cambio)
                  ),
                };
              }),
            }
          : pedido
      )
    );
  };

  // Eliminar un producto
  const eliminarProducto = (usuario, productoId) => {
    setPedidos((actuales) =>
      actuales.map((pedido) =>
        pedido.usuario === usuario
          ? {
              ...pedido,
              productos: pedido.productos.filter(
                (producto) => producto.id !== productoId
              ),
            }
          : pedido
      )
    );
  };

  // Eliminar el pedido completo
  const eliminarPedido = (usuario) => {
    setPedidos((actuales) =>
      actuales.filter((pedido) => pedido.usuario !== usuario)
    );
  };

  // Calcular subtotal de cada pedido
  const calcularSubtotal = (productos) =>
    productos.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );

  // Calcular total de compra
  const totalCompra = pedidos.reduce(
    (total, pedido) => total + calcularSubtotal(pedido.productos),
    0
  );

  // Vaciar carrito
  const limpiarCarrito = () => {
    setPedidos([]);
  };

  return (
    <PanelDesplegable
      titulo="Carrito"
      icono="shopping_cart"
      className="Carrito"
      onClose={onCerrar}
    >
      <div className="Carrito__layout">
        <Link className="Carrito__ayuda" to="/preguntas-frecuentes">
          ¿Cómo funcionan los estados del pedido?
        </Link>

        <div className="Carrito__pedidos" aria-label="Pedidos en el carrito">
          {pedidos.length > 0 ? (
            pedidos.map((pedido) => {
              const subtotal = calcularSubtotal(pedido.productos);

              return (
                <section className="Carrito__pedido" key={pedido.usuario}>
                  <header className="Carrito__pedidoEncabezado">
                    <img
                      className="Carrito__vendedoraImagen"
                      src={imagenVendedora}
                      alt=""
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
                              {aparienciaEstado[pedido.estado]?.icono ||
                                "schedule"}
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
                      aria-label={`${
                        pedido.expandido ? "Contraer" : "Expandir"
                      } pedido de ${pedido.usuario}`}
                      aria-expanded={pedido.expandido}
                      onClick={() => alternarPedido(pedido.usuario)}
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
                              editable={!pedido.estado}
                              onCambiarCantidad={(cambio) =>
                                cambiarCantidad(
                                  pedido.usuario,
                                  producto.id,
                                  cambio
                                )
                              }
                              onEliminar={() =>
                                eliminarProducto(pedido.usuario, producto.id)
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
                          onClick={() => contactarWhatsapp(pedido, subtotal)}
                          disabled={pedido.productos.length === 0}
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
                          aria-label={`Eliminar todo el pedido de ${pedido.usuario}`}
                          title="Eliminar pedido"
                          onClick={() => eliminarPedido(pedido.usuario)}
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
            <p className="Carrito__vacio">Tu carrito está vacío.</p>
          )}
        </div>

        <footer className="Carrito__resumen">
          <div className="Carrito__total">
            <span>Total de compra:</span>
            <strong>{formatearPrecio(totalCompra)}</strong>
          </div>

          <Link className="Carrito__seguir" to="/boutique">
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
          >
            <span
              className="material-symbols-outlined"
              aria-hidden="true"
            >
              delete_outline
            </span>
            Limpiar carrito
          </button>
        </footer>
      </div>
    </PanelDesplegable>
  );
}
