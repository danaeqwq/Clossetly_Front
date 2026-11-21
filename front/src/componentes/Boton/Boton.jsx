import "./Boton.css"
import "../../styles/variables.css"

export default function Boton({ texto, variante, icono, iconoGoogle, type, onClick }) {
    return (
        <button
            className={`Boton ${variante}`}
            type={type}
            onClick={onClick}
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