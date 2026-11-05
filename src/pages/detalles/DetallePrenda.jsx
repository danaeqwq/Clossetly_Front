import "./DetallePrenda.css";
import "../../styles/variables.css";
import "../../styles/global.css";
import Boton from "../../componentes/Boton/Boton";
import Ropa from "../../assets/Ropa__ejemplo.jpg";
import Etiqueta from "../../assets/etiqueta.svg"

export default function DetallePrenda() {
    return (
        <main className="DetallePrenda">
            <section className="DetallePrenda__principal" aria-label="Detalle de la prenda">
                <article className="DetallePrenda__ficha">
                    <div className="DetallePrenda__imagenMarco">
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

                            <div className="DetallePrenda__datoEstado">
                                <dt>
                                    <span className="material-symbols-outlined DetallePrenda__iconoGoogle">
                                        volunteer_activism
                                    </span>
                                    Estado
                                </dt>
                                <dd>Nuevo</dd>
                            </div>

                            <div className="DetallePrenda__datoGenero">
                                <dt>
                                    <span className="material-symbols-outlined DetallePrenda__iconoGoogle">
                                        person
                                    </span>
                                    Género
                                </dt>
                                <dd>Mujer</dd>
                            </div>
                        </dl>
                    </div>
                </article>

                <aside className="DetallePrenda__panel">
                    <h2>Datos de prenda</h2>
                    <fieldset className="DetallePrenda__colores">
                        <legend>Colores:</legend>
                        <label aria-label="Blanco"><input type="radio" name="color-prenda" /><span /></label>
                        <label aria-label="Rosa"><input type="radio" name="color-prenda" defaultChecked /><span /></label>
                    </fieldset>
                    <fieldset className="DetallePrenda__talles">
                        <legend>Talles:</legend>
                        <label><input type="radio" name="talle-prenda" defaultChecked /><span>M</span></label>
                    </fieldset>
                    <Boton
                        texto="Modificar prenda"
                        variante="secundario"
                        iconoGoogle="edit_square"
                        type="button"
                    />
                    <Boton
                        texto="Eliminar prenda"
                        variante="secundario eliminar"
                        iconoGoogle="delete"
                        type="button"
                    />
                </aside>
            </section>

        </main>
    );
}
