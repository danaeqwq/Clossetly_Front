import "./FavoritosPrendas.css"
import "../../../styles/global.css"
import "../../../styles/variables.css"
import TarjetaPrenda from "../../../componentes/tarjetaPrenda/TarjetaPrenda"

export default function Favoritos() {
    return (
        <main className="Explorar">
            <div className="Explorar__filtros" aria-label="Categorías">
                <span className="Explorar__filtro Explorar__filtro--activo">
                    <span className="material-symbols-outlined">apparel</span>
                    PRENDAS
                </span>

                <span className="Explorar__filtro">
                    <span className="material-symbols-outlined">checkroom</span>
                    OUTFITS
                </span>

                <span className="Explorar__filtro">
                    <span class="material-symbols-outlined">cached</span>
                    INTERCAMBIO
                </span>

                <span className="Explorar__filtro">
                    <span class="material-symbols-outlined">shopping_basket</span>
                    COMPRA
                </span>
            </div>

            <section
                className="Explorar__grilla"
                aria-label="Publicaciones para explorar"
            >
                <TarjetaPrenda />
                <TarjetaPrenda />
                <TarjetaPrenda />
                <TarjetaPrenda />
                <TarjetaPrenda />
                <TarjetaPrenda />
                <TarjetaPrenda />
                <TarjetaPrenda />
                <TarjetaPrenda />
                <TarjetaPrenda />
            </section>
        </main>
    );
}
