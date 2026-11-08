import "./Registro.css"
import "../../styles/variables.css"
import CampoFormulario from "../../componentes/CampoFormulario/CampoFormulario"
import Boton from "../../componentes/Boton/Boton"

import ilustracion from "../../assets/Ilustracion__registro.svg"
import iconoGoogle from "../../assets/Icono__google.svg"


export default function Registro() {
    return (
        <main className="Registro">
            <section className="Registro__section" aria-label="Crear cuenta">

                <div className="Registro__section-div">
                    <header className="Registro__section-div-header">
                        <h1 className="Registro__section-div-header-h1">Crear cuenta</h1>

                        <p className="Registro__section-div-header-p">
                            Creá tu espacio y hacé de tu estilo algo propio.
                        </p>
                    </header>

                    <form className="Registro__section-div-form">
                        <CampoFormulario
                            id="registro-usuario"
                            texto="User"
                            iconoMaterial="person"
                            tipo="text"
                            placeholder="ej: dany"
                        />

                        <CampoFormulario
                            id="registro-email"
                            texto="Email"
                            iconoMaterial="mail"
                            tipo="email"
                            placeholder="ejemplo@gmail.com"
                        />

                        <CampoFormulario
                            texto="Contraseña"
                            id="registro-password"
                            iconoMaterial="lock"
                            iconoFinalMaterial="visibility_off"
                            tipo="password"
                            placeholder="ej: contraseña"
                        />

                        <CampoFormulario
                            id="registro-whatsapp"
                            texto="Número de WhatsApp"
                            iconoMaterial="call"
                            tipo="tel"
                            placeholder="ej: +54 9 11 1234-5678"
                        />

                        <label className="Registro__section-div-form-recordar">
                            <input className="Registro__section-div-form-recordar-input" type="checkbox"
                            />
                            <span>Recordar contraseña</span>
                        </label>

                        <Boton
                            texto="Registro"
                            variante="principal"
                            type="submit"
                        />
                    </form>

                    <div className="Login__separador"><span>o continuar con</span></div>


                    <Boton
                        texto="Google"
                        variante="secundario"
                        icono={iconoGoogle}
                        type="button"
                    />

                    <p className="Registro__section-div-p"> ¿Tienes cuenta?{" "} <a className="Registro__section-div-p-a" href="/login"> Inicia sesión </a>
                    </p>
                </div>

                <div className="Registro__section-div2">
                    <img className="Registro__section-div2-img" src={ilustracion} alt="" />
                </div>

            </section>
        </main>
    )
}
