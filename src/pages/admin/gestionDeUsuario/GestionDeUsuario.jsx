
import { useEffect, useState } from "react";
import axios from "axios";

import "./GestionDeUsuario.css";
import "../../../styles/global.css";
import "../../../styles/variables.css";

import Usuario from "../../../componentes/Usuario/Usuario";
import VerUsuario from "./modales/verUsuario/VerUsuario";
import ExpulsarUsuario from "./modales/expulsarUsuario/ExpulsarUsuario";
import BloquearUsuario from "./modales/bloquearUsuario/BloquearUsuario";

export default function GestionDeUsuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [resumen, setResumen] = useState({
        total: 0,
        activos: 0,
        bloqueados: 0,
        expulsados: 0
    });
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [usuarioAExpulsar, setUsuarioAExpulsar] = useState(null);
    const [usuarioABloquear, setUsuarioABloquear] = useState(null);

    const [actualizarLista, setActualizarLista] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setCargando(true);
        setError("");
        axios.get("http://localhost:3000/api/admin/usuarios", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((respuesta) => {
            setUsuarios(respuesta.data.usuarios);
            setResumen(respuesta.data.resumen);
        })
        .catch((error) => {
            console.error("Error al obtener los usuarios:", error);
            setError("No se pudieron cargar los usuarios.");
        })
        .finally(() => {
            setCargando(false);
        });

    }, [actualizarLista]);

    const handleUsuarioBloqueado = () => {
        setActualizarLista(prev => prev + 1);
        setUsuarioABloquear(null);
    };

    const handleUsuarioExpulsado = () => {
        setActualizarLista(prev => prev + 1);
        setUsuarioAExpulsar(null);
    };

    return (
        <main className="GestionDeUsuario">

            <header className="GestionDeUsuario__encabezado">
                <h1>Gestión de usuarios</h1>

                <p>
                    Administra las cuentas de la comunidad para mantener un entorno seguro.
                </p>
            </header>

            {/* RESUMEN */}
            <section
                className="GestionDeUsuario__resumen"
                aria-label="Resumen de usuarios"
            >

                {[
                    {
                        titulo: "Total de usuarios",
                        valor: resumen.total,
                        icono: "groups"
                    },
                    {
                        titulo: "Usuarios activos",
                        valor: resumen.activos,
                        icono: "person"
                    },
                    {
                        titulo: "Usuarios bloqueados",
                        valor: resumen.bloqueados,
                        icono: "block"
                    },
                    {
                        titulo: "Usuarios expulsados",
                        valor: resumen.expulsados,
                        icono: "person_remove"
                    }
                ].map((dato) => (

                    <article
                        className="GestionDeUsuario__indicador"
                        key={dato.titulo}
                    >

                        <span
                            className="GestionDeUsuario__indicadorIcono material-symbols-outlined"
                            aria-hidden="true"
                        >
                            {dato.icono}
                        </span>

                        <span className="GestionDeUsuario__indicadorTexto">
                            <span>{dato.titulo}</span>
                            <strong>{dato.valor}</strong>
                        </span>

                    </article>

                ))}

            </section>

            {/* TABLA DE USUARIOS */}
            <div className="GestionDeUsuario__tablaContenedor">

                {cargando ? (

                    <p>Cargando usuarios...</p>

                ) : error ? (

                    <p>{error}</p>

                ) : usuarios.length === 0 ? (

                    <p>No hay usuarios registrados.</p>

                ) : (

                    <table className="GestionDeUsuario__tabla">

                        <thead>
                            <tr>
                                <th scope="col">Usuario</th>
                                <th scope="col">Correo electrónico</th>
                                <th scope="col">Fecha de ingreso</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>

                            {usuarios.map((usuario) => (

                                <Usuario
                                    key={usuario.id}
                                    usuario={usuario}
                                    onVer={() => setUsuarioSeleccionado(usuario.id)}
                                    onBloquear={() => setUsuarioABloquear(usuario.id)}
                                    onExpulsar={() => setUsuarioAExpulsar(usuario.id)}
                                />

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

            {/* MODAL VER USUARIO */}
            {usuarioSeleccionado !== null && (

                <VerUsuario
                    usuarioId={usuarioSeleccionado}
                    onClose={() => setUsuarioSeleccionado(null)}
                />

            )}

            {usuarioABloquear !== null && (

                <BloquearUsuario
                    usuarioId={usuarioABloquear}
                    onClose={() => setUsuarioABloquear(null)}
                    onBloqueado={handleUsuarioBloqueado}
                />

            )}

            {usuarioAExpulsar !== null && (

                <ExpulsarUsuario
                    usuarioId={usuarioAExpulsar}
                    onClose={() => setUsuarioAExpulsar(null)}
                    onExpulsado={handleUsuarioExpulsado}
                />

            )}

        </main>
    );
}
