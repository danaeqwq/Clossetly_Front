import "./FavoritosIntercambio.css"
import "../../../styles/global.css"
import "../../../styles/variables.css"
import TarjetaTrade from "../../../componentes/tarjetaIntercambio/TarjetaIntercambio"

export default function Favoritos() {
    return (
        <main className="Explorar">
            <div className="Explorar__filtros" aria-label="Categorías">
                <span className="Explorar__filtro">
                    <span className="material-symbols-outlined">apparel</span>
                    PRENDAS
                </span>

                <span className="Explorar__filtro ">
                    <span className="material-symbols-outlined">checkroom</span>
                    OUTFITS
                </span>

                <span className="Explorar__filtro Explorar__filtro--activo">
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
                <TarjetaTrade />
                <TarjetaTrade />
                <TarjetaTrade />
                <TarjetaTrade />
                <TarjetaTrade />
                <TarjetaTrade />
                <TarjetaTrade />
                <TarjetaTrade />

            </section>
        </main>
    );
}