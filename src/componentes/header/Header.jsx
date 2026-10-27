import "./header.css";
import "../../styles/global.css"
import iconoFavoritos from "../../assets/componentes/icono favoritos.svg";
import iconoCampana from "../../assets/componentes/icono campana.svg";
export default function Header({ seccion = "Explorar" }) {
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
                {seccion}
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

                    <span className="Header__buscadorIcono material-symbols-outlined" aria-hidden="true">search</span>
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
                    aria-label="Notificaciones"
                >
                    <img src={iconoCampana} alt="" />
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
