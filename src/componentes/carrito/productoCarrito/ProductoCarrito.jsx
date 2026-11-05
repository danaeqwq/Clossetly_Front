import "./productoCarrito.css";

const imagenPrenda = "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=160&h=160&q=80";

export default function ProductoCarrito({ producto }) {
  return (
    <article className="ProductoCarrito">
      <img className="ProductoCarrito__imagen" src={imagenPrenda} alt={producto.nombre} />
      <div className="ProductoCarrito__datos">
        <span className="ProductoCarrito__nombre">{producto.nombre}</span>
        <span className="ProductoCarrito__precio">{producto.precio}</span>
      </div>
      <div className="ProductoCarrito__cantidad" aria-label={`Cantidad: ${producto.cantidad}`}>
        <button type="button" aria-label="Quitar una unidad">−</button>
        <span>{producto.cantidad}</span>
        <button type="button" aria-label="Agregar una unidad">+</button>
      </div>
      <button className="ProductoCarrito__eliminar" type="button" aria-label={`Quitar ${producto.nombre}`}>
        <span className="material-symbols-outlined" aria-hidden="true">delete_outline</span>
      </button>
    </article>
  );
}
