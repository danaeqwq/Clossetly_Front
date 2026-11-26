
import "./Alert.css";
import Boton from "../Boton/Boton";

export default function Alert({
    titulo,
    mensaje,
    icono,
    tipoIcono = "imagen",
    textoBoton,
    onClick,
    tipoInput,
    valorInput,
    onChangeInput,
    placeholderInput,
    textoBotonSecundario,
    onClickSecundario
}) {
    return (
        <div className="Alert">
            <div className="Alert__div">

                <h2 className="Alert__div-h2">
                    {icono && (
                        tipoIcono === "google" ? (
                            <span
                                className="material-symbols-outlined Alert__icono"
                                aria-hidden="true"
                            >
                                {icono}
                            </span>
                        ) : (
                            <img
                                src={icono}
                                alt=""
                                className="Alert__icono"
                            />
                        )
                    )}

                    {titulo}
                </h2>

                <p className="Alert__div-p">
                    {mensaje}
                </p>

                {tipoInput && (
                    <input
                        className="Alert__input"
                        type={tipoInput}
                        value={valorInput}
                        onChange={onChangeInput}
                        placeholder={placeholderInput}
                    />
                )}

                <div className="Alert__div-div">

                    {textoBotonSecundario && (
                        <Boton
                            texto={textoBotonSecundario}
                            variante="secundario"
                            type="button"
                            onClick={onClickSecundario}
                        />
                    )}

                    <Boton
                        texto={textoBoton}
                        variante="principal"
                        type="button"
                        onClick={onClick}
                    />

                </div>

            </div>
        </div>
    );
}
