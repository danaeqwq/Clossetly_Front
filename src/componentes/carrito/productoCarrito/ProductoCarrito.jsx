import "./productoCarrito.css";

export default function ProductoCarrito({
    producto,
    onCambiarCantidad,
    onEliminar,
    editable = true,
}) {
    const imagen = producto.imagen || "/imagen-default.png";

    return (
        <article className="ProductoCarrito">
            <img
                className="ProductoCarrito__imagen"
                src={imagen}
                alt={producto.nombre}
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/imagen-default.png";
                }}
            />

            <div className="ProductoCarrito__datos">
                <span className="ProductoCarrito__nombre">
                    {producto.nombre}
                </span>

                <span className="ProductoCarrito__precio">
                    ${Number(producto.precio || 0).toLocaleString("es-AR")}
                </span>
            </div>

            <div
                className="ProductoCarrito__cantidad"
                aria-label={`Cantidad: ${producto.cantidad}`}
            >
                <button
                    type="button"
                    aria-label="Quitar una unidad"
                    onClick={() => onCambiarCantidad(-1)}
                    disabled={!editable || producto.cantidad <= 1}
                >
                    −
                </button>

                <span>{producto.cantidad}</span>

                <button
                    type="button"
                    aria-label="Agregar una unidad"
                    onClick={() => onCambiarCantidad(1)}
                    disabled={
                        !editable ||
                        producto.stock <= 0 ||
                        producto.cantidad >= producto.stock
                    }
                >
                    +
                </button>
            </div>

            <button
                className="ProductoCarrito__eliminar"
                type="button"
                aria-label={`Quitar ${producto.nombre}`}
                onClick={onEliminar}
                disabled={!editable}
            >
                <span
                    className="material-symbols-outlined"
                    aria-hidden="true"
                >
                    delete_outline
                </span>
            </button>
        </article>
    );
}