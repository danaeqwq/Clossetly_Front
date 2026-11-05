import "./DetalleInter.css";
import "../../../styles/variables.css";
import "../../../styles/global.css";
import LineaM from "../../../componentes/LineaM/LineaM";
import Boton from "../../../componentes/Boton/Boton";
import TarjetaIntercambio from "../../../componentes/tarjetaIntercambio/TarjetaIntercambio";
import Ropa from "../../../assets/Ropa__ejemplo.jpg";
import Etiqueta from "../../../assets/etiqueta.svg";
import iconoCuenta from "../../../assets/userfoto.jpg";

export default function DetalleInter() {
    return (
        <main className="DetalleInter">
            <section className="DetalleInter__principal" aria-label="Detalle del intercambio">
                <article className="DetalleInter__ficha">
                    <div className="DetalleInter__imagenMarco">
                        <img src={Ropa} alt="Remera rayada rosa y blanca" />
                    </div>

                    <div className="DetalleInter__informacion">
                        <span className="DetalleInter__insignia material-symbols-outlined" aria-label="Publicación de intercambio">
                            swap_horiz <span>INTERCAMBIO</span>
                        </span>
                        <h1>Remera Rayada</h1>
                        <div className="DetalleInter__vendedor">
                            <span>Publicado por:</span>
                            <img src={iconoCuenta} alt="" />
                            <span>user67</span>
                        </div>

                        <dl className="DetalleInter__datos">
                            <div>
                                <dt><span className="material-symbols-outlined" aria-hidden="true">calendar_today</span>Temporada</dt>
                                <dd>otoño / invierno</dd>
                            </div>
                            <div>
                                <dt><span className="material-symbols-outlined" aria-hidden="true">apparel</span>Tipo prenda</dt>
                                <dd>Remera</dd>
                            </div>
                            <div className="DetalleInter__estilos">
                                <dt><img src={Etiqueta} alt="" />Estilos:</dt>
                                <dd><span>GRUNGE</span><span>STREETWEAR</span><span>SOFT GRUNGE</span></dd>
                            </div>
                            <div>
                                <dt><span className="material-symbols-outlined" aria-hidden="true">volunteer_activism</span>Estado</dt>
                                <dd>Nuevo</dd>
                            </div>
                            <div>
                                <dt><span className="material-symbols-outlined" aria-hidden="true">person</span>Género</dt>
                                <dd>Mujer</dd>
                            </div>
                        </dl>
                    </div>
                </article>

                <aside className="DetalleInter__panel" aria-label="Datos del intercambio y de la prenda">
                    <span className="DetalleInter__reporte material-symbols-outlined" aria-label="Reportar publicación">report</span>
                    <h2>Datos del intercambio</h2>
                    <div className="DetalleInter__acepta">
                        <h3>Prendas que acepta:</h3>
                        <div><span>REMERA</span><span>ACCESORIOS</span><span>CAMISAS</span></div>
                    </div>
                    <div className="DetalleInter__estadoAceptado">
                        <h3>Estado mínimo aceptado</h3>
                        <span>POCO USO</span>
                    </div>

                    <h2 className="DetalleInter__tituloPrenda">Datos de prenda</h2>
                    <fieldset className="DetalleInter__colores">
                        <legend>Colores:</legend>
                        <span className="DetalleInter__muestraColor DetalleInter__muestraColor--seleccionado" aria-label="Rosa" />
                    </fieldset>
                    <fieldset className="DetalleInter__talles">
                        <legend>Talles:</legend>
                        <span className="DetalleInter__muestraTalle DetalleInter__muestraTalle--seleccionado">M</span>
                    </fieldset>
                    <Boton texto="Proponer intercambio" variante="principal" type="button" />
                    <Boton texto="Agregar a favoritos" variante="secundario" iconoGoogle="favorite_border" type="button" />
                </aside>
            </section>

            <section className="DetalleInter__relacionados" aria-labelledby="DetalleInter__tituloRelacionados">
                <div className="DetalleInter__linea" aria-hidden="true"><LineaM lado="izquierdo" /></div>
                <h2 id="DetalleInter__tituloRelacionados">Productos que te podrían gustar</h2>
                <div className="DetalleInter__grilla">
                    <TarjetaIntercambio />
                    <TarjetaIntercambio />
                    <TarjetaIntercambio />
                    <TarjetaIntercambio />
                    <TarjetaIntercambio />
                </div>
            </section>
        </main>
    );
}
