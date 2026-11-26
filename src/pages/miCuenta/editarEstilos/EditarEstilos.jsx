import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Agregar from "./modal/Agregar";
import AgregarVibras from "./modal/AgregarVibras";
import "./EditarEstilos.css";
import "../../../styles/global.css";
import "../../../styles/variables.css";

const preferenciasIniciales = [
    {
        id: "favoritas",
        idPregunta: 1,
        icono: "favorite_border",
        titulo: "Mis prendas favoritas:",
        elementos: [],
        seleccionados: [],
    },
    {
        id: "temporadas",
        idPregunta: 3,
        icono: "calendar_today",
        titulo: "Mis temporadas:",
        elementos: [],
        seleccionados: [],
    },
    {
        id: "colores",
        idPregunta: 2,
        icono: "palette",
        titulo: "Mis colores:",
        elementos: [],
        seleccionados: [],
    },
    {
        id: "transmitir",
        idPregunta: 4,
        icono: "auto_awesome",
        titulo: "Vibras que quiero transmitir:",
        elementos: [],
        seleccionados: [],
    },
    {
        id: "ropa",
        idPregunta: 5,
        icono: "checkroom",
        titulo: "Cómo me gusta la ropa:",
        elementos: [],
        seleccionados: [],
    },
    {
        id: "estilos",
        idPregunta: 6,
        icono: "styler",
        titulo: "Mis estilos:",
        elementos: [],
        seleccionados: [],
    },
];

export default function EditarEstilos() {
    const [preferencias, setPreferencias] = useState(preferenciasIniciales);
    const [resultados, setResultados] = useState([]);
    const [catalogos, setCatalogos] = useState({ estilos: [] });
    const [cargando, setCargando] = useState(true);

    const [modalEstilosAbierto, setModalEstilosAbierto] = useState(false);
    const [modalVibrasAbierto, setModalVibrasAbierto] = useState(false);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get("http://localhost:3000/api/usuarios/mi-cuenta", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(({ data }) => {
            const datos = data.preferencias || {};
            const catalogosRecibidos = data.catalogos || {};
            const resultadosTest = data.resultados || [];

            setResultados(resultadosTest);
            setCatalogos(catalogosRecibidos);
            const estilosIniciales = datos.estilos || [];
            setPreferencias([
                {
                    ...preferenciasIniciales[0],
                    elementos: catalogosRecibidos.prendas || [],
                    seleccionados: datos.prendas || []
                },
                {
                    ...preferenciasIniciales[1],
                    elementos: catalogosRecibidos.temporadas || [],
                    seleccionados: datos.temporadas || []
                },
                {
                    ...preferenciasIniciales[2],
                    elementos: catalogosRecibidos.colores || [],
                    seleccionados: (datos.colores || []).map(
                        color => color.color
                    )
                },
                {
                    ...preferenciasIniciales[3],
                    seleccionados: datos.transmitir || []
                },
                {
                    ...preferenciasIniciales[4],
                    elementos: catalogosRecibidos.calce || [],
                    seleccionados: datos.calce || []
                },
                {
                    ...preferenciasIniciales[5],
                    elementos: catalogosRecibidos.estilos || [],
                    seleccionados: estilosIniciales
                }
            ]);
        })
        .catch(error => {
            console.error(
                "Error al obtener las preferencias:",
                error
            );
            alert(
                error.response?.data?.mensaje ||
                "No se pudieron cargar las preferencias."
            );
        })
        .finally(() => {
            setCargando(false);
        });
    }, [navigate]);


    const cambiarSeleccion = (idPreferencia, elemento, seleccionadaForzada = null) => {
        const preferencia = preferencias.find(p => p.id === idPreferencia);

        const seleccionada = seleccionadaForzada !== null
            ? seleccionadaForzada
            : !preferencia.seleccionados.includes(elemento);

        return axios.put(
            "http://localhost:3000/api/usuarios/mi-cuenta/preferencias",
            {
                id_pregunta: preferencia.idPregunta,
                opcion: elemento,
                seleccionada
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(() => {
            setPreferencias(prev => prev.map(preferencia => {
                if (preferencia.id !== idPreferencia) return preferencia;
                return {
                    ...preferencia,
                    seleccionados: seleccionada
                        ? [...preferencia.seleccionados, elemento]
                        : preferencia.seleccionados.filter(item => item !== elemento)
                };
            }));
        })
        .catch(error => {
            console.error("Error al guardar la preferencia:", error);
            throw error;
        });
    };

    // GUARDAR LOS ESTILOS DEL MODAL
    const guardarEstilos = nuevosEstilos => {
        const actuales = preferencias.find(p => p.id === "estilos").seleccionados;
        const agregados = nuevosEstilos.filter(estilo => !actuales.includes(estilo));
        const eliminados = actuales.filter(estilo => !nuevosEstilos.includes(estilo));
        agregados.forEach(estilo => cambiarSeleccion("estilos", estilo, true));
        eliminados.forEach(estilo => cambiarSeleccion("estilos", estilo, false));
    };

    // GUARDAR LAS VIBRAS DEL MODAL
    const guardarVibras = nuevasVibras => {
        const actuales = preferencias.find(p => p.id === "transmitir").seleccionados;

        const agregadas = nuevasVibras.filter(vibra => !actuales.includes(vibra));
        const eliminadas = actuales.filter(vibra => !nuevasVibras.includes(vibra));

        agregadas.forEach(vibra => cambiarSeleccion("transmitir", vibra, true));
        eliminadas.forEach(vibra => cambiarSeleccion("transmitir", vibra, false));
    };

    const abrirModal = categoria => {
        if (categoria === "estilos") {
            setModalEstilosAbierto(true);
        }

        if (categoria === "transmitir") {
            setModalVibrasAbierto(true);
        }
    };

    if (cargando) {
        return (
            <main className="EditarEstilos">
                <p>Cargando preferencias...</p>
            </main>
        );
    }
    const estilosSeleccionados = preferencias.find(p => p.id === "estilos")?.seleccionados || [];
    const vibrasSeleccionadas = preferencias.find(p => p.id === "transmitir")?.seleccionados || [];

    return (
        <main className="EditarEstilos">
            <section
                className="EditarEstilos__panel"
                aria-labelledby="EditarEstilos__titulo"
            >
                <h1 id="EditarEstilos__titulo">
                    Preferencias de estilos
                </h1>

                <div className="EditarEstilos__preferencias">
                    {preferencias.map(preferencia => {
                        const elementosMostrar =
                            preferencia.id === "estilos" ||
                            preferencia.id === "transmitir"
                                ? preferencia.seleccionados
                                : preferencia.elementos || [];

                        return (
                            <section
                                className={`EditarEstilos__grupo EditarEstilos__grupo--${preferencia.id}`}
                                key={preferencia.id}
                            >
                                <div className="EditarEstilos__encabezadoGrupo">
                                    <h2>
                                        <span
                                            className="material-symbols-outlined"
                                            aria-hidden="true"
                                        >
                                            {preferencia.icono}
                                        </span>

                                        {preferencia.titulo}
                                    </h2>

                                    {(preferencia.id === "estilos" ||
                                        preferencia.id === "transmitir") && (
                                        <button
                                            className="EditarEstilos__agregar"
                                            type="button"
                                            onClick={() => abrirModal(preferencia.id)}
                                        >
                                            <span aria-hidden="true">＋</span>
                                            Agregar
                                        </button>
                                    )}
                                </div>

                                {preferencia.id === "colores" ? (
                                    <div
                                        className="EditarEstilos__paleta"
                                        aria-label="Colores preferidos"
                                    >
                                        {(preferencia.elementos || []).map(color => {
                                            const seleccionado =
                                                preferencia.seleccionados.includes(
                                                    color.color
                                                );

                                            return (
                                                <label
                                                    className="EditarEstilos__opcionColor"
                                                    key={color.id_color}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={seleccionado}
                                                        onChange={() =>
                                                            cambiarSeleccion(
                                                                "colores",
                                                                color.color
                                                            )
                                                        }
                                                    />

                                                    <span
                                                        className="EditarEstilos__muestraColor"
                                                        style={{
                                                            backgroundColor: color.codigo
                                                        }}
                                                        aria-hidden="true"
                                                    />

                                                    <span>{color.color}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="EditarEstilos__etiquetas">
                                        {elementosMostrar.map((elemento, indice) => {
                                            const seleccionado =
                                                preferencia.seleccionados.includes(
                                                    elemento
                                                );

                                            return (
                                                <button
                                                    key={`${preferencia.id}-${elemento}-${indice}`}
                                                    type="button"
                                                    disabled={
                                                        preferencia.id === "estilos" ||
                                                        preferencia.id === "transmitir"
                                                    }
                                                    onClick={() =>
                                                        cambiarSeleccion(
                                                            preferencia.id,
                                                            elemento
                                                        )
                                                    }
                                                    className={
                                                        seleccionado
                                                            ? "EditarEstilos__etiqueta EditarEstilos__etiqueta--seleccionada"
                                                            : "EditarEstilos__etiqueta"
                                                    }
                                                >
                                                    {typeof elemento === "object"
                                                        ? elemento.estilo
                                                        : elemento}
                                                </button>
                                            );
                                        })}

                                        {elementosMostrar.length === 0 && (
                                            <span className="EditarEstilos__sinSeleccion">
                                                {preferencia.id === "estilos"
                                                    ? "Todavía no seleccionaste estilos."
                                                    : "Todavía no seleccionaste opciones."}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </section>
                        );
                    })}
                </div>

                <div className="EditarEstilos__acciones">
                    <button
                        className="EditarEstilos__guardar"
                        type="button"
                        onClick={() => navigate("/mi-cuenta")}
                    >
                        Guardar cambios
                    </button>

                    <button
                        className="EditarEstilos__cancelar"
                        type="button"
                        onClick={() => navigate("/mi-cuenta")}
                    >
                        Cancelar
                    </button>
                </div>
            </section>

            {modalEstilosAbierto && (
                <Agregar
                    estilosDisponibles={catalogos.estilos || []}
                    resultados={resultados}
                    seleccionadas={estilosSeleccionados}
                    onGuardar={guardarEstilos}
                    onClose={() => setModalEstilosAbierto(false)}
                />
            )}

            {modalVibrasAbierto && (
                <AgregarVibras
                    seleccionadas={vibrasSeleccionadas}
                    onGuardar={guardarVibras}
                    onClose={() => setModalVibrasAbierto(false)}
                />
            )}
        </main>
    );
}