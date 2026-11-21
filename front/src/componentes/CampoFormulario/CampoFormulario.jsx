import "./CampoFormulario.css"
import "../../styles/variables.css"
import { useState } from "react";
export default function CampoFormulario({
    id,
    texto,
    icono,
    iconoMaterial,
    tipo,
    placeholder,
    iconoFinal,
    iconoFinalAbierto,
    iconoFinalMaterial,
    value,
    onChange
}) {
    const [mostrar, setMostrar] = useState(false);
const tipoInput = tipo === "password" && mostrar ? "text" : tipo;
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
                    type={tipoInput}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />

                {iconoFinalMaterial && (
                    <span className="material-symbols-outlined Campo__iconoMaterial Campo__iconoMaterial--final" aria-hidden="true">
                        {iconoFinalMaterial}
                    </span>
                )}

                {iconoFinal && !iconoFinalMaterial && (
                    <img
                        src={mostrar ? iconoFinalAbierto : iconoFinal}
                        alt=""
                        className="Campo__img-final"
                        onClick={() => tipo === "password" && setMostrar(!mostrar)}
                        style={{ cursor: "pointer" }}
                    />
                )}
            </div>
        </>
    )
}