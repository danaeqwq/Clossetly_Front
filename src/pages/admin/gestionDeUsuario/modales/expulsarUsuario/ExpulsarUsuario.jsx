
import { useEffect, useState } from "react";
import axios from "axios";

import "./ExpulsarUsuario.css";
import "../../../../../styles/global.css";
import "../../../../../styles/variables.css";
import Modal from "../../../../../componentes/modal/Modal";
import Boton from "../../../../../componentes/Boton/Boton";
import Avatar from "../../../../../assets/userfoto.jpg";
import Expulsar from "../../../../../assets/Expulsar.svg";

export default function ExpulsarUsuario({ usuarioId, onClose, onExpulsado }) {
    const [usuario, setUsuario] = useState(null);
    const [motivo, setMotivo] = useState("");
    const [cargando, setCargando] = useState(true);
    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState("");

    // Obtener los datos del usuario
    useEffect(() => {
        const token = localStorage.getItem("token");

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
            setError("No se pudieron cargar los datos del usuario.");
        })
        .finally(() => setCargando(false));

    }, [usuarioId]);

    // Obtener foto de perfil
    const fotoPerfil = usuario?.foto_perfil
        ? usuario.foto_perfil.startsWith("http")
            ? usuario.foto_perfil
            : `http://localhost:3000/${usuario.foto_perfil.replace(/^\/+/, "")}`
        : Avatar;

    // Confirmar expulsión

// Confirmar expulsión
const handleExpulsar = () => {

    if (!motivo.trim()) {
        setError("Debés ingresar el motivo de la expulsión.");
        return;
    }

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            motivo: motivo.trim()
        }
    };

    setEnviando(true);
    setError("");

    axios.delete(
        `http://localhost:3000/api/admin/usuarios/${usuarioId}/expulsar`,
        config
    )
    .then((respuesta) => {
        alert(respuesta.data.mensaje);

        onExpulsado();
        onClose();
    })
    .catch((error) => {
        console.error("Error al expulsar al usuario:", error);

        setError(
            error.response?.data?.mensaje ||
            "No se pudo expulsar al usuario."
        );
    })
    .finally(() => {
        setEnviando(false);
    });
};


    return (
        <Modal
            titulo="Expulsar usuario"
            descripcion="La expulsión es permanente. El usuario perderá el acceso a Clossetly y no podrá volver a ingresar con esta cuenta."
            onClose={onClose}
        >
            <div className="ExpulsarUsuario__contenido">

                <section
                    className="ExpulsarUsuario__perfil"
                    aria-label="Usuario a expulsar"
                >
                    <img
                        className="ExpulsarUsuario__avatar"
                        src={fotoPerfil}
                        alt={`Foto de perfil de ${usuario?.nombre || "usuario"}`}
                    />

                    <strong>
                        {cargando ? "Cargando..." : usuario?.nombre}
                    </strong>
                </section>

                <section
                    className="ExpulsarUsuario__confirmacion"
                    aria-labelledby="ExpulsarUsuario__pregunta"
                >
                    <h3 id="ExpulsarUsuario__pregunta">
                        ¿Estás seguro de que deseas expulsar permanentemente a {usuario?.nombre || "este usuario"} de Clossetly?
                    </h3>

                    <p>
                        Su cuenta perderá el acceso a la plataforma.
                        Esta acción es irreversible.
                    </p>
                </section>

                <div className="ExpulsarUsuario__motivo">
                    <strong>Motivo de la expulsión</strong>

                    <textarea
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        placeholder="Ingresá el motivo de la expulsión..."
                        maxLength={500}
                        rows={4}
                        disabled={enviando}
                    />

                    <span>{motivo.length}/500</span>
                </div>

                {error && (
                    <p className="ExpulsarUsuario__error">
                        {error}
                    </p>
                )}

                <div className="ExpulsarUsuario__acciones">
                    <Boton
                        texto={enviando ? "Expulsando..." : "Confirmar expulsión"}
                        variante="principal ExpulsarUsuario__confirmar"
                        type="button"
                        onClick={handleExpulsar}
                        disabled={enviando || cargando || !usuario}
                    />

                    <Boton
                        texto="Cancelar"
                        variante="secundario ExpulsarUsuario__cancelar"
                        type="button"
                        onClick={onClose}
                        disabled={enviando}
                    />
                </div>

            </div>
        </Modal>
    );
}
