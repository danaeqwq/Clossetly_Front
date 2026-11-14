import "./GuiaTalle.css";
import "../../styles/variables.css";
import "../../styles/global.css";
import LineaM from "../../componentes/LineaM/LineaM";
import medidas from "../../assets/componentes/Medidas.png";

const equivalencias = [
    ["XS", "78 - 84", "60 - 66", "84 - 90"],
    ["S", "85 - 91", "67 - 73", "91 - 97"],
    ["M", "92 - 98", "74 - 80", "98 - 104"],
    ["L", "99 - 105", "81 - 87", "105 - 111"],
    ["XL", "106 - 112", "88 - 94", "112 - 118"],
];

export default function GuiaTalle() {
    return (
        <main className="GuiaTalle">
            <section className="GuiaTalle__equivalencias" aria-labelledby="GuiaTalle__titulo">
                <div className="GuiaTalle__encabezado">
                    <h1 id="GuiaTalle__titulo">Consultar equivalencias de talles</h1>
                    <p>Explora las tablas de medidas y equivalencias segun el tipo de prenda</p>
                </div>

                <div className="GuiaTalle__consulta">
                    <section className="GuiaTalle__panel GuiaTalle__seleccion">
                        <label className="GuiaTalle__etiqueta" htmlFor="tipo-prenda">
                            <span aria-hidden="true">♧</span> 1. Tipo de prenda
                        </label>
                        <select id="tipo-prenda" defaultValue="Remeras">
                            <option>Remeras</option>
                            <option>Pantalones</option>
                            <option>Vestidos</option>
                        </select>

                        <fieldset className="GuiaTalle__sistemas">
                            <legend className="GuiaTalle__etiqueta">
                                <span aria-hidden="true">◇</span> 2. Sistema de talles
                            </legend>
                            <label><input type="radio" name="sistema" defaultChecked /> Alfabético (XS, S, M, L, XL)</label>
                            <label><input type="radio" name="sistema" /> Numérico (36, 38, 40, 42)</label>
                        </fieldset>
                    </section>

                    <section className="GuiaTalle__panel GuiaTalle__tablaPanel" aria-labelledby="GuiaTalle__tablaTitulo">
                        <div className="GuiaTalle__tablaEncabezado">
                            <h2 id="GuiaTalle__tablaTitulo"><span aria-hidden="true">♧</span> 2. Tabla de equivalencias - Remeras</h2>
                            <span className="GuiaTalle__chip">ALFABÉTICO</span>
                        </div>
                        <div className="GuiaTalle__tablaScroll">
                            <table>
                                <thead>
                                    <tr><th>TALLE</th><th>BUSTO/PECHO(CM)</th><th>CINTURA(CM)</th><th>CADERA(CM)</th></tr>
                                </thead>
                                <tbody>
                                    {equivalencias.map(([talle, pecho, cintura, cadera]) => (
                                        <tr key={talle}><th scope="row">{talle}</th><td>{pecho}</td><td>{cintura}</td><td>{cadera}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </section>

            <div className="GuiaTalle__divisor" aria-hidden="true">
                <LineaM lado="izquierdo" />
            </div>

            <section className="GuiaTalle__encuentra" aria-labelledby="GuiaTalle__encuentraTitulo">
                <div className="GuiaTalle__encabezado">
                    <h2 id="GuiaTalle__encuentraTitulo">Encuentra tu talle</h2>
                    <p>Completa los datos para tener una recomendacion</p>
                </div>

                <div className="GuiaTalle__herramienta">
                    <section className="GuiaTalle__panel GuiaTalle__medidasForm">
                        <label className="GuiaTalle__etiqueta" htmlFor="tipo-prenda-medidas">
                            <span aria-hidden="true">♧</span> 1. Tipo de prenda
                        </label>
                        <select id="tipo-prenda-medidas" defaultValue="Remeras">
                            <option>Remeras</option><option>Pantalones</option><option>Vestidos</option>
                        </select>
                        <h3 className="GuiaTalle__etiqueta GuiaTalle__subtitulo"><span aria-hidden="true">△</span> 2. Medidas en centímetros</h3>
                        <label className="GuiaTalle__campo">Busto / Pecho:<input type="number" placeholder="Ej: 92" /></label>
                        <label className="GuiaTalle__campo">Cadera:<input type="number" placeholder="Ej: 98" /></label>
                        <label className="GuiaTalle__campo">Cintura:<input type="number" placeholder="Ej: 74" /></label>
                    </section>

                    <section className="GuiaTalle__panel GuiaTalle__explicacion">
                        <img src={medidas} alt="Guía visual para tomar las medidas del cuerpo" />
                    </section>

                    <div className="GuiaTalle__resultadoColumna">
                        <section className="GuiaTalle__panel GuiaTalle__resultado">
                            <div className="GuiaTalle__resultadoEncabezado">
                                <h3><span aria-hidden="true">ⓘ</span> 2. Tu resultado</h3>
                                <span className="GuiaTalle__chip">REMERA</span>
                            </div>
                            <div className="GuiaTalle__resultadoCuerpo">
                                <div className="GuiaTalle__recomendacion"><span aria-hidden="true">♧</span><p>Talle recomendado<strong>M</strong></p></div>
                                <dl>
                                    <dt>Tus medidas ingresadas</dt><dd></dd>
                                    <dt>Busto / Pecho</dt><dd>92 cm</dd>
                                    <dt>Cadera</dt><dd>99 cm</dd>
                                    <dt>Cintura</dt><dd>75 cm</dd>
                                </dl>
                            </div>
                        </section>
                        <p className="GuiaTalle__aviso"><span aria-hidden="true">ⓘ</span>Las medidas son una referencia general y pueden variar según el tipo de prenda, la marca y el calce deseado.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
