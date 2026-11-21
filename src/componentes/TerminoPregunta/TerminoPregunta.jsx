import "./TerminoPregunta.css"
import Flecha from"../../assets/flecha.svg"

export default function TerminoPregunta({ titulo, contenido, abierto = false }) {
    return (
        <article className={`TerminoPregunta${abierto ? " TerminoPregunta--abierto" : ""}`}>
            <div className="TerminoPregunta__encabezado">
                <h2 className="TerminoPregunta__titulo">{titulo}</h2>
                <img src={Flecha} alt="" aria-hidden="true" className="TerminoPregunta__indicador" />
            </div>
            {abierto && (
                <div className="TerminoPregunta__contenido">
                    {contenido}
                </div>
            )}
        </article>
    )
}
