import "./DetalleVenta.css";
import "../../../styles/variables.css";
import "../../../styles/global.css";
import LineaM from "../../../componentes/LineaM/LineaM";
import TarjetaVenta from "../../../componentes/tarjetaVenta/TarjetaVenta";
import Boton from "../../../componentes/Boton/Boton";
import Ropa from "../../../assets/Ropa__ejemplo.jpg";
import Etiqueta from "../../../assets/etiqueta.svg";
import iconoCuenta from "../../../assets/userfoto.jpg";

export default function DetalleVenta() {
    return (
        <main className="DetalleVenta">
            <section className="DetalleVenta__principal" aria-label="Detalle de la venta">
                <article className="DetalleVenta__ficha">
                    <div className="DetalleVenta__imagenMarco">
                        <img src={Ropa} alt="Remera rayada rosa y blanca" />
                    </div>

                    <div className="DetalleVenta__informacion">
                        <span className="DetalleVenta__insignia material-symbols-outlined" aria-label="Publicación en venta">
                            sell <span>VENTA</span>
                        </span>
                        <h1>Remera Rayada</h1>
                        <div className="DetalleVenta__vendedor">
                            <span>Publicado por:</span>
                            <img src={iconoCuenta} alt="" />
                            <span>user67</span>
                        </div>
                        <div className="DetalleVenta__precio">
                            <strong>$10.000</strong>
                            <span>Precio por unidad</span>
                        </div>

                        <dl className="DetalleVenta__datos">
                            <div>
                                <dt><span className="material-symbols-outlined" aria-hidden="true">calendar_today</span>Temporada</dt>
                                <dd>otoño / invierno</dd>
                            </div>
                            <div>
                                <dt><span className="material-symbols-outlined" aria-hidden="true">apparel</span>Tipo prenda</dt>
                                <dd>Remera</dd>
                            </div>
                            <div className="DetalleVenta__estilos">
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

                <aside className="DetalleVenta__panel" aria-label="Opciones de compra">
                    <span className="DetalleVenta__reporte material-symbols-outlined" aria-label="Reportar publicación">report</span>
                    <h2>Datos de prenda</h2>

                    <fieldset className="DetalleVenta__colores">
                        <legend>Colores:</legend>
                        <span className="DetalleVenta__muestraColor" aria-label="Bordó" />
                        <span className="DetalleVenta__muestraColor DetalleVenta__muestraColor--seleccionado" aria-label="Rosa" />
                        <span className="DetalleVenta__muestraColor" aria-label="Azul" />
                        <span className="DetalleVenta__muestraColor" aria-label="Rosa claro" />
                        <span className="DetalleVenta__muestraColor" aria-label="Rojo" />
                    </fieldset>

                    <fieldset className="DetalleVenta__talles">
                        <legend>Talles:</legend>
                        <span className="DetalleVenta__muestraTalle">S</span>
                        <span className="DetalleVenta__muestraTalle">L</span>
                        <span className="DetalleVenta__muestraTalle DetalleVenta__muestraTalle--seleccionado">M</span>
                    </fieldset>

                    <p className="DetalleVenta__stock">Stock disponible: 10 unidades</p>
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
                <div className="DetalleVenta__linea" aria-hidden="true"><LineaM lado="izquierdo" /></div>
                <h2 id="DetalleVenta__tituloRelacionados">Productos que te podrían gustar</h2>
                <div className="DetalleVenta__grilla">
                    <TarjetaVenta />
                    <TarjetaVenta />
                    <TarjetaVenta />
                    <TarjetaVenta />
                    <TarjetaVenta />
                </div>
            </section>
        </main>
    );
}
