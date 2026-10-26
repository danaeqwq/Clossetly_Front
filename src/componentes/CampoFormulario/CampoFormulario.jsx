import "./CampoFormulario.css"
import "../../styles/variables.css"


export default function CampoFormulario({id, texto, icono, tipo, placeholder, iconoFinal}) {
    return (
        <>
            <label className="Label" htmlFor={id}>
                {texto}
            </label>

            <div className="Campo">
                <img 
                src={icono} 
                alt="" 
                className="Campo__img" 
                />

                <input 
                id={id} 
                className="Campo__input" 
                type={tipo} 
                placeholder={placeholder}
                />

                {iconoFinal && (
                    <img
                        src={iconoFinal}
                        alt=""
                        className="Campo__img-final"
                    />
                )}
            </div>
        </>
    )
}