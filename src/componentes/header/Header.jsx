import "./header.css";

export default function Header() {
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
                Explorar
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
                        className="material-symbols-outlined"
                        aria-hidden="true"
                    >
                        search
                    </span>
                </label>

                <button
                    className="Header__icono"
                    type="button"
                    aria-label="Carrito de compras"
                >
                    <span className="material-symbols-outlined">
                        shopping_cart
                    </span>
                </button>

                <button
                    className="Header__icono"
                    type="button"
                    aria-label="Filtros"
                >
                    <span className="material-symbols-outlined">
                        tune
                    </span>
                </button>
            </div>
        </header>
    );
}