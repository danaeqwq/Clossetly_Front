import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

import "./Login.css";
import "../../styles/variables.css";
import CampoFormulario from "../../componentes/CampoFormulario/CampoFormulario";
import Boton from "../../componentes/Boton/Boton";
import Alert from "../../componentes/Alert/Alert";
import ilustracion from "../../assets/ilustracion__login.svg";
import Icono__correo from "../../assets/Icono__correo.svg";
import Icono_candado from "../../assets/Icono_candado.svg";
import Icono__ojo from "../../assets/Icono__ojo-cerrado.svg";
import Icono__ojo_abierto from "../../assets/Icono__ojo-abierto.svg";

export default function Login({ setUsuario }) {
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [alerta, setAlerta] = useState(null);
    const navigate = useNavigate();

    const iniciarSesion = (e) => {
        e.preventDefault();
        if (!correo.trim()) {
            setAlerta({
                titulo: "¡Falta tu correo!",
                mensaje: "Ingresá tu correo electrónico para continuar."
            });
            return;
        }
        if (!contraseña.trim()) {
            setAlerta({
                titulo: "¡Falta tu contraseña!",
                mensaje: "Ingresá tu contraseña para iniciar sesión."
            });
            return;
        }
        axios.post("http://localhost:3000/api/login", {
            correo: correo.trim(),
            pass: contraseña
        })
        .then((respuesta) => {
            const { token, usuario } = respuesta.data;

            localStorage.setItem("token", token);
            localStorage.setItem("usuario", JSON.stringify(usuario));

            setUsuario(usuario);
            navigate("/boutique");
        })
        .catch((error) => {
            if (error.response?.status === 401) {
                setAlerta({
                    titulo: "¡Ups!",
                    mensaje: "El correo o la contraseña son incorrectos. Verificá tus datos e intentá nuevamente."
                });
            } else {
                setAlerta({
                    titulo: "Error de conexión",
                    mensaje: "No pudimos iniciar sesión. Intentá nuevamente más tarde."
                });
            }
        });
    };

    return (
        <main className="Login">
            <section className="Login__panel" aria-label="Inicio de sesión">
                <div className="Login__illustration" aria-hidden="true">
                    <img src={ilustracion} alt="ilustracion__login" className="Login__ilustration-img" />
                </div>

                <div className="Login__formulario">
                    <header className="Login__encabezado">
                        <h1 className="Login__titulo">Inicio de sesión</h1>
                        <p className="Login__subtitulo">
                            Iniciá sesión y volvé al lugar donde tu estilo<br />
                            habla por vos.
                        </p>
                    </header>

                    <form className="Login__form" onSubmit={iniciarSesion}>
                        <CampoFormulario
                            id="correo"
                            texto="Email"
                            icono={Icono__correo}
                            tipo="email"
                            placeholder="ejemplo@gmail.com"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />

                        <CampoFormulario
                            id="registro-password"
                            texto="Contraseña"
                            icono={Icono_candado}
                            iconoFinal={Icono__ojo}
                            iconoFinalAbierto={Icono__ojo_abierto}
                            tipo="password"
                            placeholder="ej: contraseña"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                        />

                        <Link to="/olvidar-contraseña" className="Login__enlace Login__enlace--olvido">
                        ¿Se te olvidó la contraseña?
                        </Link>

                        <Boton
                            texto="Iniciar sesión"
                            variante="principal"
                            type="submit"
                        />
                    </form>

                    <p className="Login__registro">
                        ¿No tienes cuenta? <Link to="/registro" className="Login__enlace">
                            Regístrate
                        </Link>
                    </p>
                </div>
            </section>
            {alerta && (
                <Alert
                    titulo={alerta.titulo}
                    mensaje={alerta.mensaje}
                    textoBoton="Entendido"
                    onClick={() => setAlerta(null)}
                />
            )}
        </main>
        
    );
}
