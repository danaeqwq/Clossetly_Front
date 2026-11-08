
import { useLocation, useNavigate } from "react-router";

import "./DetalleVenta.css";
import "../../../styles/variables.css";
import "../../../styles/global.css";

import LineaM from "../../../componentes/LineaM/LineaM";
import TarjetaVenta from "../../../componentes/tarjetaVenta/TarjetaVenta";
import Boton from "../../../componentes/Boton/Boton";
import Etiqueta from "../../../assets/etiqueta.svg";
import iconoCuenta from "../../../assets/userfoto.jpg";

export default function DetalleVenta() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const producto = state?.producto;
    const productos = state?.productos || [];

    if (!producto) {
        return (
            <main className="DetalleVenta">
                <p>No se encontró la publicación.</p>
            </main>
        );
    }

    const coloresDisponibles = {
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

    const productosRelacionados = productos
        .filter(
            (item) =>
                item.tipo === "compra" &&
                item.id !== producto.id
        )
        .slice(0, 5);

    return (
        <main className="DetalleVenta">
            <section className="DetalleVenta__principal" aria-label="Detalle de la venta">
                <article className="DetalleVenta__ficha">
                    <div className="DetalleVenta__imagenMarco">
                        <img src={producto.imagen} alt={producto.alt || producto.nombre} />
                    </div>

                    <div className="DetalleVenta__informacion">
                        <span className="DetalleVenta__insignia material-symbols-outlined" aria-label="Publicación en venta">
                            sell <span>VENTA</span>
                        </span>

                        <h1>{producto.nombre}</h1>

                        <div className="DetalleVenta__vendedor">
                            <span>Publicado por:</span>
                            <img src={iconoCuenta} alt="" />
                            <span>user67</span>
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
                                key={color}
                                className="DetalleVenta__muestraColor"
                                aria-label={color}
                                style={{ backgroundColor: coloresDisponibles[color] || color }}
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
                        Stock disponible: {producto.stock ?? 10} unidades
                    </p>

                    <Boton texto="Agregar al carrito" variante="principal" type="button" />

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
                            onClick={() =>
                                navigate("/detalles/venta", {
                                    state: { producto: item, productos },
                                })
                            }
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}
