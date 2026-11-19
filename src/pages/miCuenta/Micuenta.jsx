
import "./Micuenta.css";
import "../../styles/global.css";
import "../../styles/variables.css";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import LineaM from "../../componentes/LineaM/LineaM";
import Boton from "../../componentes/Boton/Boton";
import Avatar from "../../assets/userfoto.jpg";

export default function Micuenta() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);
    const [estadisticas, setEstadisticas] = useState({
        publicaciones: 0,
        ventas: 0,
        intercambios: 0
    });

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError(true);
            setCargando(false);
            return;
        }

        axios.get("http://localhost:3000/api/usuarios/mi-cuenta", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((respuesta) => {
            console.log("Datos recibidos:", respuesta.data);

            setUsuario(respuesta.data.usuario);
            setEstadisticas(respuesta.data.estadisticas);
        })
        .catch((error) => {
            console.error("Error al obtener los datos de mi cuenta:", error);
            setError(true);
        })
        .finally(() => {
            setCargando(false);
        });

    }, []);

    if (cargando) {
        return (
            <main className="Micuenta">
                <p>Cargando perfil...</p>
            </main>
        );
    }

    if (error || !usuario) {
        return (
            <main className="Micuenta">
                <p>No se pudieron cargar los datos de tu cuenta.</p>
                <Boton
                    texto="Volver a iniciar sesión"
                    variante="principal"
                    type="button"
                    onClick={() => navigate("/login")}
                />
            </main>
        );
    }

    const fotoPerfil = usuario.foto_perfil
        ? `http://localhost:3000${usuario.foto_perfil}`
        : Avatar;

    return (
        <main className="Micuenta">
            <section className="Micuenta__tarjeta" aria-label="Información de mi cuenta">

                <div className="Micuenta__perfil">

                    <img
                        className="Micuenta__avatar"
                        src={fotoPerfil}
                        alt={`Foto de perfil de ${usuario.nombre}`}
                        onError={(e) => {
                            e.currentTarget.src = Avatar;
                        }}
                    />

                    <div className="Micuenta__identidad">
                        <h1>{usuario.nombre}</h1>

                        <p>
                            {usuario.descripcion || "Todavía no agregaste una descripción."}
                        </p>

                        <div className="Micuenta__estadisticas" aria-label="Actividad de la cuenta">
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

                    <div className="Micuenta__accionesPerfil">
                        <Boton
                            texto="Editar perfil"
                            variante="principal"
                            type="button"
                            onClick={() => navigate("/editar-perfil")}
                        />

                        <Boton
                            texto="Editar mis estilos"
                            variante="principal"
                            type="button"
                            onClick={() => navigate("/editar-estilos")}
                        />
                    </div>

                </div>

                <div className="Micuenta__preferencias">

                    <div className="Micuenta__columna">

                        <section className="Micuenta__grupo">
                            <h2>
                                <span className="material-symbols-outlined" aria-hidden="true">
                                    favorite_border
                                </span>
                                Mis prendas favoritas:
                            </h2>

                            <div className="Micuenta__etiquetas">
                                <span>REMERAS</span>
                                <span>ZAPATILLAS</span>
                                <span>JEANS</span>
                                <span>BUZOS</span>
                                <span>BUZOS</span>
                            </div>
                        </section>

                        <section className="Micuenta__grupo Micuenta__grupo--colores">
                            <h2>
                                <span className="material-symbols-outlined" aria-hidden="true">
                                    palette
                                </span>
                                Mis colores:
                            </h2>

                            <div className="Micuenta__paleta" aria-label="Colores favoritos">
                                <span className="Micuenta__color Micuenta__color--vino" aria-label="Bordó" />
                                <span className="Micuenta__color Micuenta__color--malva" aria-label="Malva" />
                                <span className="Micuenta__color Micuenta__color--azul" aria-label="Azul" />
                                <span className="Micuenta__color Micuenta__color--rosa" aria-label="Rosa" />
                                <span className="Micuenta__color Micuenta__color--coral" aria-label="Coral" />
                            </div>
                        </section>

                        <section className="Micuenta__grupo">
                            <h2>
                                <span className="material-symbols-outlined" aria-hidden="true">
                                    checkroom
                                </span>
                                Como me gusta la ropa:
                            </h2>

                            <div className="Micuenta__etiquetas">
                                <span>COMODA</span>
                                <span>URBANO</span>
                                <span>OVERSIZED</span>
                            </div>
                        </section>

                    </div>

                    <div className="Micuenta__divisor" aria-hidden="true">
                        <LineaM lado="izquierdo" />
                    </div>

                    <div className="Micuenta__columna">

                        <section className="Micuenta__grupo">
                            <h2>
                                <span className="material-symbols-outlined" aria-hidden="true">
                                    calendar_today
                                </span>
                                Mis temporadas:
                            </h2>

                            <div className="Micuenta__etiquetas">
                                <span>OTOÑO</span>
                                <span>INVIERNO</span>
                            </div>
                        </section>

                        <section className="Micuenta__grupo">
                            <h2>
                                <span className="material-symbols-outlined" aria-hidden="true">
                                    auto_awesome
                                </span>
                                Lo que quiero transmitir:
                            </h2>

                            <div className="Micuenta__etiquetas">
                                <span>SEGURIDAD</span>
                                <span>REBELDIA</span>
                                <span>CREATIVIDAD</span>
                            </div>
                        </section>

                        <section className="Micuenta__grupo">
                            <h2>
                                <span className="material-symbols-outlined" aria-hidden="true">
                                    styler
                                </span>
                                Mis estilos:
                            </h2>

                            <div className="Micuenta__etiquetas">
                                <span>GRUNGE</span>
                                <span>STREETWEAR</span>
                                <span>SOFT GRUNGE</span>
                            </div>
                        </section>

                    </div>

                </div>
            </section>
        </main>
    );
}
