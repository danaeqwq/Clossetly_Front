import "./Login.css"
import "../../styles/variables.css"
import CampoFormulario from "../../componentes/CampoFormulario/CampoFormulario"
import Boton from "../../componentes/Boton/Boton"
import ilustracion from "../../assets/ilustracion__login.svg";
import Icono__correo from "../../assets/Icono__correo.svg";
import Icono_candado from "../../assets/Icono_candado.svg";
import Icono__ojo from "../../assets/Icono__ojo-cerrado.svg";
import Icono__google from "../../assets/Icono__google.svg";

export default function Login() {
    return (
        <main className="Login">
            <section className="Login__panel" aria-label="Inicio de sesión">
                <div className="Login__illustration" aria-hidden="true">
                    <img src={ilustracion} alt="ilustracion__login" className="Login__ilustration-img" />
                </div>

                <div className="Login__formulario">
                    <header className="Login__encabezado">
                        <h1 className="Login__titulo">Inicio de sesión</h1>
                        <p className="Login__subtitulo">Iniciá sesión y volvé al lugar donde tu estilo<br />habla por vos.</p>
                    </header>

                    <form className="Login__form">
                        <CampoFormulario
                            texto="Email"
                            icono={Icono__correo}
                            tipo="text"
                            placeholder="ejemplo@gmail.com"
                        />

                        <CampoFormulario
                            texto="Contraseña"
                            id="registro-password"
                            icono={Icono_candado}
                            iconoFinal={Icono__ojo}
                            tipo="password"
                            placeholder="ej: contraseña"
                        />

                        <a className="Login__enlace Login__enlace--olvido">¿Se te olvidó la contraseña?</a>
                        <Boton
                            texto="Iniciar sesion"
                            variante="principal"
                            type="submit"
                        />
                    </form>

                    <div className="Login__separador"><span>o continuar con</span></div>
                    <Boton
                        texto="Google"
                        variante="secundario"
                        icono={Icono__google}
                        type="button"
                    />
                    <p className="Login__registro">¿No tienes cuenta? <a className="Login__enlace">Regístrate</a></p>
                </div>
            </section>
        </main>
    )
}
