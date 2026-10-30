import "./explorar.css";
import "../../styles/variables.css";
import "../../styles/global.css";

import TarjetaPrenda from "../../componentes/tarjetaPrenda/TarjetaPrenda";
import TarjetaConsejo from "../../componentes/tarjetaConsejo/TarjetaConsejo";
import TarjetaOutfit from "../../componentes/tarjetaOutfit/TarjetaOutfit";
import TarjetaVenta from "../../componentes/tarjetaVenta/TarjetaVenta";
import TarjetaIntercambio from "../../componentes/tarjetaIntercambio/TarjetaIntercambio";

import Select from "../../componentes/select/Select";
import FormularioCrearConsulta from "./modales/FormularioCrearConsulta";

const opcionesExplorar = [
  {
    valor: "todos",
    texto: "TODOS",
    icono: "space_dashboard",
  },
  {
    valor: "outfits",
    texto: "OUTFITS",
    icono: "checkroom",
  },
  {
    valor: "prendas",
    texto: "PRENDAS",
    icono: "apparel",
  },
  {
    valor: "consejos",
    texto: "CONSEJOS",
    icono: "forum",
  },
];

export default function Explorar() {
  return (
    <main className="Explorar">
      <div className="Explorar__filtros">
        <Select opciones={opcionesExplorar} ariaLabel="Categorías de publicaciones" />
        <button className="Explorar__crearConsulta" type="button">
          + Crear consulta
        </button>
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
