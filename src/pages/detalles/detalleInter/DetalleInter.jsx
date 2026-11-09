
import { useLocation, useNavigate } from "react-router";

import "./DetalleInter.css";
import "../../../styles/variables.css";
import "../../../styles/global.css";

import LineaM from "../../../componentes/LineaM/LineaM";
import Boton from "../../../componentes/Boton/Boton";
import TarjetaIntercambio from "../../../componentes/tarjetaIntercambio/TarjetaIntercambio";
import Etiqueta from "../../../assets/etiqueta.svg";
import iconoCuenta from "../../../assets/userfoto.jpg";

export default function DetalleInter() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const producto = state.producto;
    const productos = state.productos || [];

    if (!producto) {
        return (
            <main className="DetalleInter">
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
                item.tipo === "intercambio" &&
                item.id !== producto.id
        )
        .slice(0, 5);

    return (
        <main className="DetalleInter">
            <section className="DetalleInter__principal" aria-label="Detalle del intercambio">
                <article className="DetalleInter__ficha">
                    <div className="DetalleInter__imagenMarco">
                        <img src={producto.imagen} alt={producto.alt || producto.nombre} />
                    </div>

                    <div className="DetalleInter__informacion">
                        <span className="DetalleInter__insignia material-symbols-outlined" aria-label="Publicación de intercambio">
                            swap_horiz <span>INTERCAMBIO</span>
                        </span>

                        <h1>{producto.nombre}</h1>

                        <div className="DetalleInter__vendedor">
                            <span>Publicado por:</span>
                            <img src={iconoCuenta} alt="" />
                            <span>user67</span>
                        </div>

                        <dl className="DetalleInter__datos">
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

                            <div className="DetalleInter__estilos">
                                <dt>
                                    <img src={Etiqueta} alt="" />
                                    Estilos:
                                </dt>
                                <dd>
                                    {producto.estilos.map((estilo) => (
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

                <aside className="DetalleInter__panel" aria-label="Datos del intercambio y de la prenda">
                    <span className="DetalleInter__reporte material-symbols-outlined" aria-label="Reportar publicación">report</span>

                    <h2>Datos del intercambio</h2>

                    <div className="DetalleInter__acepta">
                        <h3>Prendas que acepta:</h3>
                        <div>
                            {producto.tiposAceptados.map((tipo) => (
                                <span key={tipo}>{tipo.toUpperCase()}</span>
                            ))}
                        </div>
                    </div>

                    <div className="DetalleInter__estadoAceptado">
                        <h3>Estado mínimo aceptado</h3>
                        <span>{producto.estadoMinimoAceptado || "-"}</span>
                    </div>

                    <h2 className="DetalleInter__tituloPrenda">Datos de prenda</h2>

                    <fieldset className="DetalleInter__colores">
                        <legend>Colores:</legend>

                        {producto.colores.map((color) => (
                            <span
                                key={color}
                                className="DetalleInter__muestraColor DetalleInter__muestraColor--seleccionado"
                                aria-label={color}
                                style={{ backgroundColor: coloresDisponibles[color] || color }}
                            />
                        ))}
                    </fieldset>

                    <fieldset className="DetalleInter__talles">
                        <legend>Talles:</legend>

                        {(producto.tallesBuscados?.length
                            ? producto.tallesBuscados
                            : [producto.talle]
                        ).filter(Boolean).map((talle) => (
                            <span
                                key={talle}
                                className="DetalleInter__muestraTalle DetalleInter__muestraTalle--seleccionado"
                            >
                                {talle}
                            </span>
                        ))}
                    </fieldset>

                    <button
                        className="Boton principal"
                        type="button"
                        onClick={() =>
                            navigate("/propuesta-intercambio", {
                                state: { producto },
                            })
                        }
                    >
                        Proponer intercambio
                    </button>
                    <Boton texto="Agregar a favoritos" variante="secundario" iconoGoogle="favorite_border" type="button" />
                </aside>
            </section>

            <section className="DetalleInter__relacionados" aria-labelledby="DetalleInter__tituloRelacionados">
                <div className="DetalleInter__linea" aria-hidden="true">
                    <LineaM lado="izquierdo" />
                </div>

                <h2 id="DetalleInter__tituloRelacionados">Productos que te podrían gustar</h2>

                <div className="DetalleInter__grilla">
                    {productosRelacionados.map((item) => (
                        <TarjetaIntercambio
                            key={item.id}
                            producto={item}
                            onClick={() =>
                                navigate("/detalles/intercambio", {
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
