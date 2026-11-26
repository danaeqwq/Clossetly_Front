import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

import "./DetalleVenta.css";
import "../../../styles/variables.css";
import "../../../styles/global.css";

import LineaM from "../../../componentes/LineaM/LineaM";
import TarjetaVenta from "../../../componentes/tarjetaVenta/TarjetaVenta";
import Boton from "../../../componentes/Boton/Boton";
import Etiqueta from "../../../assets/etiqueta.svg";
import iconoCuenta from "../../../assets/userfoto.jpg";

export default function DetalleVenta() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [producto, setProducto] = useState(null);
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    const agregarAlCarrito = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        axios.post(
            "http://localhost:3000/api/pedido-items",
            {
                idPublicacion: producto.id
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((respuesta) => {
                alert(respuesta.data.mensaje);
            })
            .catch((error) => {
                console.error("Error al agregar al carrito:", error);

                alert(
                    error.response?.data?.mensaje ||
                    "No se pudo agregar el producto al carrito."
                );
            });
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        Promise.all([
            axios.get(`http://localhost:3000/api/publicaciones/compra/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            axios.get("http://localhost:3000/api/publicaciones/compra", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
        ])
            .then(([respuestaDetalle, respuestaProductos]) => {
                setProducto(respuestaDetalle.data.publicacion);
                setProductos(respuestaProductos.data.publicaciones);
            })
            .catch((error) => {
                console.error("Error al obtener la publicación:", error);
                setProducto(null);
            })
            .finally(() => {
                setCargando(false);
            });
    }, [id]);

    if (cargando) {
        return (
            <main className="DetalleVenta">
                <p>Cargando publicación...</p>
            </main>
        );
    }

    if (!producto) {
        return (
            <main className="DetalleVenta">
                <p>No se encontró la publicación.</p>
            </main>
        );
    }

    const productosRelacionados = productos
        .filter((item) => item.id !== producto.id)
        .map((item) => {
            const coincidencias = (item.estilos || []).filter(
                (estilo) => (producto.estilos || []).includes(estilo)
            ).length;

            return { ...item, coincidencias };
        })
        .sort((a, b) => b.coincidencias - a.coincidencias)
        .slice(0, 5);

    return (
        <main className="DetalleVenta">
            <section className="DetalleVenta__principal" aria-label="Detalle de la venta">
                <article className="DetalleVenta__ficha">
                    <div className="DetalleVenta__imagenMarco">
                        <img
                            src={`http://localhost:3000${producto.imagen}`}
                            alt={producto.alt || producto.nombre}
                        />
                    </div>

                    <div className="DetalleVenta__informacion">
                        <span className="DetalleVenta__insignia material-symbols-outlined" aria-label="Publicación en venta">
                            sell <span>VENTA</span>
                        </span>

                        <h1>{producto.nombre}</h1>

                        <div className="DetalleVenta__vendedor">
                            <span>Publicado por:</span>
                            <img
                                src={
                                    producto.fotoPerfil
                                        ? `http://localhost:3000${producto.fotoPerfil}`
                                        : iconoCuenta
                                }
                                alt=""
                            />
                            <span>{producto.usuario}</span>
                        </div>

                        <div className="DetalleVenta__precio">
                            <strong>${producto.precio?.toLocaleString("es-AR")}</strong>
                            <span>Precio por unidad</span>
                        </div>

                        <dl className="DetalleVenta__datos">
                            <div>
                                <dt>
                                    <span className="material-symbols-outlined" aria-hidden="true">calendar_today</span>
                                    Temporada
                                </dt>
                                <dd>{producto.temporada || "-"}</dd>
                            </div>

                            <div>
                                <dt>
                                    <span className="material-symbols-outlined" aria-hidden="true">apparel</span>
                                    Tipo prenda
                                </dt>
                                <dd>{producto.prenda || "-"}</dd>
                            </div>

                            <div className="DetalleVenta__estilos">
                                <dt>
                                    <img src={Etiqueta} alt="" />
                                    Estilos:
                                </dt>
                                <dd>
                                    {producto.estilos?.map((estilo) => (
                                        <span key={estilo}>{estilo.toUpperCase()}</span>
                                    ))}
                                </dd>
                            </div>

                            <div>
                                <dt>
                                    <span className="material-symbols-outlined" aria-hidden="true">volunteer_activism</span>
                                    Estado
                                </dt>
                                <dd>{producto.estado || "-"}</dd>
                            </div>

                            <div>
                                <dt>
                                    <span className="material-symbols-outlined" aria-hidden="true">person</span>
                                    Género
                                </dt>
                                <dd>{producto.genero || "-"}</dd>
                            </div>
                        </dl>
                    </div>
                </article>

                <aside className="DetalleVenta__panel" aria-label="Opciones de compra">
                    <span className="DetalleVenta__reporte material-symbols-outlined" aria-label="Reportar publicación">report</span>

                    <h2>Datos de prenda</h2>

                    <fieldset className="DetalleVenta__colores">
                        <legend>Colores:</legend>

                        {producto.colores?.map((color) => (
                            <span
                                key={color.color}
                                className="DetalleVenta__muestraColor"
                                aria-label={color.color}
                                style={{ backgroundColor: color.codigoColor }}
                            />
                        ))}
                    </fieldset>

                    <fieldset className="DetalleVenta__talles">
                        <legend>Talles:</legend>

                        <span className="DetalleVenta__muestraTalle DetalleVenta__muestraTalle--seleccionado">
                            {producto.talle}
                        </span>
                    </fieldset>

                    <p className="DetalleVenta__stock">
                        {Number(producto.stock) <= 0
                            ? "Agotado"
                            : `Stock disponible: ${producto.stock} unidades`}
                    </p>

                    <Boton
                        texto={Number(producto.stock) <= 0 ? "Sin stock" : "Agregar al carrito"}
                        variante="principal"
                        type="button"
                        onClick={agregarAlCarrito}
                    />

                    <Boton
                        texto="Agregar a favoritos"
                        variante="secundario"
                        iconoGoogle="favorite"
                        type="button"
                    />
                </aside>
            </section>

            <section className="DetalleVenta__relacionados" aria-labelledby="DetalleVenta__tituloRelacionados">
                <div className="DetalleVenta__linea" aria-hidden="true">
                    <LineaM lado="izquierdo" />
                </div>

                <h2 id="DetalleVenta__tituloRelacionados">Productos que te podrían gustar</h2>

                <div className="DetalleVenta__grilla">
                    {productosRelacionados.map((item) => (
                        <TarjetaVenta
                            key={item.id}
                            producto={item}
                            color={item.codigoColor || "#A87975"}
                            colorTexto={item.color?.toLowerCase() === "blanco" ? "#332D37" : "#FFFFFF"}
                            colorAccion={item.codigoColor || "#A87975"}
                            onClick={() => navigate(`/detalles/venta/${item.id}`)}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}