import PanelDesplegable from "../panelDesplegable/PanelDesplegable";
import iconoWhatsapp from "../../assets/logo wsp mi armario.svg";
import ProductoCarrito from "./productoCarrito/ProductoCarrito";
import "./carrito.css";

const imagenVendedora = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&h=96&q=80";

const pedidos = [
  {
    usuario: "@user67",
    subtotal: "$20.000",
    expandido: true,
    productos: [
      { nombre: "Remera rayas", precio: "$10.000", cantidad: 1 },
      { nombre: "Remera rayas", precio: "$10.000", cantidad: 1 },
    ],
  },
  {
    usuario: "@sigma",
    estado: "En contacto",
    subtotal: "$20.000",
    expandido: false,
    productos: [],
  },
];

export default function Carrito() {
  return (
    <PanelDesplegable titulo="Carrito" icono="shopping_cart" className="Carrito">
      <div className="Carrito__layout">
        <a className="Carrito__ayuda" href="#estados-del-pedido">
          ¿Cómo funcionan los estados del pedido?
        </a>

        <div className="Carrito__pedidos" aria-label="Pedidos en el carrito">
          {pedidos.map((pedido) => (
            <section className="Carrito__pedido" key={pedido.usuario}>
              <header className="Carrito__pedidoEncabezado">
                <img className="Carrito__vendedoraImagen" src={imagenVendedora} alt="" />
                <div className="Carrito__vendedoraDatos">
                  <div className="Carrito__vendedoraLinea">
                    <span className="Carrito__usuario">{pedido.usuario}</span>
                    {pedido.estado && (
                      <span className="Carrito__estado">
                        <span className="material-symbols-outlined" aria-hidden="true">timer</span>
                        {pedido.estado}
                      </span>
                    )}
                  </div>
                  <span className="Carrito__subtotal">SubTotal: {pedido.subtotal}</span>
                </div>
                <span className={`material-symbols-outlined Carrito__desplegar${pedido.expandido ? " Carrito__desplegar--abierto" : ""}`} aria-hidden="true">
                  expand_more
                </span>
              </header>

              {pedido.expandido && (
                <>
                  <div className="Carrito__productos">
                    {pedido.productos.map((producto, indice) => (
                      <ProductoCarrito key={`${pedido.usuario}-${indice}`} producto={producto} />
                    ))}
                  </div>
                  <button className="Carrito__contactar" type="button">
                    <img src={iconoWhatsapp} alt="" aria-hidden="true" />
                    Contactar Al Whatsapp
                  </button>
                </>
              )}
            </section>
          ))}
        </div>

        <footer className="Carrito__resumen">
          <div className="Carrito__total">
            <span>Total de compra:</span>
            <strong>$60.000</strong>
          </div>
          <button className="Carrito__seguir" type="button">
            <span className="material-symbols-outlined" aria-hidden="true">shopping_bag</span>
            Seguir Explorando
          </button>
          <button className="Carrito__limpiar" type="button">
            <span className="material-symbols-outlined" aria-hidden="true">delete_outline</span>
            Limpiar carrito
          </button>
        </footer>
      </div>
    </PanelDesplegable>
  );
}
