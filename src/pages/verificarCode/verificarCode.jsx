import "./verificarCode.css"
import "../../styles/variables.css"
import Boton from "../../componentes/Boton/Boton"
import ilustracionCodigo from "../../assets/Ilustracion__codigo.svg"
import Alert from "../../componentes/Alert/Alert"
import Aprobar from "../../assets/Aprobar.svg"

export default function VerificarCodigo() {
    return (
        <main className="VerificarCodigo">
            <section className="VerificarCodigo__contenido" aria-label="Verificar código">
                <div className="VerificarCodigo__ilustracion">
                    <img
                        className="VerificarCodigo__ilustracionImagen"
                        src={ilustracionCodigo}
                        alt="Ilustración de una persona verificando un código en su teléfono"
                    />
                </div>

                <div className="VerificarCodigo__formulario">
                    <header className="VerificarCodigo__encabezado">
                        <h1 className="VerificarCodigo__titulo">Ingresá el código</h1>
                        <p className="VerificarCodigo__subtitulo">
                            Te enviamos un código de 6 dígitos a tu correo electrónico. Ingresalo para continuar
                        </p>
                    </header>

                    <div className="VerificarCodigo__codigo">
                        <p className="VerificarCodigo__etiqueta">Código</p>
                        <div className="VerificarCodigo__casillas" aria-label="Código de seis dígitos">
                            <input className="VerificarCodigo__casilla" type="text" maxLength={1} />
                            <input className="VerificarCodigo__casilla" type="text" maxLength={1} />
                            <input className="VerificarCodigo__casilla" type="text" maxLength={1} />
                            <input className="VerificarCodigo__casilla" type="text" maxLength={1} />
                            <input className="VerificarCodigo__casilla" type="text" maxLength={1} />
                            <input className="VerificarCodigo__casilla" type="text" maxLength={1} />
                        </div>

                    </div>

                    <p className="VerificarCodigo__reenviar">
                        ¿No lo recibiste? <span className="VerificarCodigo__enlace">Reenviar código</span> (en 00:60)
                    </p>

                    <Boton texto="Verificar" variante="principal" type="button" />

                    <p className="VerificarCodigo__volver">
                        Volver a <span className="VerificarCodigo__enlace">Iniciar sesión</span>
                    </p>
                </div>
            </section>
        </main>
    )
}
