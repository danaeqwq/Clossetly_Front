import "./boutique.css";
import "../../styles/variables.css";
import "../../styles/global.css"
import Select from "../../componentes/select/Select";
import TarjetaIntercambio from "../../componentes/tarjetaIntercambio/TarjetaIntercambio";
import TarjetaVenta from "../../componentes/tarjetaVenta/TarjetaVenta";

const filtrosBoutique = [
  { valor: "intercambio", texto: "INTERCAMBIO", icono: "sync" },
  { valor: "todos", texto: "TODOS", icono: "sell" },
  { valor: "compra", texto: "COMPRA", icono: "shopping_basket" },
];

export default function Boutique() {
  return (
    <main className="Boutique">
      <div className="Boutique__filtros">
        <Select
          opciones={filtrosBoutique}
          seleccionada="todos"
          ariaLabel="Filtros de Boutique"
        />
      </div>

      <section
        className="Boutique__productos"
        aria-label="Productos de Boutique"
      >
        <TarjetaIntercambio />
        <TarjetaVenta />
        <TarjetaVenta />
        <TarjetaVenta />
        <TarjetaVenta />

        <TarjetaIntercambio />
        <TarjetaVenta />
        <TarjetaVenta />
        <TarjetaVenta />
        <TarjetaVenta />
      </section>
    </main>
  );
}