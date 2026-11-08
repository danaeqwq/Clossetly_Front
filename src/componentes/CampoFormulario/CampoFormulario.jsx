import "./CampoFormulario.css"
import "../../styles/variables.css"


export default function CampoFormulario({id, texto, icono, iconoMaterial, tipo, placeholder, iconoFinal, iconoFinalMaterial}) {
    return (
        <>
            <label className="Label" htmlFor={id}>
                {texto}
            </label>

            <div className="Campo">
                {iconoMaterial ? (
                    <span className="material-symbols-outlined Campo__iconoMaterial" aria-hidden="true">
                        {iconoMaterial}
                    </span>
                ) : (
                    <img
                        src={icono}
                        alt=""
                        className="Campo__img"
                    />
                )}

                <input 
                id={id} 
                className="Campo__input" 
                type={tipo} 
                placeholder={placeholder}
                />

                {iconoFinalMaterial && (
                    <span className="material-symbols-outlined Campo__iconoMaterial Campo__iconoMaterial--final" aria-hidden="true">
                        {iconoFinalMaterial}
                    </span>
                )}

                {iconoFinal && !iconoFinalMaterial && (
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
