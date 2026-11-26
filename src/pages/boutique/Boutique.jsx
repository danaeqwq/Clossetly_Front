import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import "./boutique.css";
import "../../styles/variables.css";
import "../../styles/global.css";

import Select from "../../componentes/select/Select";
import TarjetaIntercambio from "../../componentes/tarjetaIntercambio/TarjetaIntercambio";
import TarjetaVenta from "../../componentes/tarjetaVenta/TarjetaVenta";
import Filtros from "../../componentes/filtros/Filtros";

const filtrosBoutique = [
    { valor: "intercambio", texto: "INTERCAMBIO", icono: "autorenew" },
    { valor: "todos", texto: "TODOS", icono: "sell" },
    { valor: "compra", texto: "COMPRA", icono: "shopping_basket" },
];

export default function Boutique({
    filtrosAbiertos = false,
    onCerrarFiltros,
}) {
    const navigate = useNavigate();
    const location = useLocation();

    const [filtro, setFiltro] = useState("todos");
    const [categoriasActivas, setCategoriasActivas] = useState([]);
    const [colores, setColores] = useState([]);
    const [tiposAceptados, setTiposAceptados] = useState([]);
    const [productos, setProductos] = useState([]);
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
    const parametros = new URLSearchParams(location.search);
    const busqueda = (parametros.get("busqueda") || "").trim().toLowerCase();
    useEffect(() => {
        const token = localStorage.getItem("token");
        const params = {
            categoria: criterios.prenda,
            talle: criterios.talle,
            temporada: criterios.temporada,
            estado: criterios.estado,
            ocasion: criterios.ocasion,
            genero: criterios.genero,
            colores,
            estilos: categoriasActivas,
        };
        if (filtro === "compra" || filtro === "todos") {
            params.ordenPrecio = criterios.ordenPrecio;
        }
        if (filtro === "intercambio" || filtro === "todos") {
            params.estadoMinimoAceptado = criterios.estadoMinimoAceptado;
            params.talleBuscado = criterios.talleBuscado;
            params.categoriasAceptadas = tiposAceptados;
        }
        const serializarParams = (params) => {
            const resultado = new URLSearchParams();
            Object.entries(params).forEach(([clave, valor]) => {
                (Array.isArray(valor) ? valor : [valor]).forEach((item) => {
                    if (item !== "" && item !== null && item !== undefined) {
                        resultado.append(clave, item);
                    }
                });
            });
            return resultado.toString();
        };
        Promise.all([
            axios.get("http://localhost:3000/api/publicaciones/compra", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params,
                paramsSerializer: serializarParams,
            }),
            axios.get("http://localhost:3000/api/publicaciones/intercambio", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params,
                paramsSerializer: serializarParams,
            }),
        ])
            .then(([compra, intercambio]) => {
                setProductos([
                    ...(filtro === "intercambio" ? [] : compra.data.publicaciones),
                    ...(filtro === "compra" ? [] : intercambio.data.publicaciones),
                ]);
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("idUsuario");
                    navigate("/login");
                    return;
                }

                console.error("Error al obtener publicaciones:", error);
            });

    }, [filtro, criterios, colores, categoriasActivas, tiposAceptados, navigate]);

    // FILTRAR PUBLICACIONES SEGÚN LA BÚSQUEDA DEL HEADER
    const productosFiltrados = productos.filter((producto) => {
        if (!busqueda) return true;

        const textoProducto = `
            ${producto.nombre || ""}
            ${producto.descripcion || ""}
            ${producto.color || ""}
            ${producto.categoria || ""}
            ${producto.marca || ""}
        `.toLowerCase();

        return textoProducto.includes(busqueda);
    });

    // Abrir detalle de la publicación
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
                    {productosFiltrados.length > 0 ? (
                        productosFiltrados.map((producto) => {
                            const color = producto.codigoColor || "#A87975";

                            const colorTexto =
                                producto.color?.toLowerCase() === "blanco"
                                    ? "#332D37"
                                    : "#FFFFFF";

                            const colorAccion =
                                colorTexto === "#332D37"
                                    ? "#332D37"
                                    : color;

                            return producto.tipo === "intercambio" ? (
                                <TarjetaIntercambio
                                    key={`${producto.tipo}-${producto.id}`}
                                    producto={producto}
                                    color={color}
                                    colorTexto={colorTexto}
                                    colorAccion={colorAccion}
                                    onClick={() => abrirDetalle(producto)}
                                />
                            ) : (
                                <TarjetaVenta
                                    key={`${producto.tipo}-${producto.id}`}
                                    producto={producto}
                                    color={color}
                                    colorTexto={colorTexto}
                                    colorAccion={colorAccion}
                                    onClick={() => abrirDetalle(producto)}
                                />
                            );
                        })
                    ) : (
                        <p className="Boutique__sinResultados">
                            {busqueda
                                ? `No encontramos publicaciones para "${parametros.get("busqueda")}".`
                                : "Todavía no hay publicaciones disponibles."}
                        </p>
                    )}
                </section>

                {categoriasActivas.length > 0 && (
                    <aside className="Boutique__categoriasActivas">
                        <h2>ESTILOS</h2>

                        {categoriasActivas.map((categoria) => (
                            <button
                                className="Boutique__categoriaActiva"
                                type="button"
                                key={categoria}
                            >
                                <span>{categoria}</span>

                                <span
                                    aria-hidden="true"
                                    onClick={() =>
                                        setCategoriasActivas((actuales) =>
                                            actuales.filter(
                                                (activa) => activa !== categoria
                                            )
                                        )
                                    }
                                >
                                    ×
                                </span>
                            </button>
                        ))}
                    </aside>
                )}
            </div>
        </main>
    );
}