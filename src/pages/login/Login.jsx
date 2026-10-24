import "./Login.css"
import "../../styles/variables.css"
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
                        <label className="Login__label" htmlFor="login-email">Email</label>
                        <div className="Login__campo">
                            <img src={Icono__correo} alt="Correo" className="Login__icono" />
                            <input id="login-email" className="Login__input" type="email" placeholder="ejemplo@gmail.com" />
                        </div>

                        <label className="Login__label Login__label--conMargen" htmlFor="login-password">Contraseña</label>
                        <div className="Login__campo">
                            <img src={Icono_candado} alt="candado" className="Login__icono" />
                            <input id="login-password" className="Login__input" type="password" placeholder="ejemplocontraseña" />
                            <img src={Icono__ojo} alt="ojito-cerrado" className="Login__icono-img"/>
                        </div>

                        <a className="Login__enlace Login__enlace--olvido">¿Se te olvidó la contraseña?</a>
                        <button className="Login__boton Login__boton--principal" type="button">Iniciar sesión</button>
                    </form>

                    <div className="Login__separador"><span>o continuar con</span></div>
                    <button className="Login__boton Login__boton--google" type="button"><img src={Icono__google} alt="G" className="Login__googleIcon"/>Google</button>
                    <p className="Login__registro">¿No tienes cuenta? <a className="Login__enlace">Regístrate</a></p>
                </div>
            </section>
        </main>
    )
}
