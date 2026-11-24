import { useEffect, useState } from "react";
import axios from "axios";

import "./VerUsuario.css";
import "../../../../../styles/global.css";
import "../../../../../styles/variables.css";

import Modal from "../../../../../componentes/modal/Modal";
import Boton from "../../../../../componentes/Boton/Boton";

import Avatar from "../../../../../assets/userfoto.jpg";
import Bloqueo from "../../../../../assets/Bloqueo.svg";

export default function VerUsuario({ usuarioId, onClose }) {

    const [usuario, setUsuario] = useState(null);
    const [sanciones, setSanciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

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
            setSanciones(respuesta.data.sanciones);
        })
        .catch((error) => {
            console.error("Error al obtener el detalle:", error);
            setError("No se pudo cargar la información del usuario.");
        })
        .finally(() => {
            setCargando(false);
        });

    }, [usuarioId]);

    // Formatear fechas
    const formatearFecha = (fecha) => {
        if (!fecha) return "Sin fecha";

        const fechaLimpia = fecha.split("T")[0].split(" ")[0];
        const [anio, mes, dia] = fechaLimpia.split("-");

        return `${dia}/${mes}/${anio}`;
    };

    // Foto de perfil
    const fotoPerfil = usuario?.foto_perfil
        ? (usuario.foto_perfil.startsWith("http")
            ? usuario.foto_perfil
            : `http://localhost:3000/${usuario.foto_perfil.replace(/^\/+/, "")}`)
        : Avatar;

    return (
        <Modal
            titulo="Ver usuario"
            descripcion="A continuación la información personal, actividad e historial de denuncias y sanciones de este usuario para supervisar su cuenta y garantizar el cumplimiento de las normas de la comunidad."
            onClose={onClose}
        >
            <div className="VerUsuario__contenido">

                {cargando ? (
                    <p>Cargando información del usuario...</p>

                ) : error ? (
                    <p>{error}</p>

                ) : usuario && (
                    <>
                        <section
                            className="VerUsuario__perfil"
                            aria-label="Información personal"
                        >
                            <img
                                className="VerUsuario__avatar"
                                src={fotoPerfil}
                                alt={`Foto de perfil de ${usuario.nombre}`}
                                onError={(e) => {
                                    e.currentTarget.src = Avatar;
                                }}
                            />

                            <dl className="VerUsuario__datos">
                                <div>
                                    <dt>Nombre de usuario:</dt>
                                    <dd>{usuario.nombre || "Sin nombre"}</dd>
                                </div>

                                <div>
                                    <dt>Correo electrónico:</dt>
                                    <dd>{usuario.correo || "Sin correo"}</dd>
                                </div>

                                <div>
                                    <dt>Teléfono:</dt>
                                    <dd>{usuario.telefono || "Sin teléfono"}</dd>
                                </div>

                                <div>
                                    <dt>Fecha de registro:</dt>
                                    <dd>{formatearFecha(usuario.fecha)}</dd>
                                </div>

                                <div>
                                    <dt>Descripción:</dt>
                                    <dd>{usuario.descripcion || "Sin descripción"}</dd>
                                </div>

                                <div>
                                    <dt>Estado de la cuenta:</dt>
                                    <dd>{usuario.estado || "Sin estado"}</dd>
                                </div>
                            </dl>
                        </section>

                        <section
                            className="VerUsuario__historial"
                            aria-labelledby="VerUsuario__tituloHistorial"
                        >
                            <h3 id="VerUsuario__tituloHistorial">
                                Historial de sanciones
                            </h3>

                            <p>
                                Registro de bloqueos y expulsiones del usuario.
                            </p>

                            <div className="VerUsuario__listaSanciones">

                                {sanciones.length > 0 ? (
                                    sanciones.map((sancion, index) => (
                                        <article
                                            className="VerUsuario__sancion"
                                            key={index}
                                        >
                                            <span className="VerUsuario__iconoBloqueo">
                                                <img src={Bloqueo} alt="" />
                                            </span>

                                            <div className="VerUsuario__detalleSancion">
                                                <strong>
                                                    {sancion.tipo_sancion}
                                                </strong>

                                                <span>
                                                    Motivo: {sancion.motivo}
                                                </span>

                                                <span>
                                                    Estado: {sancion.estado_sancion}
                                                </span>
                                            </div>

                                            <time className="VerUsuario__fechaSancion">
                                                {formatearFecha(sancion.fecha_inicio)}
                                                {" - "}
                                                {formatearFecha(sancion.fecha_fin)}
                                            </time>

                                            <Boton
                                                texto={sancion.estado_sancion}
                                                variante={
                                                    sancion.estado_sancion === "Activa"
                                                        ? "VerUsuario__activa"
                                                        : "VerUsuario__finalizado"
                                                }
                                                type="button"
                                            />
                                        </article>
                                    ))
                                ) : (
                                    <p>Este usuario no tiene sanciones registradas.</p>
                                )}

                            </div>
                        </section>
                    </>
                )}

                <div className="VerUsuario__acciones">
                    <Boton
                        texto="Cerrar"
                        variante="principal VerUsuario__cerrar"
                        type="button"
                        onClick={onClose}
                    />
                </div>

            </div>
        </Modal>
    );
}