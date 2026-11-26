
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

import "./verificarCode.css";
import "../../styles/variables.css";

import Boton from "../../componentes/Boton/Boton";
import CampoFormulario from "../../componentes/CampoFormulario/CampoFormulario";
import Modal from "../../componentes/modal/Modal";
import ilustracionCodigo from "../../assets/Ilustracion__codigo.svg";
import Icono_candado from "../../assets/Icono_candado.svg";
import Icono__ojo from "../../assets/Icono__ojo-cerrado.svg";
import Icono__ojo_abierto from "../../assets/Icono__ojo-abierto.svg";
import Alert from "../../componentes/Alert/Alert";

export default function VerificarCodigo() {

    const location = useLocation();
    const navigate = useNavigate();

    // RECUPERAR CORREO DE LA PANTALLA ANTERIOR
    const correo = location.state?.correo || "";

    // ESTADOS
    const [codigo, setCodigo] = useState(["", "", "", "", "", ""]);
    const [alerta, setAlerta] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [segundos, setSegundos] = useState(60);
    const [cargando, setCargando] = useState(false);
    const [modalNuevaPass, setModalNuevaPass] = useState(false);
    const [tokenRecuperacion, setTokenRecuperacion] = useState("");
    const [nuevaPass, setNuevaPass] = useState("");
    const [confirmarPass, setConfirmarPass] = useState("");
    const [cambioExitoso, setCambioExitoso] = useState(false);

    // CUENTA REGRESIVA PARA REENVIAR EL CÓDIGO
    useEffect(() => {
        if (segundos === 0) return;

        const temporizador = setTimeout(() => {
            setSegundos(segundos - 1);
        }, 1000);

        return () => clearTimeout(temporizador);
    }, [segundos]);

    // ACTUALIZAR CADA CASILLA
    const cambiarCodigo = (valor, indice) => {

        if (!/^\d?$/.test(valor)) return;

        const nuevoCodigo = [...codigo];
        nuevoCodigo[indice] = valor;

        setCodigo(nuevoCodigo);
    };

    // VERIFICAR CÓDIGO
    const verificarCodigo = () => {

        const codigoCompleto = codigo.join("");

        if (codigoCompleto.length !== 6) {
            setMensaje("Ingresá los 6 dígitos del código.");
            setAlerta(true);
            return;
        }

        setCargando(true);

        axios.post("http://localhost:3000/api/recuperar-pass/verificar", {
            correo: correo,
            codigo: codigoCompleto
        })
            .then((respuesta) => {

                setTokenRecuperacion(respuesta.data.token);
                setModalNuevaPass(true);

            })
            .catch((error) => {

                setMensaje(
                    error.response?.data?.mensaje ||
                    "No se pudo verificar el código. Intentá nuevamente."
                );

                setAlerta(true);

            })
            .finally(() => {
                setCargando(false);
            });
    };

    const cambiarContrasena = () => {
        if (!nuevaPass.trim() || !confirmarPass.trim()) {
            setMensaje("Completá ambos campos para continuar.");
            setCambioExitoso(false);
            setAlerta(true);
            return;
        }

        if (nuevaPass !== confirmarPass) {
            setMensaje("Las contraseñas no coinciden.");
            setCambioExitoso(false);
            setAlerta(true);
            return;
        }

        setCargando(true);
        axios.post("http://localhost:3000/api/recuperar-pass/cambiar", {
            nuevaPass,
            confirmarPass
        }, {
            headers: {
                Authorization: `Bearer ${tokenRecuperacion}`
            }
        })
            .then((respuesta) => {
                setMensaje(respuesta.data?.mensaje || "La contraseña se cambió correctamente.");
                setCambioExitoso(true);
                setAlerta(true);
            })
            .catch((error) => {
                setMensaje(
                    error.response?.data?.mensaje ||
                    "No se pudo cambiar la contraseña. Intentá nuevamente."
                );
                setCambioExitoso(false);
                setAlerta(true);
            })
            .finally(() => {
                setCargando(false);
            });
    };

    // REENVIAR CÓDIGO
    const reenviarCodigo = () => {

        if (segundos > 0 || cargando) return;

        axios.post("http://localhost:3000/api/recuperar-pass", {
            correo: correo
        })
            .then(() => {

                setCodigo(["", "", "", "", "", ""]);
                setSegundos(60);

                setMensaje("Te enviamos un nuevo código a tu correo.");
                setAlerta(true);

            })
            .catch((error) => {

                setMensaje(
                    error.response?.data?.mensaje ||
                    "No se pudo reenviar el código."
                );

                setAlerta(true);

            });
    };

    return (
        <main className="VerificarCodigo">
            <section
                className="VerificarCodigo__contenido"
                aria-label="Verificar código"
            >

                <div className="VerificarCodigo__ilustracion">
                    <img
                        className="VerificarCodigo__ilustracionImagen"
                        src={ilustracionCodigo}
                        alt="Ilustración de una persona verificando un código en su teléfono"
                    />
                </div>

                <div className="VerificarCodigo__formulario">

                    <header className="VerificarCodigo__encabezado">
                        <h1 className="VerificarCodigo__titulo">
                            Ingresá el código
                        </h1>

                        <p className="VerificarCodigo__subtitulo">
                            Te enviamos un código de 6 dígitos a tu correo electrónico. Ingresalo para continuar.
                        </p>
                    </header>

                    <div className="VerificarCodigo__codigo">

                        <p className="VerificarCodigo__etiqueta">
                            Código
                        </p>

                        <div
                            className="VerificarCodigo__casillas"
                            aria-label="Código de seis dígitos"
                        >
                            {codigo.map((digito, indice) => (
                                <input
                                    key={indice}
                                    className="VerificarCodigo__casilla"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digito}
                                    onChange={(e) =>
                                        cambiarCodigo(e.target.value, indice)
                                    }
                                    aria-label={`Dígito ${indice + 1}`}
                                />
                            ))}
                        </div>

                    </div>

                    <p className="VerificarCodigo__reenviar">

                        ¿No lo recibiste?{" "}

                        <span
                            className="VerificarCodigo__enlace"
                            onClick={reenviarCodigo}
                            style={{
                                cursor: segundos === 0 ? "pointer" : "default",
                                opacity: segundos === 0 ? 1 : 0.5
                            }}
                        >
                            Reenviar código
                        </span>

                        {segundos > 0 && (
                            ` (en 00:${String(segundos).padStart(2, "0")})`
                        )}

                    </p>

                    <Boton
                        texto={cargando ? "Verificando..." : "Verificar"}
                        variante="principal"
                        type="button"
                        onClick={verificarCodigo}
                    />

                    <p className="VerificarCodigo__volver">
                        Volver a{" "}
                        <span
                            className="VerificarCodigo__enlace"
                            onClick={() => navigate("/login")}
                        >
                            Iniciar sesión
                        </span>
                    </p>

                </div>
            </section>

            {alerta && (
                <Alert
                    titulo={cambioExitoso ? "Contraseña actualizada" : "Verificación de código"}
                    mensaje={mensaje}
                    textoBoton="Entendido"
                    onClick={() => {
                        setAlerta(false);
                        if (cambioExitoso) navigate("/login");
                    }}
                />
            )}

            {modalNuevaPass && (
                <Modal
                    titulo="Crear nueva contraseña"
                    descripcion={`Ingresá una nueva contraseña para la cuenta ${correo}.`}
                    className="VerificarCodigo__modal"
                    onClose={() => setModalNuevaPass(false)}
                >
                    <div className="VerificarCodigo__formularioPass">
                        <CampoFormulario
                            id="nueva-pass"
                            texto="Nueva contraseña"
                            icono={Icono_candado}
                            iconoFinal={Icono__ojo}
                            iconoFinalAbierto={Icono__ojo_abierto}
                            tipo="password"
                            placeholder="Ingresá tu nueva contraseña"
                            value={nuevaPass}
                            onChange={(e) => setNuevaPass(e.target.value)}
                        />
                        <CampoFormulario
                            id="confirmar-pass"
                            texto="Confirmar contraseña"
                            icono={Icono_candado}
                            iconoFinal={Icono__ojo}
                            iconoFinalAbierto={Icono__ojo_abierto}
                            tipo="password"
                            placeholder="Repetí tu nueva contraseña"
                            value={confirmarPass}
                            onChange={(e) => setConfirmarPass(e.target.value)}
                        />
                        <Boton
                            texto={cargando ? "Guardando..." : "Cambiar contraseña"}
                            variante="principal"
                            type="button"
                            onClick={cambiarContrasena}
                        />
                    </div>
                </Modal>
            )}

        </main>
    );
}
