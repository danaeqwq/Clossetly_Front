
import "./olvidarContraseña.css";

import CampoFormulario from "../../componentes/CampoFormulario/CampoFormulario";
import Boton from "../../componentes/Boton/Boton";

import Icono_correo from "../../assets/Icono__correo.svg";
import Ilustracion__contraseña from "../../assets/Ilustracion__contraseña.svg";

export default function OlvidarContraseña() {

    return (
        <main className="OlvidarContraseña">
            <section className="OlvidarContraseña__section">

                <div className="OlvidarContraseña__ilustracion">
                    <img
                        src={Ilustracion__contraseña}
                        alt="Ilustración para recuperar la contraseña"
                        className="OlvidarContraseña__ilustracion-img"
                    />
                </div>

                <div className="OlvidarContraseña__contenido">

                    <header className="OlvidarContraseña__header">
                        <h1 className="OlvidarContraseña__titulo">
                            Olvidaste tu contraseña
                        </h1>

                        <p className="OlvidarContraseña__descripcion">
                            No te preocupes. Te ayudaremos a recuperar el
                            acceso a tu cuenta.
                        </p>
                    </header>

                    <form
                        className="OlvidarContraseña__form"
                    >
                        <CampoFormulario
                            texto="Email"
                            id="email"
                            icono={Icono_correo}
                            tipo="email"
                            placeholder="ejemplo@gmail.com"
                        />

                        <Boton
                            texto="Enviar código"
                            variante="principal"
                            type="submit"
                        />
                    </form>

                    <p className="OlvidarContraseña__volver">
                        Volver a{" "}
                        <a
                            href="/login"
                            className="OlvidarContraseña__volver-link"
                        >
                            Iniciar sesión
                        </a>
                    </p>

                </div>
            </section>
        </main>
    );
}
