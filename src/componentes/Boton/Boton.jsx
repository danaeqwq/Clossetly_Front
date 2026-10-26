import "./Boton.css"
import "../../styles/variables.css"

export default function Boton({ texto, variante, icono, type }) {
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

            {texto}
        </button>
    )
}
