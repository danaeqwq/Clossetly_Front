import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "./DetalleOutfit.css";
import "../../../styles/variables.css";
import "../../../styles/global.css";
import Boton from "../../../componentes/Boton/Boton";
import LineaM from "../../../componentes/LineaM/LineaM";
import Outfit from "../../../assets/Ropa__ejemplo.jpg";

export default function DetalleOutfit() {
    const { id } = useParams();
    const [outfit, setOutfit] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(`http://localhost:3000/api/outfits/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(({ data }) => {
            setOutfit(data.outfit);
        })
        .catch(error => {
            console.error("Error al obtener el outfit:", error);
        })
        .finally(() => {
            setCargando(false);
        });
    }, [id]);

    const obtenerImagen = (imagen) => {
        if (!imagen) return Outfit;
        if (
            imagen.startsWith("http") ||
            imagen.startsWith("data:") ||
            imagen.startsWith("blob:")
        ) {
            return imagen;
        }
        return `http://localhost:3000${imagen}`;
    };

    if (cargando) {
        return (
            <main className="DetalleOutfit">
                <p>Cargando outfit...</p>
            </main>
        );
    }

    if (!outfit) {
        return (
            <main className="DetalleOutfit">
                <p>No se encontraron los datos del outfit.</p>
            </main>
        );
    }

    const prendas = outfit.prendas || [];

    const imagenPrincipal = prendas.find(
        prenda => prenda.imagen
    )?.imagen;

    return (
        <main className="DetalleOutfit">
            <section
                className="DetalleOutfit__principal"
                aria-label="Detalle del outfit"
            >
                <article className="DetalleOutfit__ficha">
                    <div className="DetalleOutfit__imagenMarco">
                        <img
                            src={obtenerImagen(imagenPrincipal)}
                            alt={outfit.nombre}
                        />
                    </div>

                    <div className="DetalleOutfit__informacion">
                        <span className="DetalleOutfit__insignia">
                            <span
                                className="material-symbols-outlined"
                                aria-hidden="true"
                            >
                                styler
                            </span>
                            OUTFIT
                        </span>

                        <h1>{outfit.nombre}</h1>

                        <p className="DetalleOutfit__descripcion">
                            {outfit.descripcion || "Este outfit no tiene descripción."}
                        </p>

                        <div className="DetalleOutfit__privacidad">
                            <strong>Privacidad</strong>

                            <span>
                                {Number(outfit.privacidad) === 1
                                    ? "Pública"
                                    : "Privada"}
                            </span>

                            <span
                                className="DetalleOutfit__interruptor"
                                aria-label="Privacidad"
                            />
                        </div>

                        <dl className="DetalleOutfit__datos">
                            <div>
                                <dt>
                                    <span
                                        className="material-symbols-outlined"
                                        aria-hidden="true"
                                    >
                                        calendar_today
                                    </span>
                                    Temporada
                                </dt>
                                <dd>{outfit.temporada || "Sin especificar"}</dd>
                            </div>

                            <div>
                                <dt>
                                    <span
                                        className="material-symbols-outlined"
                                        aria-hidden="true"
                                    >
                                        person
                                    </span>
                                    Género
                                </dt>
                                <dd>{outfit.genero || "Sin especificar"}</dd>
                            </div>

                            <div>
                                <dt>
                                    <span
                                        className="material-symbols-outlined"
                                        aria-hidden="true"
                                    >
                                        event
                                    </span>
                                    Ocasión
                                </dt>
                                <dd>{outfit.ocasion || "Sin especificar"}</dd>
                            </div>
                        </dl>

                        <div
                            className="DetalleOutfit__linea"
                            aria-hidden="true"
                        >
                            <LineaM lado="izquierdo" />
                        </div>

                        <div
                            className="DetalleOutfit__galeria"
                            aria-label="Prendas del outfit"
                        >
                            {prendas
                                .filter(prenda => prenda.imagen)
                                .map(prenda => (
                                    <img
                                        key={prenda.id}
                                        src={obtenerImagen(prenda.imagen)}
                                        alt={prenda.nombre}
                                    />
                                ))}
                        </div>
                    </div>
                </article>

                <aside
                    className="DetalleOutfit__panel"
                    aria-label="Datos y opciones del outfit"
                >
                    <h2>Datos del Outfit</h2>

                    <section className="DetalleOutfit__prendas">
                        <h3>Prendas que lleva:</h3>

                        <div className="DetalleOutfit__etiquetas">
                            {prendas.length > 0 ? (
                                prendas.map(prenda => (
                                    <span key={prenda.id}>
                                        {prenda.nombre}
                                    </span>
                                ))
                            ) : (
                                <span>Sin prendas</span>
                            )}
                        </div>
                    </section>

                    <Boton
                        texto="Modificar Outfit"
                        variante="secundario"
                        iconoGoogle="edit_square"
                        type="button"
                    />

                    <Boton
                        texto="Eliminar outfit"
                        variante="secundario eliminar"
                        iconoGoogle="delete"
                        type="button"
                    />
                </aside>
            </section>
        </main>
    );
}