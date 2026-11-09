import "./header.css";
import "../../styles/global.css"
import iconoFavoritos from "../../assets/componentes/icono favoritos.svg";
import iconoCampana from "../../assets/componentes/icono campana.svg";
import { useLocation } from "react-router";

const nombresSeccion = {
    "/admin": "Administración",
    "/boutique": "Boutique",
    "/explorar": "Explorar",
    "/perfil": "Mi cuenta",
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
    const esBoutique = pathname === "/boutique";
    const nombreSeccion = nombresSeccion[pathname] || seccion;

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
        </header>
    );
}
