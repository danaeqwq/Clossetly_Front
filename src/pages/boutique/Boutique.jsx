
import { useState } from "react";

import "./boutique.css";
import "../../styles/variables.css";
import "../../styles/global.css";

import Select from "../../componentes/select/Select";
import TarjetaIntercambio from "../../componentes/tarjetaIntercambio/TarjetaIntercambio";
import TarjetaVenta from "../../componentes/tarjetaVenta/TarjetaVenta";
import FiltrosTodo from "../../componentes/filtros/FiltrosTodo";

const filtrosBoutique = [
  { valor: "intercambio", texto: "INTERCAMBIO", icono: "autorenew" },
  { valor: "todos", texto: "TODOS", icono: "sell" },
  { valor: "compra", texto: "COMPRA", icono: "shopping_basket" },
];

const productos = [
  {
    id: 1,
    tipo: "intercambio",
    nombre: "Vestido art",
    talle: "M",
    imagen:
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=700&q=85",
    alt: "Vestido color terracota con estampado floral",
  },
  {
    id: 2,
    tipo: "compra",
    nombre: "Remera rayas",
    precio: 10000,
    imagen:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=85",
    alt: "Remera a rayas rosa y blanca",
  },
  {
    id: 3,
    tipo: "compra",
    nombre: "Remera básica",
    precio: 8000,
    imagen:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85",
    alt: "Remera básica",
  },
  {
    id: 4,
    tipo: "compra",
    nombre: "Campera",
    precio: 25000,
    imagen:
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=700&q=85",
    alt: "Campera",
  },
  {
    id: 5,
    tipo: "compra",
    nombre: "Buzo",
    precio: 18000,
    imagen:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85",
    alt: "Buzo",
  },
  {
    id: 6,
    tipo: "intercambio",
    nombre: "Pollera floral",
    talle: "S",
    imagen:
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=700&q=85",
    alt: "Pollera floral",
  },
  {
    id: 7,
    tipo: "compra",
    nombre: "Jeans",
    precio: 22000,
    imagen:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=85",
    alt: "Jeans",
  },
  {
    id: 8,
    tipo: "compra",
    nombre: "Camisa",
    precio: 15000,
    imagen:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=85",
    alt: "Camisa",
  },
  {
    id: 9,
    tipo: "compra",
    nombre: "Top",
    precio: 7000,
    imagen:
      "https://images.unsplash.com/photo-1564257577-1c6f7f8f8e2e?auto=format&fit=crop&w=700&q=85",
    alt: "Top",
  },
  {
    id: 10,
    tipo: "compra",
    nombre: "Sweater",
    precio: 19000,
    imagen:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=85",
    alt: "Sweater",
  },
];

export default function Boutique() {
  const [filtro, setFiltro] = useState("todos");

  const productosFiltrados = productos.filter((producto) => {
    return filtro === "todos" || producto.tipo === filtro;
  });

  return (
    <main className="Boutique">
      <div className="Boutique__filtros">
        <Select
          opciones={filtrosBoutique}
          seleccionada={filtro}
          ariaLabel="Filtros de Boutique"
          onChange={setFiltro}
        />
      </div>

      <section
        className="Boutique__productos"
        aria-label="Productos de Boutique"
      >
        {productosFiltrados.map((producto) =>
          producto.tipo === "intercambio" ? (
            <TarjetaIntercambio
              key={producto.id}
              producto={producto}
            />
          ) : (
            <TarjetaVenta
              key={producto.id}
              producto={producto}
            />
          )
        )}
      </section>

    </main>
  );
}
