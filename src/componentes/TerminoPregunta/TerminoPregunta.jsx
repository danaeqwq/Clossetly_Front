
import "./TerminoPregunta.css"
import { useState } from "react"
import Flecha from "../../assets/flecha.svg"

export default function TerminoPregunta({
    titulo,
    contenido,
    abierto,
    onClick,
    onToggle,
    mostrarContenido = true,
}) {
    const [abiertoLocal, setAbiertoLocal] = useState(false)
    const controlado = abierto !== undefined
    const estaAbierto = controlado ? abierto : abiertoLocal

    const alternar = () => {
        if (!controlado) setAbiertoLocal((valor) => !valor)
        onToggle?.()
        onClick?.()
    }

    return (
        <article className={`TerminoPregunta${estaAbierto ? " TerminoPregunta--abierto" : ""}`}>
            <button
                className="TerminoPregunta__encabezado"
                type="button"
                onClick={alternar}
                aria-expanded={estaAbierto}
            >
                <h2 className="TerminoPregunta__titulo">
                    {titulo}
                </h2>

                <img
                    src={Flecha}
                    alt=""
                    aria-hidden="true"
                    className="TerminoPregunta__indicador"
                />
            </button>

            {mostrarContenido && <div
                className="TerminoPregunta__contenido"
                aria-hidden={!estaAbierto}
            >
                <div className="TerminoPregunta__contenido-interior">
                    <p className="TerminoPregunta__texto">
                        {contenido}
                    </p>
                </div>
            </div>}
        </article>
    )
}
