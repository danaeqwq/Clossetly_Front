import { useState } from "react";

import "./boutique.css";
import "../../styles/variables.css";
import "../../styles/global.css";

import Select from "../../componentes/select/Select";
import TarjetaIntercambio from "../../componentes/tarjetaIntercambio/TarjetaIntercambio";
import TarjetaVenta from "../../componentes/tarjetaVenta/TarjetaVenta";
import Filtros from "../../componentes/filtros/Filtros";

// Filtros de Boutique
const filtrosBoutique = [
  { valor: "intercambio", texto: "INTERCAMBIO", icono: "autorenew" },
  { valor: "todos", texto: "TODOS", icono: "sell" },
  { valor: "compra", texto: "COMPRA", icono: "shopping_basket" },
];

// Colores de las tarjetas
const coloresTarjeta = {
  morado: "#755f85",
  negro: "#332D37",
  verde: "#5C7865",
  azul: "#6273AA",
  rojo: "#A14D58",
  rojo1: "#B91C1C",
  verde1: "#87947A",
  rosa: "#C69FAC",
  naranja: "#D78C6E",
  amarillo: "#F2C27F",
  blanco: "#FFFFFF",
};

const nivelEstado = { "COMO NUEVO": 0, "COMO NUEVA": 0, "MUY BUENO": 1, BUENO: 2 };

// Productos de prueba
const productos = [
  {
    id: 1,
    tipo: "intercambio",
    nombre: "Vestido art",
    prenda: "Cortos",
    talle: "M",
    color: "naranja",
    colores: ["rojo", "naranja"],
    temporada: "VERANO",
    estado: "MUY BUENO",
    ocasion: "FIESTA",
    genero: "MUJER",
    estilos: ["Vintage", "Boho Chic"],
    tiposAceptados: ["Remeras", "Pantalones"],
    estadoMinimoAceptado: "MUY BUENO",
    tallesBuscados: ["S", "M"],
    imagen:
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=700&q=85",
    alt: "Vestido color terracota con estampado floral",
  },
  {
    id: 2,
    tipo: "compra",
    nombre: "Remera rayas",
    prenda: "Remeras",
    talle: "S",
    precio: 10000,
    color: "rosa",
    colores: ["rosa", "blanco"],
    temporada: "PRIMAVERA",
    estado: "COMO NUEVA",
    ocasion: "CASUAL",
    genero: "MUJER",
    estilos: ["Coquette", "Clean Girl"],
    imagen:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=85",
    alt: "Remera a rayas rosa y blanca",
  },
  {
    id: 3,
    tipo: "compra",
    nombre: "Remera básica",
    prenda: "Remeras",
    talle: "M",
    precio: 8000,
    color: "blanco",
    colores: ["blanco"],
    temporada: "VERANO",
    estado: "COMO NUEVA",
    ocasion: "CASUAL",
    genero: "UNISEX",
    estilos: ["Streetwear", "Clean Girl"],
    imagen:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85",
    alt: "Remera básica",
  },
  {
    id: 4,
    tipo: "compra",
    nombre: "Campera",
    prenda: "Camperas",
    talle: "L",
    precio: 25000,
    color: "negro",
    colores: ["negro"],
    temporada: "INVIERNO",
    estado: "MUY BUENO",
    ocasion: "CASUAL",
    genero: "MUJER",
    estilos: ["Darkwear", "Goth"],
    imagen:
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=700&q=85",
    alt: "Campera",
  },
  {
    id: 5,
    tipo: "compra",
    nombre: "Buzo",
    prenda: "Camperas",
    talle: "M",
    precio: 18000,
    color: "rojo",
    colores: ["rojo"],
    temporada: "INVIERNO",
    estado: "BUENO",
    ocasion: "CASUAL",
    genero: "UNISEX",
    estilos: ["Deportivo", "Streetwear"],
    imagen:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85",
    alt: "Buzo",
  },
  {
    id: 6,
    tipo: "intercambio",
    nombre: "Pollera floral",
    prenda: "Cortos",
    talle: "S",
    color: "verde1",
    colores: ["verde", "amarillo"],
    temporada: "PRIMAVERA",
    estado: "COMO NUEVA",
    ocasion: "CASUAL",
    genero: "MUJER",
    estilos: ["Cottagecore", "Boho Chic"],
    tiposAceptados: ["Accesorios"],
    estadoMinimoAceptado: "COMO NUEVA",
    tallesBuscados: ["S", "M"],
    imagen:
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=700&q=85",
    alt: "Pollera floral",
  },
  {
    id: 7,
    tipo: "compra",
    nombre: "Jeans",
    prenda: "Pantalones",
    talle: "M",
    precio: 22000,
    color: "azul",
    colores: ["azul"],
    temporada: "OTOÑO",
    estado: "MUY BUENO",
    ocasion: "CASUAL",
    genero: "UNISEX",
    estilos: ["Vintage", "Skater"],
    imagen:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=85",
    alt: "Jeans",
  },
  {
    id: 8,
    tipo: "compra",
    nombre: "Camisa",
    prenda: "Remeras",
    talle: "M",
    precio: 15000,
    color: "amarillo",
    colores: ["amarillo", "blanco"],
    temporada: "PRIMAVERA",
    estado: "COMO NUEVA",
    ocasion: "FORMAL",
    genero: "MUJER",
    estilos: ["Old Money", "Preppy"],
    imagen:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=85",
    alt: "Camisa",
  },
  {
    id: 9,
    tipo: "compra",
    nombre: "Top",
    prenda: "Remeras",
    talle: "S",
    precio: 7000,
    color: "morado",
    colores: ["morado"],
    temporada: "VERANO",
    estado: "BUENO",
    ocasion: "FIESTA",
    genero: "MUJER",
    estilos: ["Y2K", "Gyaru"],
    imagen:
      "https://images.unsplash.com/photo-1564257577-1c6f7f8f8e2e?auto=format&fit=crop&w=700&q=85",
    alt: "Top",
  },
  {
    id: 10,
    tipo: "compra",
    nombre: "Sweater",
    prenda: "Camperas",
    talle: "L",
    precio: 19000,
    color: "naranja",
    colores: ["naranja"],
    temporada: "INVIERNO",
    estado: "MUY BUENO",
    ocasion: "FORMAL",
    genero: "UNISEX",
    estilos: ["Dark Academia", "Old Money"],
    imagen:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=85",
    alt: "Sweater",
  },
];

export default function Boutique() {
  const [filtro, setFiltro] = useState("todos");
  const [categoriasActivas, setCategoriasActivas] = useState([]);
  const [mostrarTodasCategorias, setMostrarTodasCategorias] = useState(false);
  const [criterios, setCriterios] = useState({ colores: [], tiposAceptados: [], ordenPrecio: "MAYOR MENOR" });

  const productosFiltrados = productos
    .filter((producto) => filtro === "todos" || producto.tipo === filtro)
    .filter((producto) => {
      const campos = [
        ["prenda", criterios.prenda],
        ["talle", criterios.talle],
        ["temporada", criterios.temporada],
        ["estado", criterios.estado],
        ["ocasion", criterios.ocasion],
        ["genero", criterios.genero],
      ];
      const coincideCampos = campos.every(([campo, valor]) => !valor || producto[campo] === valor);
      const coincideColor = !criterios.colores?.length || criterios.colores.some((color) => producto.colores?.includes(color));
      const coincideEstilo = !categoriasActivas.length || categoriasActivas.some((estilo) => producto.estilos?.includes(estilo));
      const coincideTiposAceptados = filtro !== "intercambio" || !criterios.tiposAceptados?.length || criterios.tiposAceptados.some((item) => producto.tiposAceptados?.includes(item));
      const coincideEstadoMinimo = filtro !== "intercambio" || !criterios.estadoMinimoAceptado || nivelEstado[producto.estadoMinimoAceptado] <= nivelEstado[criterios.estadoMinimoAceptado];
      const coincideTalleBuscado = filtro !== "intercambio" || !criterios.talleBuscado || producto.tallesBuscados?.includes(criterios.talleBuscado);
      return coincideCampos && coincideColor && coincideEstilo && coincideTiposAceptados && coincideEstadoMinimo && coincideTalleBuscado;
    })
    .sort((a, b) => filtro !== "compra" ? 0 : criterios.ordenPrecio === "MENOR MAYOR" ? (a.precio || 0) - (b.precio || 0) : criterios.ordenPrecio === "MAYOR MENOR" ? (b.precio || 0) - (a.precio || 0) : 0);

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
      <Filtros
        tipo={filtro}
        onChange={setFiltro}
        categoriasActivas={categoriasActivas}
        setCategoriasActivas={setCategoriasActivas}
        mostrarTodasCategorias={mostrarTodasCategorias}
        setMostrarTodasCategorias={setMostrarTodasCategorias}
        criterios={criterios}
        setCriterios={setCriterios}
      />

      <div className="Boutique__contenido">
        <section className="Boutique__productos" aria-label="Productos de Boutique">
          {productosFiltrados.map((producto) => {
            const color = coloresTarjeta[producto.color] || "#A87975";
            const colorTexto = producto.color === "blanco" ? "#332D37" : "#FFFFFF";
            const colorAccion = producto.color === "blanco" ? "#332D37" : color;

            return producto.tipo === "intercambio" ? (
              <TarjetaIntercambio key={producto.id} producto={producto} color={color} colorTexto={colorTexto} colorAccion={colorAccion} />
            ) : (
              <TarjetaVenta key={producto.id} producto={producto} color={color} colorTexto={colorTexto} colorAccion={colorAccion} />
            );
          })}
        </section>

        {categoriasActivas.length > 0 && (
          <aside className="Boutique__categoriasActivas" aria-label="Categorías seleccionadas">
            <h2>ESTILOS</h2>
            {categoriasActivas.map((categoria) => (
              <button
                className="Boutique__categoriaActiva"
                type="button"
                key={categoria}
                aria-label={`Quitar ${categoria}`}
                onClick={() => setCategoriasActivas((actuales) => actuales.filter((activa) => activa !== categoria))}
              >
                <span>{categoria}</span><span aria-hidden="true">×</span>
              </button>
            ))}
          </aside>
        )}
      </div>
    </main>
  );
}
