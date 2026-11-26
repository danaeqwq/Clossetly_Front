
import { useEffect, useState } from "react";
import axios from "axios";

import "./BloquearUsuario.css";
import "../../../../../styles/global.css";
import "../../../../../styles/variables.css";

import Modal from "../../../../../componentes/modal/Modal";
import Boton from "../../../../../componentes/Boton/Boton";
import Avatar from "../../../../../assets/userfoto.jpg";

export default function BloquearUsuario({
    usuarioId,
    onClose,
    onBloqueado
}) {

    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [enviando, setEnviando] = useState(false);
    const [errorEnvio, setErrorEnvio] = useState("");

    const [duracionSeleccionada, setDuracionSeleccionada] = useState(7);
    const [motivo, setMotivo] = useState("");

    const duraciones = [3, 7, 14, 30];
    useEffect(() => {
        if (!usuarioId) return;
        const token = localStorage.getItem("token");
        setCargando(true);
        setError("");
        axios.get(`http://localhost:3000/api/admin/usuarios/${usuarioId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((respuesta) => {
            setUsuario(respuesta.data.usuario);
        })
        .catch((error) => {
            console.error("Error al obtener el usuario:", error);
            setError("No se pudo cargar la información del usuario.");
        })
        .finally(() => {
            setCargando(false);
        });

    }, [usuarioId]);

    const fotoPerfil = usuario?.foto_perfil
        ? (
            usuario.foto_perfil.startsWith("http")
                ? usuario.foto_perfil
                : `http://localhost:3000/${usuario.foto_perfil.replace(/^\/+/, "")}`
        )
        : Avatar;

    const handleBloquear = () => {
        if (!motivo.trim()) {
            setErrorEnvio("Debés ingresar el motivo del bloqueo.");
            return;
        }
        const token = localStorage.getItem("token");
        setEnviando(true);
        setErrorEnvio("");
        axios.post(
            `http://localhost:3000/api/admin/usuarios/${usuarioId}/bloquear`,
            {
                motivo: motivo.trim(),
                duracion: duracionSeleccionada
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((respuesta) => {
            console.log(respuesta.data.mensaje);
            if (onBloqueado) {
                onBloqueado();
            }

            onClose();
        })
        .catch((error) => {
            console.error("Error al bloquear usuario:", error);
            setErrorEnvio(
                error.response?.data?.mensaje ||
                "No se pudo bloquear al usuario."
            );
        })
        .finally(() => {
            setEnviando(false);
        });
    };
    return (
        <Modal
            titulo="Bloquear usuario"
            descripcion="Seleccioná por cuánto tiempo deseas bloquear a este usuario. Durante el período establecido, su acceso a la plataforma estará restringido hasta que finalice la sanción."
            onClose={onClose}
        >
            <div className="BloquearUsuario__contenido">

                {cargando ? (
                    <p>Cargando información del usuario...</p>

                ) : error ? (
                    <p>{error}</p>

                ) : usuario && (
                    <>

                        <img
                            className="BloquearUsuario__avatar"
                            src={fotoPerfil}
                            alt={`Foto de perfil de ${usuario.nombre}`}
                            onError={(e) => {
                                e.currentTarget.src = Avatar;
                            }}
                        />

                        <section
                            className="BloquearUsuario__detalle"
                            aria-labelledby="BloquearUsuario__pregunta"
                        >
                            <h3 id="BloquearUsuario__pregunta">
                                ¿Por cuánto tiempo deseas bloquear a {usuario.nombre}?
                            </h3>

                            <p>
                                Durante este período, el usuario {usuario.nombre} no podrá
                                interactuar con la plataforma.

                                <span>
                                    {" "}Aviso: podrás desbloquearlo antes de que finalice el período.
                                </span>
                            </p>
                        </section>

                        {/* DURACIONES */}
                        <div
                            className="BloquearUsuario__duraciones"
                            aria-label="Seleccionar duración del bloqueo"
                        >
                            {duraciones.map((duracion) => (
                                <button
                                    key={duracion}
                                    type="button"
                                    className={`BloquearUsuario__duracion ${
                                        duracionSeleccionada === duracion
                                            ? "BloquearUsuario__duracion--actual"
                                            : ""
                                    }`}
                                    onClick={() => setDuracionSeleccionada(duracion)}
                                    aria-pressed={duracionSeleccionada === duracion}
                                    disabled={enviando}
                                >
                                    <i aria-hidden="true" />
                                    {duracion} días
                                </button>
                            ))}
                        </div>

                        <p className="BloquearUsuario__motivo">
                            <strong>Duración seleccionada:</strong>{" "}
                            {duracionSeleccionada} días
                        </p>

                        {/* MOTIVO */}
                        <div className="BloquearUsuario__campoMotivo">

                            <label htmlFor="motivoBloqueo">
                                Motivo del bloqueo:
                            </label>

                            <textarea
                                id="motivoBloqueo"
                                name="motivo"
                                placeholder="Explicá por qué se está bloqueando a este usuario..."
                                value={motivo}
                                onChange={(e) => {
                                    setMotivo(e.target.value);
                                    setErrorEnvio("");
                                }}
                                rows={4}
                                disabled={enviando}
                            />

                        </div>

                    </>
                )}

                {/* ERROR DEL ENVÍO */}
                {errorEnvio && (
                    <p className="BloquearUsuario__error">
                        {errorEnvio}
                    </p>
                )}

                {/* ACCIONES */}
                <div className="BloquearUsuario__acciones">

                    <Boton
                        texto={enviando ? "Bloqueando..." : "Bloquear"}
                        variante="principal BloquearUsuario__confirmar"
                        type="button"
                        onClick={handleBloquear}
                        disabled={enviando || cargando || !usuario}
                    />

                    <Boton
                        texto="Cancelar"
                        variante="secundario BloquearUsuario__cancelar"
                        type="button"
                        onClick={onClose}
                        disabled={enviando}
                    />

                </div>

            </div>
        </Modal>
    );
}
