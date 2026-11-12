import "./Alert.css";
import Boton from "../Boton/Boton";

export default function Alert({ titulo, mensaje, icono, textoBoton }) {
    return (
        <div className="Alert">
            <div className="Alert__div">

                <h2 className="Alert__div-h2">
                    {icono && (
                        <img
                            src={icono}
                            alt=""
                            className="Alert__icono"
                        />
                    )}
                    {titulo}
                </h2>

                <p className="Alert__div-p">
                    {mensaje}
                </p>

                <div className="Alert__div-div">
                    <Boton
                        texto={textoBoton}
                        variante="principal"
                        type="button"
                    />
                </div>

            </div>
        </div>
    );
}
