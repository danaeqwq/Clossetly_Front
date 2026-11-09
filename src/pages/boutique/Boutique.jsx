import { useState } from "react";
import { useNavigate } from "react-router";

import "./boutique.css";
import "../../styles/variables.css";
import "../../styles/global.css";

import Select from "../../componentes/select/Select";
import TarjetaIntercambio from "../../componentes/tarjetaIntercambio/TarjetaIntercambio";
import TarjetaVenta from "../../componentes/tarjetaVenta/TarjetaVenta";
import Filtros from "../../componentes/filtros/Filtros";
import Carrito from "../../componentes/carrito/Carrito";

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

// Productos de ejemplo
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
    estado_id: 4,
    estado: "MUY BUEN ESTADO",
    ocasion: "FIESTA",
    genero: "MUJER",
    estilos: ["Vintage", "Boho Chic"],
    tiposAceptados: ["Remeras", "Pantalones"],
    estadoMinimoAceptado_id: 3,
    estadoMinimoAceptado: "COMO NUEVA",
    talleBuscado: "M",
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
    estado_id: 1,
    estado: "NUEVA CON ETIQUETA",
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
    estado_id: 2,
    estado: "NUEVA SIN ETIQUETA",
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
    estado_id: 3,
    estado: "COMO NUEVA",
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
    estado_id: 5,
    estado: "BUEN ESTADO",
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
    estado_id: 3,
    estado: "COMO NUEVA",
    ocasion: "CASUAL",
    genero: "MUJER",
    estilos: ["Cottagecore", "Boho Chic"],
    tiposAceptados: ["Accesorios"],
    estadoMinimoAceptado_id: 2,
    estadoMinimoAceptado: "NUEVA SIN ETIQUETA",
    talleBuscado: "S",
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
    estado_id: 4,
    estado: "MUY BUEN ESTADO",
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
    estado_id: 1,
    estado: "NUEVA CON ETIQUETA",
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
    estado_id: 5,
    estado: "BUEN ESTADO",
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
    estado_id: 3,
    estado: "COMO NUEVA",
    ocasion: "FORMAL",
    genero: "UNISEX",
    estilos: ["Dark Academia", "Old Money"],
    imagen:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=85",
    alt: "Sweater",
  },
];

export default function Boutique({
  carritoAbierto = false,
  onCerrarCarrito,
  filtrosAbiertos = false,
  onCerrarFiltros,
}) {
  const navigate = useNavigate();

  const [filtro, setFiltro] = useState("todos");
  const [categoriasActivas, setCategoriasActivas] = useState([]);

  const [criterios, setCriterios] = useState({
    prenda: "",
    talle: "",
    temporada: "",
    estado: "",
    ocasion: "",
    genero: "",
    colores: [],
    tiposAceptados: [],
    estadoMinimoAceptado: "",
    talleBuscado: "",
    ordenPrecio: "MAYOR MENOR",
  });
  const campos = [
    ["prenda", criterios.prenda],
    ["talle", criterios.talle],
    ["temporada", criterios.temporada],
    ["estado", criterios.estado],
    ["ocasion", criterios.ocasion],
    ["genero", criterios.genero],
    [
      "talleBuscado",
      filtro === "intercambio" ? criterios.talleBuscado : "",
    ],
  ];

  // Aplicar filtros a los productos
  const productosFiltrados = productos
    .filter((producto) => filtro === "todos" || producto.tipo === filtro)
    .filter((producto) => {
      // Comprobar los campos generales
      const coincideCampos = campos.every(([campo, valor]) => {
        if (!valor) return true;

        return producto[campo] === valor;
      });

      // Comprobar colores
      const coincideColor = criterios.colores.length === 0 ||
      criterios.colores.some(color => producto.colores.includes(color));

      // Comprobar estilos
      const coincideEstilo =
      categoriasActivas.length === 0 ||
      categoriasActivas.some(estilo => producto.estilos.includes(estilo));

      // Comprobar tipos de prendas aceptados para intercambio
      const coincideTiposAceptados =
      filtro !== "intercambio" ||
      criterios.tiposAceptados.length === 0 ||
      criterios.tiposAceptados.some(tipos => producto.tiposAceptados.includes(tipos));

      // Comprobar estado mínimo aceptado
      const coincideEstadoMinimo =
      filtro !== "intercambio" ||
      !criterios.estadoMinimoAceptado ||
      producto.estado_id <= criterios.estadoMinimoAceptado;
      return (
        coincideCampos &&
        coincideColor &&
        coincideEstilo &&
        coincideTiposAceptados &&
        coincideEstadoMinimo
      );
    })
    .sort((a, b) => {
      if (filtro !== "compra") return 0;
      if (criterios.ordenPrecio === "MENOR MAYOR") {
        return a.precio - b.precio;
      }
      if (criterios.ordenPrecio === "MAYOR MENOR") {
        return b.precio - a.precio;
      }
      return 0;
    });

    const abrirDetalle = (producto) => {
      const ruta =
        producto.tipo === "intercambio"
          ? "/detalles/intercambio"
          : "/detalles/venta";

      navigate(ruta, {
        state: { producto },
      });
    };
  return (
    <main className="Boutique">
      <div className="Boutique__filtros">
        <Select
          opciones={filtrosBoutique}
          seleccionada={filtro}
          onChange={setFiltro}
        />
      </div>

      {filtrosAbiertos && (
        <Filtros
          tipo={filtro}
          onChange={setFiltro}
          categoriasActivas={categoriasActivas}
          setCategoriasActivas={setCategoriasActivas}
          criterios={criterios}
          setCriterios={setCriterios}
          onCerrar={onCerrarFiltros}
        />
      )}

      <div className="Boutique__contenido">
        <section
          className="Boutique__productos"
          aria-label="Productos de Boutique"
        >
          {productosFiltrados.map((producto) => {
            const color = coloresTarjeta[producto.color] || "#A87975";
            const colorTexto =
              producto.color === "blanco" ? "#332D37" : "#FFFFFF";
            const colorAccion =
              producto.color === "blanco" ? "#332D37" : color;

            return producto.tipo === "intercambio" ? (
              <TarjetaIntercambio
                key={producto.id}
                producto={producto}
                color={color}
                colorTexto={colorTexto}
                colorAccion={colorAccion}
                onClick={() => abrirDetalle(producto)}
              />
              ) : (
                <TarjetaVenta
                  key={producto.id}
                  producto={producto}
                  color={color}
                  colorTexto={colorTexto}
                  colorAccion={colorAccion}
                  onClick={() => abrirDetalle(producto)}
                />
              );
              })}
        </section>

        {categoriasActivas.length > 0 && (
          <aside
            className="Boutique__categoriasActivas"
          >
            <h2>ESTILOS</h2>

            {categoriasActivas.map((categoria) => (
              <button
                className="Boutique__categoriaActiva"
                type="button"
                key={categoria}
                
              >
                <span>{categoria}</span>
                <span aria-hidden="true" onClick={() =>
                  setCategoriasActivas((actuales) =>
                    actuales.filter((activa) => activa !== categoria)
                  )}
                  >×</span>
              </button>
            ))}
          </aside>
        )}
      </div>
      {carritoAbierto && <Carrito onCerrar={onCerrarCarrito} />}
    </main>
  );
}