import "./FavoritosCompra.css"
import "../../../styles/global.css"
import "../../../styles/variables.css"
import TarjetaCompra from "../../../componentes/tarjetaVenta/TarjetaVenta"

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

                <span className="Explorar__filtro">
                    <span class="material-symbols-outlined">cached</span>
                    INTERCAMBIO
                </span>

                <span className="Explorar__filtro Explorar__filtro--activo">
                    <span class="material-symbols-outlined">shopping_basket</span>
                    COMPRA
                </span>
            </div>

            <section
                className="Explorar__grilla"
                aria-label="Publicaciones para explorar"
            >
                <TarjetaCompra />
                <TarjetaCompra />
                <TarjetaCompra />
                <TarjetaCompra />
                <TarjetaCompra />
                <TarjetaCompra />
                <TarjetaCompra />
                <TarjetaCompra />
                <TarjetaCompra />
                <TarjetaCompra />

            </section>
        </main>
    );
}