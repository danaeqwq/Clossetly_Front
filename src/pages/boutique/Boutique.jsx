import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
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


export default function Boutique({
  carritoAbierto = false,
  onCerrarCarrito,
  filtrosAbiertos = false,
  onCerrarFiltros,
}) {
  const navigate = useNavigate();

  const [filtro, setFiltro] = useState("todos");
  const [categoriasActivas, setCategoriasActivas] = useState([]);
  const [colores, setColores] = useState([]);
  const [tiposAceptados, setTiposAceptados] = useState([]);
  
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/api/boutique/publicaciones")
        .then((respuesta) => {
            const publicaciones = respuesta.data.publicaciones.map((producto) => ({
                ...producto,

                // Normalizar tipo
                tipo: producto.tipo.toLowerCase(),

                // Normalizar color
                color: ({
                    "ROJO OSCURO": "rojo1",
                    "VERDE CLARO": "verde1",
                }[producto.color] || producto.color.toLowerCase()),

                // Adaptar datos para los filtros
                prenda: producto.categoria,

                // Datos que todavía no vienen de la API
                colores: [],
                estilos: [],
                tiposAceptados: [],

                // Ruta completa de la imagen
                imagen: `http://localhost:3000${producto.imagen}`,
            }));

            setProductos(publicaciones);
        })
        .catch((error) => {
            console.error("Error al obtener las publicaciones:", error);
        });
}, []);

  const [criterios, setCriterios] = useState({
    prenda: "",
    talle: "",
    temporada: "",
    estado: "",
    ocasion: "",
    genero: "",
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

  const productosFiltrados = productos
    .filter((producto) => filtro === "todos" || producto.tipo === filtro)
    .filter((producto) => {
      // Comprobar los campos generales
      const coincideCampos = campos.every(([campo, valor]) => {
        if (!valor) return true;

        return producto[campo] === valor;
      });

      // Comprobar colores
      const coincideColor = colores.length === 0 ||colores.includes(producto.color);

      // Comprobar estilos
      const coincideEstilo =
      categoriasActivas.length === 0 ||
      categoriasActivas.some(estilo => producto.estilos.includes(estilo));

      // Comprobar tipos de prendas aceptados para intercambio
      const coincideTiposAceptados =
      filtro !== "intercambio" ||
      tiposAceptados.length === 0 ||
      tiposAceptados.some((tipo) => producto.tiposAceptados.includes(tipo));

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
                ? `/detalles/intercambio/${producto.id}`
                : `/detalles/venta/${producto.id}`;

        navigate(ruta);
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
          colores={colores}
          setColores={setColores}
          tiposAceptados={tiposAceptados}
          setTiposAceptados={setTiposAceptados}
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