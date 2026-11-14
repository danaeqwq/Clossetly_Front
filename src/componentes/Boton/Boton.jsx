import "./Boton.css"
import "../../styles/variables.css"

export default function Boton({ texto, variante, icono, iconoGoogle, type }) {
    return (
        <button
            className={`Boton ${variante}`}
            type={type}
        >
            {icono && (
                <img
                    src={icono}
                    alt=""
                    className="Boton__img"
                />
            )}

            {iconoGoogle && (
                <span className="material-symbols-outlined">
                    {iconoGoogle}
                </span>
            )}

            {texto}
        </button>
    )
}