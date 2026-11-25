
import { useLocation } from "react-router";
import "./DetallePrenda.css";
import "../../styles/variables.css";
import "../../styles/global.css";
import Ropa from "../../assets/Ropa__ejemplo.jpg";
import Etiqueta from "../../assets/etiqueta.svg";

export default function DetallePrenda() {
    const location = useLocation();
    const prenda = location.state?.prenda;

    const imagen = prenda?.imagen
        ? prenda.imagen.startsWith("http") ||
            prenda.imagen.startsWith("data:") ||
            prenda.imagen.startsWith("blob:")
            ? prenda.imagen
            : `http://localhost:3000${prenda.imagen}`
        : Ropa;

    if (!prenda) {
        return (
            <main className="DetallePrenda">
                <p>No se encontraron los datos de la prenda.</p>
            </main>
        );
    }

    return (
        <main className="DetallePrenda">
            <section
                className="DetallePrenda__principal"
                aria-label="Detalle de la prenda"
            >
                <article className="DetallePrenda__ficha">
                    <div className="DetallePrenda__imagenMarco">
                        <img src={imagen} alt={prenda.nombre} />
                    </div>

                    <div className="DetallePrenda__informacion">
                        <h1>{prenda.nombre}</h1>

                        <div className="DetallePrenda__privacidad">
                            <strong>Privacidad</strong>
                            <span>
                                {Number(prenda.privacidad) === 1
                                    ? "Pública"
                                    : "Privada"}
                            </span>
                            <span
                                className="DetallePrenda__interruptor"
                                aria-label="Privacidad"
                            />
                        </div>

                        <dl className="DetallePrenda__datos">
                            <div>
                                <dt>
                                    <span className="material-symbols-outlined DetallePrenda__iconoGoogle">
                                        calendar_today
                                    </span>
                                    Temporada
                                </dt>
                                <dd>{prenda.temporada || "Sin especificar"}</dd>
                            </div>

                            <div>
                                <dt>
                                    <span className="material-symbols-outlined DetallePrenda__iconoGoogle">
                                        apparel
                                    </span>
                                    Tipo prenda
                                </dt>
                                <dd>{prenda.categoria || "Sin especificar"}</dd>
                            </div>

                            <div className="DetallePrenda__estilos">
                                <dt>
                                    <img
                                        src={Etiqueta}
                                        alt=""
                                        className="DetallePrenda__icono"
                                    />
                                    Estilos:
                                </dt>
                                <dd>
                                    {prenda.estilos?.length > 0
                                        ? prenda.estilos.map((estilo) => (
                                            <span key={estilo}>{estilo}</span>
                                        ))
                                        : <span>Sin estilos</span>}
                                </dd>
                            </div>

                            <div className="DetallePrenda__datoEstado">
                                <dt>
                                    <span className="material-symbols-outlined DetallePrenda__iconoGoogle">
                                        volunteer_activism
                                    </span>
                                    Estado
                                </dt>
                                <dd>{prenda.estado || "Sin especificar"}</dd>
                            </div>

                            <div className="DetallePrenda__datoGenero">
                                <dt>
                                    <span className="material-symbols-outlined DetallePrenda__iconoGoogle">
                                        person
                                    </span>
                                    Género
                                </dt>
                                <dd>{prenda.genero || "Sin especificar"}</dd>
                            </div>
                        </dl>
                    </div>
                </article>

                <aside className="DetallePrenda__panel">
                    <h2>Datos de prenda</h2>

                    <fieldset className="DetallePrenda__colores">
                        <legend>Colores:</legend>
                        <label aria-label={prenda.color || "Color"}>
                            <input
                                type="radio"
                                name="color-prenda"
                                defaultChecked
                            />
                            <span
                                style={{
                                    backgroundColor: prenda.codigoColor || "#cccccc"
                                }}
                            />
                        </label>
                    </fieldset>

                    <fieldset className="DetallePrenda__talles">
                        <legend>Talles:</legend>
                        <label>
                            <input
                                type="radio"
                                name="talle-prenda"
                                defaultChecked
                            />
                            <span>{prenda.talle || "Sin talle"}</span>
                        </label>
                    </fieldset>
                </aside>
            </section>
        </main>
    );
}
