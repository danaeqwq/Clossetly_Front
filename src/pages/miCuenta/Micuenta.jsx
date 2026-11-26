import "./Micuenta.css";
import "../../styles/global.css";
import "../../styles/variables.css";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import LineaM from "../../componentes/LineaM/LineaM";
import Boton from "../../componentes/Boton/Boton";
import Avatar from "../../../../Back/uploads/perfiles/fotoUsuario1.png";

export default function Micuenta() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [estadisticas, setEstadisticas] = useState({
        publicaciones: 0,
        ventas: 0,
        intercambios: 0
    });

    const [preferencias, setPreferencias] = useState({
        prendas: [],
        colores: [],
        temporadas: [],
        transmitir: [],
        calce: [],
        estilos: []
    });

    const [resultados, setResultados] = useState([]);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);

    // OBTENER DATOS DE MI CUENTA
    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get("http://localhost:3000/api/usuarios/mi-cuenta", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        .then((respuesta) => {
            console.log("Datos recibidos:", respuesta.data);
            setUsuario(respuesta.data.usuario);
            setEstadisticas(respuesta.data.estadisticas);
            setPreferencias(respuesta.data.preferencias);
            setResultados(respuesta.data.resultados);
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

    // FOTO DE PERFIL
    const fotoPerfil = usuario.foto_perfil
    ? `http://localhost:3000${usuario.foto_perfil}`
    : Avatar;

    return (
        <main className="Micuenta">

            <section
                className="Micuenta__tarjeta"
                aria-label="Información de mi cuenta"
            >
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

                        <div
                            className="Micuenta__estadisticas"
                            aria-label="Actividad de la cuenta"
                        >
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

                {/* PREFERENCIAS */}

                <div className="Micuenta__preferencias">

                    <div className="Micuenta__columna">

                        {/* PRENDAS FAVORITAS */}

                        <section className="Micuenta__grupo">

                            <h2>
                                <span
                                    className="material-symbols-outlined"
                                    aria-hidden="true"
                                >
                                    favorite_border
                                </span>
                                Mis prendas favoritas:
                            </h2>

                            <div className="Micuenta__etiquetas">

                                {preferencias.prendas.length > 0 ? (
                                    preferencias.prendas.map((prenda, indice) => (
                                        <span key={indice}>
                                            {prenda.toUpperCase()}
                                        </span>
                                    ))
                                ) : (
                                    <p>Todavía no seleccionaste prendas.</p>
                                )}

                            </div>

                        </section>

                        {/* COLORES */}

                        <section className="Micuenta__grupo Micuenta__grupo--colores">

                            <h2>
                                <span
                                    className="material-symbols-outlined"
                                    aria-hidden="true"
                                >
                                    palette
                                </span>
                                Mis colores:
                            </h2>

                            <div
                                className="Micuenta__paleta"
                                aria-label="Colores favoritos"
                            >

                                {preferencias.colores.length > 0 ? (
                                    preferencias.colores.map((color, indice) => (
                                        <span
                                            key={indice}
                                            className="Micuenta__color"
                                            style={{
                                                backgroundColor: color.codigo
                                            }}
                                            aria-label={color.color}
                                            title={color.color}
                                        />
                                    ))
                                ) : (
                                    <p>Todavía no seleccionaste colores.</p>
                                )}

                            </div>

                        </section>

                        {/* CALCE */}

                        <section className="Micuenta__grupo">

                            <h2>
                                <span
                                    className="material-symbols-outlined"
                                    aria-hidden="true"
                                >
                                    checkroom
                                </span>
                                Cómo me gusta la ropa:
                            </h2>

                            <div className="Micuenta__etiquetas">

                                {preferencias.calce.length > 0 ? (
                                    preferencias.calce.map((calce, indice) => (
                                        <span key={indice}>
                                            {calce.toUpperCase()}
                                        </span>
                                    ))
                                ) : (
                                    <p>Todavía no seleccionaste un calce.</p>
                                )}

                            </div>

                        </section>

                    </div>

                    <div
                        className="Micuenta__divisor"
                        aria-hidden="true"
                    >
                        <LineaM lado="izquierdo" />
                    </div>

                    <div className="Micuenta__columna">

                        {/* TEMPORADAS */}

                        <section className="Micuenta__grupo">

                            <h2>
                                <span
                                    className="material-symbols-outlined"
                                    aria-hidden="true"
                                >
                                    calendar_today
                                </span>
                                Mis temporadas:
                            </h2>

                            <div className="Micuenta__etiquetas">

                                {preferencias.temporadas.length > 0 ? (
                                    preferencias.temporadas.map((temporada, indice) => (
                                        <span key={indice}>
                                            {temporada.toUpperCase()}
                                        </span>
                                    ))
                                ) : (
                                    <p>Todavía no seleccionaste temporadas.</p>
                                )}

                            </div>

                        </section>

                        {/* LO QUE QUIERO TRANSMITIR */}

                        <section className="Micuenta__grupo">

                            <h2>
                                <span
                                    className="material-symbols-outlined"
                                    aria-hidden="true"
                                >
                                    auto_awesome
                                </span>
                                Lo que quiero transmitir:
                            </h2>

                            <div className="Micuenta__etiquetas">

                                {preferencias.transmitir.length > 0 ? (
                                    preferencias.transmitir.map((valor, indice) => (
                                        <span key={indice}>
                                            {valor.toUpperCase()}
                                        </span>
                                    ))
                                ) : (
                                    <p>Todavía no seleccionaste preferencias.</p>
                                )}

                            </div>

                        </section>

                        {/* ESTILOS */}

                        <section className="Micuenta__grupo">

                            <h2>
                                <span
                                    className="material-symbols-outlined"
                                    aria-hidden="true"
                                >
                                    styler
                                </span>
                                Mis estilos:
                            </h2>

                            <div className="Micuenta__etiquetas">

                                {preferencias.estilos.length > 0 ? (
                                    preferencias.estilos.map((estilo, indice) => (
                                        <span key={indice}>
                                            {estilo.toUpperCase()}
                                        </span>
                                    ))
                                ) : (
                                    <p>Todavía no seleccionaste estilos.</p>
                                )}

                            </div>

                        </section>

                    </div>

                </div>

            </section>

        </main>
    );
}