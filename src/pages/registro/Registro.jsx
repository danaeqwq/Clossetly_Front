import "./Registro.css";
import "../../styles/variables.css";

import { useState } from "react";
import axios from "axios";

import CampoFormulario from "../../componentes/CampoFormulario/CampoFormulario";
import Boton from "../../componentes/Boton/Boton";
import Alert from "../../componentes/Alert/Alert";

import ilustracion from "../../assets/Ilustracion__registro.svg";
import iconoGoogle from "../../assets/Icono__google.svg";
import Icono__ojo from "../../assets/Icono__ojo-cerrado.svg";
import Icono__ojo_abierto from "../../assets/Icono__ojo-abierto.svg";

export default function Registro() {

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [pass, setPass] = useState("");
    const [repetirPass, setRepetirPass] = useState("");
    const [telefono, setTelefono] = useState("");

    const [alerta, setAlerta] = useState(null);

    // MOSTRAR ALERTA
    function mostrarAlerta(titulo, mensaje, registroExitoso = false) {
        setAlerta({
            titulo,
            mensaje,
            registroExitoso
        });
    }

    // REGISTRAR USUARIO
    function handleRegistro(e) {
        e.preventDefault();
        // VALIDAR CAMPOS OBLIGATORIOS
        if (
            !nombre.trim() ||
            !correo.trim() ||
            !pass ||
            !repetirPass ||
            !telefono.trim()
        ) {
            mostrarAlerta(
                "Campos incompletos",
                "Completá todos los campos para registrarte."
            );
            return;
        }

        // VALIDAR NOMBRE DE USUARIO
        if (nombre.trim().length < 3) {
            mostrarAlerta(
                "Nombre inválido",
                "El nombre de usuario debe tener al menos 3 caracteres."
            );
            return;
        }
        // VALIDAR EMAIL
        const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formatoEmail.test(correo.trim())) {
            mostrarAlerta(
                "Correo inválido",
                "Ingresá una dirección de correo electrónico válida."
            );
            return;
        }

        // VALIDAR CONTRASEÑA
        if (pass.length < 6) {
            mostrarAlerta(
                "Contraseña inválida",
                "La contraseña debe tener al menos 6 caracteres."
            );
            return;
        }

        // VALIDAR REPETICIÓN DE CONTRASEÑA
        if (pass !== repetirPass) {
            mostrarAlerta(
                "Las contraseñas no coinciden",
                "Verificá que ambas contraseñas sean iguales."
            );
            return;
        }

        // VALIDAR TELÉFONO
        const cantidadDigitos = telefono.replace(/\D/g, "").length;

        if (cantidadDigitos < 8 || cantidadDigitos > 15) {
            mostrarAlerta(
                "Número inválido",
                "El número de WhatsApp debe tener entre 8 y 15 dígitos."
            );
            return;
        }

        // ENVIAR DATOS AL BACKEND
        axios.post("http://localhost:3000/api/registro", {
            nombre: nombre.trim(),
            correo: correo.trim(),
            pass,
            telefono: telefono.trim()
        })
        .then((respuesta) => {
            setNombre("");
            setCorreo("");
            setPass("");
            setRepetirPass("");
            setTelefono("");

            mostrarAlerta(
                "¡Registro exitoso!",
                "Tu cuenta fue creada correctamente. Ahora podés iniciar sesión.",
                true
            );
        })
        .catch((error) => {
            console.error("Error al registrar usuario:", error);

            mostrarAlerta(
                "No se pudo crear la cuenta",
                error.response?.data?.mensaje ||
                "Ocurrió un error al registrar tu cuenta."
            );
        });
    }

    return (
        <main className="Registro">
            <section className="Registro__section" aria-label="Crear cuenta">

                <div className="Registro__section-div">
                    <header className="Registro__section-div-header">
                        <h1 className="Registro__section-div-header-h1">
                            Crear cuenta
                        </h1>

                        <p className="Registro__section-div-header-p">
                            Creá tu espacio y hacé de tu estilo algo propio.
                        </p>
                    </header>

                    <form
                        className="Registro__section-div-form"
                        onSubmit={handleRegistro}
                        noValidate
                    >
                        <CampoFormulario
                            id="registro-usuario"
                            texto="User"
                            iconoMaterial="person"
                            tipo="text"
                            placeholder="ej: dany"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />

                        <CampoFormulario
                            id="registro-email"
                            texto="Email"
                            iconoMaterial="mail"
                            tipo="email"
                            placeholder="ejemplo@gmail.com"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />

                        <CampoFormulario
                            id="registro-password"
                            texto="Contraseña"
                            iconoMaterial="lock"
                            iconoFinal={Icono__ojo}
                            iconoFinalAbierto={Icono__ojo_abierto}
                            tipo="password"
                            placeholder="Ingresá tu contraseña"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                        />

                        <CampoFormulario
                            id="registro-repetir-password"
                            texto="Repetir contraseña"
                            iconoMaterial="lock"
                            iconoFinal={Icono__ojo}
                            iconoFinalAbierto={Icono__ojo_abierto}
                            tipo="password"
                            placeholder="Repetí tu contraseña"
                            value={repetirPass}
                            onChange={(e) => setRepetirPass(e.target.value)}
                        />

                        <CampoFormulario
                            id="registro-whatsapp"
                            texto="Número de WhatsApp"
                            iconoMaterial="call"
                            tipo="tel"
                            placeholder="ej: +54 9 11 1234-5678"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />

                        <Boton
                            texto="Registro"
                            variante="principal"
                            type="submit"
                        />
                    </form>

                    <div className="Login__separador">
                        <span>o continuar con</span>
                    </div>

                    <Boton
                        texto="Google"
                        variante="secundario"
                        icono={iconoGoogle}
                        type="button"
                    />

                    <p className="Registro__section-div-p">
                        ¿Tenés cuenta?{" "}
                        <a
                            className="Registro__section-div-p-a"
                            href="/"
                        >
                            Iniciá sesión
                        </a>
                    </p>
                </div>

                <div className="Registro__section-div2">
                    <img
                        className="Registro__section-div2-img"
                        src={ilustracion}
                        alt=""
                    />
                </div>

            </section>

            {alerta && (
                <Alert
                    titulo={alerta.titulo}
                    mensaje={alerta.mensaje}
                    textoBoton="Aceptar"
                    onClick={() => {
                        const registroExitoso = alerta.registroExitoso;

                        setAlerta(null);

                        if (registroExitoso) {
                            window.location.href = "/";
                        }
                    }}
                />
            )}
        </main>
    );
}