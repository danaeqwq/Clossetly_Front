import "./TerminoPregunta.css";
import Flecha from "../../assets/flecha.svg";

export default function TerminoPregunta({
    titulo,
    contenido,
    abierto,
    onClick,
}) {
    return (
        <article className={`TerminoPregunta${abierto ? " TerminoPregunta--abierto" : ""}`}>
            <button
                className="TerminoPregunta__encabezado"
                type="button"
                onClick={onClick}
                aria-expanded={abierto}
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

            {abierto && (
                <div className="TerminoPregunta__contenido">
                    <div className="TerminoPregunta__contenido-interior">
                        <p className="TerminoPregunta__texto">
                            {contenido}
                        </p>
                    </div>
                </div>
            )}
        </article>
    );
}