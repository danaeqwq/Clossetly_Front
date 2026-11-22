<<<<<<< Updated upstream
=======

import { useLocation } from "react-router";
>>>>>>> Stashed changes
import "./DetallePrenda.css";
import "../../styles/variables.css";
import "../../styles/global.css";
import Boton from "../../componentes/Boton/Boton";
import Ropa from "../../assets/Ropa__ejemplo.jpg";
<<<<<<< Updated upstream
import Etiqueta from "../../assets/etiqueta.svg"

export default function DetallePrenda() {
=======
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

>>>>>>> Stashed changes
    return (
        <main className="DetallePrenda">
            <section className="DetallePrenda__principal" aria-label="Detalle de la prenda">
                <article className="DetallePrenda__ficha">
                    <div className="DetallePrenda__imagenMarco">
<<<<<<< Updated upstream
                        <img src={Ropa} alt="Prendas y accesorios de Clossetly" />
                    </div>

                    <div className="DetallePrenda__informacion">
                        <h1>Remera Rayada</h1>
                        <div className="DetallePrenda__privacidad">
                            <strong>Privacidad</strong>
                            <span>Pública</span>
                            <span className="DetallePrenda__interruptor" aria-label="Pública" />
                        </div>

                        <dl className="DetallePrenda__datos">
                            <div><dt><span class="material-symbols-outlined DetallePrenda__iconoGoogle">
                                calendar_today
                            </span>Temporada</dt><dd>otoño / invierno</dd></div>
                            <div><dt><span class="material-symbols-outlined DetallePrenda__iconoGoogle">
                                apparel
                            </span>Tipo prenda</dt><dd>Remera</dd></div>
                            <div className="DetallePrenda__estilos" ><dt><img
                                src={Etiqueta}
                                alt=""
                                className="DetallePrenda__icono"
                            />Estilos:</dt><dd><span>GRUNGE</span><span>STREETWEAR</span><span>SOFT GRUNGE</span></dd></div>
=======
                        <img src={imagen} alt={prenda.nombre} />
                    </div>

                    <div className="DetallePrenda__informacion">
                        <h1>{prenda.nombre}</h1>

                        <div className="DetallePrenda__privacidad">
                            <strong>Privacidad</strong>
                            <span>
                                {Number(prenda.privacidad) === 1 ? "Pública" : "Privada"}
                            </span>
                            <span className="DetallePrenda__interruptor" aria-label="Privacidad" />
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
                                    {prenda.estilos?.length > 0 ? (
                                        prenda.estilos.map((estilo) => (
                                            <span key={estilo}>{estilo}</span>
                                        ))
                                    ) : (
                                        <span>Sin estilos</span>
                                    )}
                                </dd>
                            </div>
>>>>>>> Stashed changes

                            <div className="DetallePrenda__datoEstado">
                                <dt>
                                    <span className="material-symbols-outlined DetallePrenda__iconoGoogle">
                                        volunteer_activism
                                    </span>
                                    Estado
                                </dt>
<<<<<<< Updated upstream
                                <dd>Nuevo</dd>
=======
                                <dd>{prenda.estado || "Sin especificar"}</dd>
>>>>>>> Stashed changes
                            </div>

                            <div className="DetallePrenda__datoGenero">
                                <dt>
                                    <span className="material-symbols-outlined DetallePrenda__iconoGoogle">
                                        person
                                    </span>
                                    Género
                                </dt>
<<<<<<< Updated upstream
                                <dd>Mujer</dd>
                            </div>
=======
                                <dd>{prenda.genero || "Sin especificar"}</dd>
                            </div>

>>>>>>> Stashed changes
                        </dl>
                    </div>
                </article>

                <aside className="DetallePrenda__panel">
                    <h2>Datos de prenda</h2>
<<<<<<< Updated upstream
                    <fieldset className="DetallePrenda__colores">
                        <legend>Colores:</legend>
                        <label aria-label="Blanco"><input type="radio" name="color-prenda" /><span /></label>
                        <label aria-label="Rosa"><input type="radio" name="color-prenda" defaultChecked /><span /></label>
                    </fieldset>
                    <fieldset className="DetallePrenda__talles">
                        <legend>Talles:</legend>
                        <label><input type="radio" name="talle-prenda" defaultChecked /><span>M</span></label>
                    </fieldset>
=======

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

>>>>>>> Stashed changes
                    <Boton
                        texto="Modificar prenda"
                        variante="secundario"
                        iconoGoogle="edit_square"
                        type="button"
                    />
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
                    <Boton
                        texto="Eliminar prenda"
                        variante="secundario eliminar"
                        iconoGoogle="delete"
                        type="button"
                    />
                </aside>
            </section>
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
        </main>
    );
}
