import "./testInicial.css"
import "../../styles/variables.css"
import Boton from "../../componentes/Boton/Boton"
import LineaM from "../../componentes/LineaM/LineaM"
import Logo from "../../assets/Logo.svg"

export default function TestInicial() {
    return (
        <main className="TestInicial">
            <div className="TestInicial__pagina">
                <header className="TestInicial__encabezado">
                    <div className="TestInicial__marca">
                        <img src={Logo} alt="" className="TestInicial__logo" />
                        <h1 className="TestInicial__titulo">
                            Test inicial de <span className="TestInicial__marcaNombre">Clossetly</span>
                        </h1>
                    </div>
                    <p className="TestInicial__subtitulo">
                        Completá el test para personalizar tu experiencia en Clossetly
                    </p>
                </header>

                <section className="TestInicial__composicion" aria-label="Test inicial">
                    <div className="TestInicial__lineaContenedor TestInicial__lineaContenedor--izquierdo">
                        <LineaM lado="izquierdo" />
                    </div>

                    <article className="TestInicial__tarjeta TestInicial__tarjeta--destacada TestInicial__tarjeta--pregunta1">
                        <h2 className="TestInicial__preguntaTitulo">
                            <span className="TestInicial__numero">1</span>
                            <span>¿Qué prendas te gusta destacar en tus outfits?</span>
                        </h2>
                        <ul className="TestInicial__opciones TestInicial__opciones--tresColumnas">
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Remeras</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Cortos</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Zapatos</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla TestInicial__casilla--seleccionada">✓</span>Pantalones</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Camperas</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Accesorios</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Ninguno en particular</li>
                        </ul>
                    </article>

                    <article className="TestInicial__tarjeta TestInicial__tarjeta--pregunta2">
                        <h2 className="TestInicial__preguntaTitulo">
                            <span className="TestInicial__numero">2</span>
                            <span>¿Qué colores sentís que van con tu estilo?</span>
                        </h2>
                        <ul className="TestInicial__opciones TestInicial__opciones--tresColumnas">
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" /><span className="TestInicial__muestraColor" style={{ backgroundColor: "var(--color-rojo)" }} />Rojo</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" /><span className="TestInicial__muestraColor" style={{ backgroundColor: "var(--color-amarillo)" }} />Amarillo</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" /><span className="TestInicial__muestraColor" style={{ backgroundColor: "var(--color-rosa)" }} />Rosa</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" /><span className="TestInicial__muestraColor" style={{ backgroundColor: "var(--color-naranja)" }} />Naranja</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" /><span className="TestInicial__muestraColor" style={{ backgroundColor: "var(--color-verde)" }} />Verde</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" /><span className="TestInicial__muestraColor" style={{ backgroundColor: "var(--color-negro)" }} />Negro</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" /><span className="TestInicial__muestraColor" style={{ backgroundColor: "var(--color-azul)" }} />Azul</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" /><span className="TestInicial__muestraColor" style={{ backgroundColor: "var(--color-morado)" }} />Morado</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" /><span className="TestInicial__muestraColor TestInicial__muestraColor--blanco" style={{ backgroundColor: "var(--color-blancaso)" }} />Blanco</li>
                        </ul>
                    </article>

                    <article className="TestInicial__tarjeta TestInicial__tarjeta--pregunta3">
                        <h2 className="TestInicial__preguntaTitulo">
                            <span className="TestInicial__numero">3</span>
                            <span>¿En qué épocas del año te gusta más vestirte?</span>
                        </h2>
                        <ul className="TestInicial__opciones TestInicial__opciones--dosColumnas TestInicial__opciones--compactas">
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Primavera</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Otoño</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Verano</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Invierno</li>
                        </ul>
                    </article>

                    <article className="TestInicial__tarjeta TestInicial__tarjeta--pregunta4">
                        <h2 className="TestInicial__preguntaTitulo">
                            <span className="TestInicial__numero">4</span>
                            <span>¿Qué te gustaría transmitir con tu forma de vestir?</span>
                        </h2>
                        <ul className="TestInicial__opciones TestInicial__opciones--cuatroColumnas">
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Seguridad</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Dulzura</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Sensualidad</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Rebeldía</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Misterio</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Naturalidad</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Creatividad</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Comodidad</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Libertad</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Elegancia</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Originalidad</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Sofisticación</li>
                        </ul>
                    </article>

                    <article className="TestInicial__tarjeta TestInicial__tarjeta--pregunta5">
                        <h2 className="TestInicial__preguntaTitulo">
                            <span className="TestInicial__numero">5</span>
                            <span>¿Cómo preferís que te quede la ropa?</span>
                        </h2>
                        <ul className="TestInicial__opciones TestInicial__opciones--dosColumnas">
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Oversized: Amplia y holgada.</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Recta: Un calce clásico.</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Entallada: Marca la silueta.</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Depende de la prenda.</li>
                        </ul>
                    </article>

                    <article className="TestInicial__tarjeta TestInicial__tarjeta--pregunta6">
                        <h2 className="TestInicial__preguntaTitulo">
                            <span className="TestInicial__numero">6</span>
                            <span>¿Qué estilos de ropa te llaman más la atención?</span>
                        </h2>
                        <ul className="TestInicial__opciones TestInicial__opciones--cuatroColumnas">
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Streetwear</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Preppy</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Boho Chic</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Goth</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Casual</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Coquette</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Grunge</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Y2K</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Old Money</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Cottagecore</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Punk</li>
                            <li className="TestInicial__opcion"><span className="TestInicial__casilla" />Minimalista</li>
                        </ul>
                    </article>

                    <div className="TestInicial__accion">
                        <span className="TestInicial__botonContenedor">
                            <Boton texto="Confirmar" variante="principal" type="button" />
                        </span>
                    </div>

                    <div className="TestInicial__lineaContenedor TestInicial__lineaContenedor--derecho">
                        <LineaM lado="derecho" />
                    </div>
                </section>
            </div>
        </main>
    )
}
