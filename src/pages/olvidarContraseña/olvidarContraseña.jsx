
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import "./olvidarContraseña.css";

import CampoFormulario from "../../componentes/CampoFormulario/CampoFormulario";
import Boton from "../../componentes/Boton/Boton";
import Alert from "../../componentes/Alert/Alert";

import Icono_correo from "../../assets/Icono__correo.svg";
import Ilustracion__contraseña from "../../assets/Ilustracion__contraseña.svg";

export default function OlvidarContraseña() {

    const navigate = useNavigate();

    const [correo, setCorreo] = useState("");
    const [alerta, setAlerta] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);

    const solicitarCodigo = (e) => {
        e.preventDefault();

        if (!correo.trim()) {
            setMensaje("Ingresá tu correo electrónico.");
            setAlerta(true);
            return;
        }

        setCargando(true);

        axios.post("http://localhost:3000/api/recuperar-pass", {
            correo: correo.trim()
        })
            .then((respuesta) => {

                // SI EL CORREO EXISTE Y SE ENVIÓ EL CÓDIGO
                navigate("/verificar-codigo", {
                    state: {
                        correo: correo.trim()
                    }
                });

            })
            .catch((error) => {

                if (error.response?.status === 404) {
                    setMensaje("No se encontró ninguna cuenta asociada a ese correo electrónico.");
                } else {
                    setMensaje(
                        error.response?.data?.mensaje ||
                        "Ocurrió un error al solicitar el código. Intentá nuevamente."
                    );
                }

                setAlerta(true);

            })
            .finally(() => {
                setCargando(false);
            });
    };

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
                        onSubmit={solicitarCodigo}
                    >
                        <CampoFormulario
                            texto="Email"
                            id="email"
                            icono={Icono_correo}
                            tipo="email"
                            placeholder="ejemplo@gmail.com"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />

                        <Boton
                            texto={cargando ? "Enviando..." : "Enviar código"}
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

            {alerta && (
                <Alert
                    titulo="No pudimos continuar"
                    mensaje={mensaje}
                    textoBoton="Entendido"
                    onClick={() => setAlerta(false)}
                />
            )}

        </main>
    );
}
