import "./explorar.css";
import "../../styles/variables.css";

import TarjetaPrenda from "../../componentes/tarjetaPrenda/TarjetaPrenda";
import TarjetaConsejo from "../../componentes/tarjetaConsejo/TarjetaConsejo";
import TarjetaOutfit from "../../componentes/tarjetaOutfit/TarjetaOutfit";
import TarjetaVenta from "../../componentes/tarjetaVenta/TarjetaVenta";
import TarjetaIntercambio from "../../componentes/tarjetaIntercambio/TarjetaIntercambio";

export default function Explorar() {
  return (
    <main className="Explorar">
      <div className="Explorar__filtros" aria-label="Categorías">
        <span className="Explorar__filtro Explorar__filtro--activo">
          <span className="material-symbols-outlined">space_dashboard</span>
          TODOS
        </span>

        <span className="Explorar__filtro">
          <span className="material-symbols-outlined">checkroom</span>
          OUTFITS
        </span>

        <span className="Explorar__filtro">
          <span className="material-symbols-outlined">apparel</span>
          PRENDAS
        </span>

        <span className="Explorar__filtro">
          <span className="material-symbols-outlined">forum</span>
          CONSEJOS
        </span>
      </div>

      <section
        className="Explorar__grilla"
        aria-label="Publicaciones para explorar"
      >
        <TarjetaOutfit />
        <TarjetaIntercambio />
        <TarjetaVenta />
        <TarjetaOutfit />
        <TarjetaPrenda />
        <TarjetaConsejo />
        <TarjetaConsejo />
        <TarjetaPrenda />
        <TarjetaPrenda />
        <TarjetaOutfit />
        <TarjetaConsejo />
        <TarjetaConsejo />
      </section>
    </main>
  );
}
