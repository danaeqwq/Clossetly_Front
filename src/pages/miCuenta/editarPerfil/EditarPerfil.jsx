import "./EditarPerfil.css";
import "../../../styles/global.css";
import "../../../styles/variables.css";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import Boton from "../../../componentes/Boton/Boton";
import LineaM from "../../../componentes/LineaM/LineaM";
import Alert from "../../../componentes/Alert/Alert";
import Avatar from "../../../assets/userfoto.jpg";

export default function EditarPerfil({ setUsuario: actualizarUsuario }) {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);
    const [eliminandoCuenta, setEliminandoCuenta] = useState(false);
    const inputFoto = useRef(null);
    const [fotoSeleccionada, setFotoSeleccionada] = useState(null);
    const [fotoPreview, setFotoPreview] = useState(null);
    const cerrarSesion = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        actualizarUsuario(null);
        navigate("/");
    };

    const seleccionarFoto = (e) => {
        const archivo = e.target.files[0];

        if (!archivo) return;

        if (!archivo.type.startsWith("image/")) {
            setAlerta({
                titulo: "Archivo no válido",
                mensaje: "Seleccioná una imagen para tu foto de perfil.",
                textoBoton: "Aceptar"
            });

            return;
        }

        setFotoSeleccionada(archivo);
        setFotoPreview(URL.createObjectURL(archivo));
    };
    const [formulario, setFormulario] = useState({
        nombre: "",
        telefono: "",
        descripcion: ""
    });

    const [contrasenas, setContrasenas] = useState({
        contrasenaActual: "",
        nuevaContrasena: "",
        confirmarContrasena: ""
    });

    const [estadisticas, setEstadisticas] = useState({
        publicaciones: 0,
        ventas: 0,
        intercambios: 0
    });

    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [cambiandoContrasena, setCambiandoContrasena] = useState(false);
    const [alerta, setAlerta] = useState(null);
    const [contrasenaEliminar, setContrasenaEliminar] = useState("");

    // Obtener datos de la cuenta
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        axios.get("http://localhost:3000/api/usuarios/mi-cuenta", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((respuesta) => {
            setUsuario(respuesta.data.usuario);

            setFormulario({
                nombre: respuesta.data.usuario.nombre || "",
                telefono: respuesta.data.usuario.telefono || "",
                descripcion: respuesta.data.usuario.descripcion || ""
            });

            setEstadisticas(respuesta.data.estadisticas);
        })
        .catch((error) => {
            console.error("Error al obtener el perfil:", error);
        })
        .finally(() => {
            setCargando(false);
        });

    }, []);

    // Modificar los campos personales
    const manejarCambio = (e) => {
        const { name, value } = e.target;

        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    // Modificar los campos de contraseña
    const manejarCambioContrasena = (e) => {
        const { name, value } = e.target;

        setContrasenas({
            ...contrasenas,
            [name]: value
        });
    };

    // Guardar cambios personales
    const guardarCambios = () => {
        const token = localStorage.getItem("token");

console.log("Token:", token);
        const datos = new FormData();

        datos.append("nombre", formulario.nombre);
        datos.append("telefono", formulario.telefono);
        datos.append("descripcion", formulario.descripcion);

        if (fotoSeleccionada) {
            datos.append("fotoPerfil", fotoSeleccionada);
        }

        setGuardando(true);

        axios.put(
            
            "http://localhost:3000/api/usuarios/mi-cuenta",
            datos,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((respuesta) => {
            setUsuario({
                ...usuario,
                nombre: formulario.nombre,
                telefono: formulario.telefono,
                descripcion: formulario.descripcion,
                foto_perfil: respuesta.data.foto_perfil || usuario.foto_perfil
            });

            setFotoSeleccionada(null);

            setAlerta({
                titulo: "¡Perfil actualizado!",
                mensaje: "Tus datos personales y tu foto se guardaron correctamente.",
                textoBoton: "Aceptar"
            });
        })
        .catch((error) => {
            console.error("Error al guardar el perfil:", error);

            setAlerta({
                titulo: "Error al guardar",
                mensaje: error.response?.data?.mensaje || "No se pudieron guardar los cambios.",
                textoBoton: "Aceptar"
            });
        })
        .finally(() => {
            setGuardando(false);
        });
    };

    // Cambiar contraseña
    const cambiarContrasena = () => {
        const token = localStorage.getItem("token");

        if (
            !contrasenas.contrasenaActual ||
            !contrasenas.nuevaContrasena ||
            !contrasenas.confirmarContrasena
        ) {
            setAlerta({
                titulo: "Datos incompletos",
                mensaje: "Completá todos los campos de contraseña.",
                textoBoton: "Aceptar"
            });
            return;
        }

        if (contrasenas.nuevaContrasena !== contrasenas.confirmarContrasena) {
            setAlerta({
                titulo: "Contraseñas diferentes",
                mensaje: "Las contraseñas nuevas no coinciden.",
                textoBoton: "Aceptar"
            });
            return;
        }

        setCambiandoContrasena(true);

        axios.put("http://localhost:3000/api/usuarios/cambiar-contrasena", {
            contrasenaActual: contrasenas.contrasenaActual,
            nuevaContrasena: contrasenas.nuevaContrasena,
            confirmarContrasena: contrasenas.confirmarContrasena
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((respuesta) => {
            setAlerta({
                titulo: "¡Contraseña actualizada!",
                mensaje: respuesta.data.mensaje || "Contraseña actualizada correctamente.",
                textoBoton: "Aceptar"
            });

            setContrasenas({
                contrasenaActual: "",
                nuevaContrasena: "",
                confirmarContrasena: ""
            });
        })
        .catch((error) => {
            console.error("Error al cambiar la contraseña:", error);

            setAlerta({
                titulo: "Error al cambiar contraseña",
                mensaje: error.response?.data?.mensaje || "No se pudo cambiar la contraseña.",
                textoBoton: "Aceptar"
            });
        })
        .finally(() => {
            setCambiandoContrasena(false);
        });
    };

    // Eliminar cuenta
    const eliminarCuenta = () => {
        setContrasenaEliminar("");

        setAlerta({
            titulo: "Eliminar cuenta",
            mensaje: "Esta acción eliminará tu cuenta y todos tus datos. Ingresá tu contraseña actual para confirmar.",
            tipoInput: "password",
            placeholderInput: "Contraseña actual",
            textoBoton: "Eliminar cuenta",
            textoBotonSecundario: "Cancelar",
            onClick: confirmarEliminarCuenta,
            onClickSecundario: () => {
                setContrasenaEliminar("");
                setAlerta(null);
            }
        });
    };

    // Confirmar eliminación de cuenta
    const confirmarEliminarCuenta = () => {
        if (!contrasenaEliminar) {
            setAlerta({
                titulo: "Contraseña obligatoria",
                mensaje: "Ingresá tu contraseña actual para continuar.",
                textoBoton: "Aceptar"
            });
            return;
        }

        const token = localStorage.getItem("token");

        setEliminandoCuenta(true);

        axios.delete("http://localhost:3000/api/usuarios/eliminar-cuenta", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                contrasenaActual: contrasenaEliminar
            }
        })
        .then((respuesta) => {
            setAlerta({
                titulo: "Cuenta eliminada",
                mensaje: respuesta.data.mensaje || "Tu cuenta se eliminó correctamente.",
                textoBoton: "Aceptar",
                onClick: cerrarSesion
            });
        })
        .catch((error) => {
            console.error("Error al eliminar la cuenta:", error);

            setAlerta({
                titulo: "Error al eliminar cuenta",
                mensaje: error.response?.data?.mensaje || "No se pudo eliminar la cuenta.",
                textoBoton: "Aceptar"
            });
        })
        .finally(() => {
            setEliminandoCuenta(false);
        });
    };

    if (cargando) {
        return (
            <main className="EditarPerfil">
                <p>Cargando perfil...</p>
            </main>
        );
    }

    if (!usuario) {
        return (
            <main className="EditarPerfil">
                <p>No se pudieron cargar los datos del perfil.</p>
            </main>
        );
    }

    const fotoPerfil = usuario.foto_perfil
        ? `http://localhost:3000${usuario.foto_perfil}`
        : Avatar;

    return (
        <main className="EditarPerfil">
            <section className="EditarPerfil__panel">
                <header className="EditarPerfil__cabecera">
                    <div className="EditarPerfil__foto">
                        <img
                            src={
                                fotoPreview ||
                                (usuario.foto_perfil
                                    ? `http://localhost:3000${usuario.foto_perfil}`
                                    : Avatar)
                            }
                            alt={`Foto de perfil de ${usuario.nombre}`}
                            onError={(e) => {
                                e.currentTarget.src = Avatar;
                            }}
                        />

                        <button
                            type="button"
                            className="EditarPerfil__editarFoto material-symbols-outlined"
                            onClick={() => inputFoto.current.click()}
                        >
                            edit
                        </button>

                        <input
                            type="file"
                            accept="image/*"
                            ref={inputFoto}
                            onChange={seleccionarFoto}
                            hidden
                        />

                    </div>

                    <div className="EditarPerfil__identidad">
                        <h1>{usuario.nombre}</h1>

                        <p>
                            {usuario.descripcion || "Todavía no agregaste una descripción."}
                        </p>

                        <div className="EditarPerfil__estadisticas">
                            <span>
                                <strong>{estadisticas.publicaciones}</strong> Publicaciones
                            </span>

                            <span>
                                <strong>{estadisticas.ventas}</strong> Ventas
                            </span>

                            <span>
                                <strong>{estadisticas.intercambios}</strong> Intercambios
                            </span>
                        </div>
                    </div>
                </header>

                <div className="EditarPerfil__contenido">

                    {/* COLUMNA IZQUIERDA */}
                    <section className="EditarPerfil__formulario">
                        <h2 id="EditarPerfil__tituloDatos">
                            Datos personales
                        </h2>
                        <div className="EditarPerfil__campo">
                            <label htmlFor="editar-perfil-usuario">
                                User
                            </label>

                            <input
                                id="editar-perfil-usuario"
                                name="nombre"
                                type="text"
                                value={formulario.nombre}
                                onChange={manejarCambio}
                            />
                        </div>

                        <div className="EditarPerfil__campo">
                            <label htmlFor="editar-perfil-telefono">
                                Teléfono
                            </label>

                            <input
                                id="editar-perfil-telefono"
                                name="telefono"
                                type="tel"
                                value={formulario.telefono}
                                onChange={manejarCambio}
                            />
                        </div>

                        <div className="EditarPerfil__campo EditarPerfil__campo--descripcion">
                            <label htmlFor="editar-perfil-descripcion">
                                Descripción
                            </label>

                            <textarea
                                id="editar-perfil-descripcion"
                                name="descripcion"
                                value={formulario.descripcion}
                                onChange={manejarCambio}
                            />
                        </div>

                        {/* CAMBIAR CONTRASEÑA */}
                        <div className="EditarPerfil__contrasena">

                            <h2>Cambiar contraseña</h2>

                            <div className="EditarPerfil__campo">
                                <label htmlFor="contrasena-actual">
                                    Contraseña actual
                                </label>

                                <input
                                    id="contrasena-actual"
                                    name="contrasenaActual"
                                    type="password"
                                    placeholder="Ingresá tu contraseña actual"
                                    value={contrasenas.contrasenaActual}
                                    onChange={manejarCambioContrasena}
                                />
                            </div>

                            <div className="EditarPerfil__campo">
                                <label htmlFor="nueva-contrasena">
                                    Nueva contraseña
                                </label>

                                <input
                                    id="nueva-contrasena"
                                    name="nuevaContrasena"
                                    type="password"
                                    placeholder="Ingresá tu nueva contraseña"
                                    value={contrasenas.nuevaContrasena}
                                    onChange={manejarCambioContrasena}
                                />
                            </div>

                            <div className="EditarPerfil__campo">
                                <label htmlFor="confirmar-contrasena">
                                    Confirmar nueva contraseña
                                </label>

                                <input
                                    id="confirmar-contrasena"
                                    name="confirmarContrasena"
                                    type="password"
                                    placeholder="Repetí tu nueva contraseña"
                                    value={contrasenas.confirmarContrasena}
                                    onChange={manejarCambioContrasena}
                                />
                            </div>

                            <p className="EditarPerfil__olvidar">
                                <button
                                    type="button"
                                    onClick={() => navigate("/olvidar-contraseña")}
                                >
                                    ¿Olvidaste tu contraseña?
                                </button>
                            </p>

                            <Boton
                                texto={cambiandoContrasena ? "Cambiando..." : "Cambiar contraseña"}
                                variante="principal EditarPerfil__boton--contrasena"
                                type="button"
                                onClick={cambiarContrasena}
                            />

                        </div>

                    </section>

                    {/* DIVISOR */}
                    <div
                        className="EditarPerfil__divisor"
                        aria-hidden="true"
                    >
                        <LineaM lado="izquierdo" />
                    </div>

                    {/* COLUMNA DERECHA */}
                    <section className="EditarPerfil__preferencias">

                        <div className="EditarPerfil__notificaciones">

                            <div className="EditarPerfil__notificacionesTitulo">

                                <span className="material-symbols-outlined">
                                    notifications_active
                                </span>

                                <h2>Notificaciones</h2>

                                <span className="EditarPerfil__interruptor" />

                            </div>

                            <p>
                                Recibí avisos sobre compras, ventas, intercambios,
                                consultas y novedades importantes.
                            </p>

                        </div>

                        <div className="EditarPerfil__acciones">

                            <Boton
                                texto={guardando ? "Guardando..." : "Guardar cambios"}
                                variante="principal EditarPerfil__boton--guardar"
                                type="button"
                                onClick={guardarCambios}
                            />

                            <Boton
                                texto="Cerrar sesión"
                                variante="principal EditarPerfil__boton--cerrarSesion"
                                iconoGoogle="logout"
                                type="button"
                                onClick={cerrarSesion}
                            />

                            <Boton
                                texto={eliminandoCuenta ? "Eliminando..." : "Eliminar cuenta"}
                                variante="secundario EditarPerfil__boton--eliminar"
                                iconoGoogle="delete_outline"
                                type="button"
                                onClick={eliminarCuenta}
                            />
                        </div>

                    </section>

                </div>

            </section>

            {/* ALERTAS */}
            {alerta && (
                <Alert
                    titulo={alerta.titulo}
                    mensaje={alerta.mensaje}
                    textoBoton={alerta.textoBoton}
                    onClick={alerta.onClick || (() => setAlerta(null))}
                    tipoInput={alerta.tipoInput}
                    valorInput={contrasenaEliminar}
                    onChangeInput={(e) => setContrasenaEliminar(e.target.value)}
                    placeholderInput={alerta.placeholderInput}
                    textoBotonSecundario={alerta.textoBotonSecundario}
                    onClickSecundario={alerta.onClickSecundario}
                />
            )}

        </main>
    );
}