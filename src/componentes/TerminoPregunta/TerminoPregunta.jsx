import "./TerminoPregunta.css"
import { useState } from "react"
import Flecha from"../../assets/flecha.svg"

export default function TerminoPregunta({
    titulo,
    contenido,
    abierto: abiertoControlado,
    onToggle,
    mostrarContenido = true,
}) {
    const [abiertoInterno, setAbiertoInterno] = useState(false)
    const abierto = abiertoControlado ?? abiertoInterno

    const alternar = () => {
        if (onToggle) onToggle()
        if (abiertoControlado === undefined) setAbiertoInterno((actual) => !actual)
    }

    return (
        <article className={`TerminoPregunta${abierto ? " TerminoPregunta--abierto" : ""}`}>
            <button
                className="TerminoPregunta__encabezado"
                type="button"
                aria-expanded={abierto}
                onClick={alternar}
            >
                <span className="TerminoPregunta__titulo">{titulo}</span>
                <img src={Flecha} alt="" aria-hidden="true" className="TerminoPregunta__indicador" />
            </button>
            {mostrarContenido && abierto && (
                <div className="TerminoPregunta__contenido" aria-live="polite">
                    {contenido}
                </div>
            )}
        </article>
    )
}
