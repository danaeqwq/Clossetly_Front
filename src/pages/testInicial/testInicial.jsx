import "./testInicial.css"
import "../../styles/variables.css"
import Boton from "../../componentes/Boton/Boton"
import LineaM from "../../componentes/LineaM/LineaM"
import Logo from "../../assets/Logo.svg"
import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router"

export default function TestInicial() {
    const [preguntas, setPreguntas] = useState([])
    const [respuestas, setRespuestas] = useState({})
    const [cargando, setCargando] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3000/api/test-estilo/preguntas")
            .then((respuesta) => {
                setPreguntas(respuesta.data)
            })
            .catch((error) => {
                console.error("Error al obtener las preguntas:", error)
            })
            .finally(() => {
                setCargando(false)
            })
    }, [])

    const seleccionarOpcion = (idPregunta, idOpcion) => {
        setRespuestas((prev) => {
            const opcionesActuales = prev[idPregunta] || []
            if (opcionesActuales.includes(idOpcion)) {
                return {
                    ...prev,
                    [idPregunta]: opcionesActuales.filter(
                        (id) => id !== idOpcion
                    )
                }
            }
            return {
                ...prev,
                [idPregunta]: [...opcionesActuales, idOpcion]
            }
        })
    }

    const confirmarTest = () => {
        const todasRespondidas = preguntas.every(
            (pregunta) => (respuestas[pregunta.Id_pregunta] || []).length > 0
        )

        if (!todasRespondidas) {
            alert("Debés responder todas las preguntas")
            return
        }

        const respuestasSeleccionadas = Object.values(respuestas).flat()
        const idUsuario = localStorage.getItem("idUsuario")
        if (!idUsuario) {
            alert("No se pudo identificar al usuario")
            return
        }
        
        axios.post("http://localhost:3000/api/test-estilo/resultados", {
            idUsuario: Number(idUsuario),
            respuestas: respuestasSeleccionadas
        })
        .then((respuesta) => {
            console.log("Resultado del test:", respuesta.data)
            alert("¡Test completado correctamente!")
            navigate("/mi-cuenta")
        })
        .catch((error) => {
            console.error("Error al guardar el test:", error)
            console.error("Respuesta del servidor:", error.response?.data)
        })
    }

    if (cargando) {
        return <p>Cargando preguntas...</p>
    }

    return (
        <main className="TestInicial">
            <div className="TestInicial__pagina">

                <header className="TestInicial__encabezado">
                    <div className="TestInicial__marca">
                        <img src={Logo} alt="" className="TestInicial__logo" />
                        <h1 className="TestInicial__titulo">
                            Test inicial de <span className="TestInicial__marcaNombre">Clossetly</span>
                        </h1>
                    </div>

                    <p className="TestInicial__subtitulo">
                        Completá el test para personalizar tu experiencia en Clossetly
                    </p>
                </header>

                <section className="TestInicial__composicion" aria-label="Test inicial">

                    <div className="TestInicial__lineaContenedor TestInicial__lineaContenedor--izquierdo">
                        <LineaM lado="izquierdo" />
                    </div>

                    {preguntas.map((pregunta, indice) => (
                        <article
                            key={pregunta.Id_pregunta}
                            className={`TestInicial__tarjeta ${
                                respuestas[pregunta.Id_pregunta]?.length > 0
                                    ? "TestInicial__tarjeta--destacada"
                                    : ""
                            } TestInicial__tarjeta--pregunta${indice + 1}`}
                        >
                            <h2 className="TestInicial__preguntaTitulo">
                                <span className="TestInicial__numero">
                                    {indice + 1}
                                </span>
                                <span>{pregunta.pregunta}</span>
                            </h2>

                            <ul className={`TestInicial__opciones ${
                                indice === 0 || indice === 1
                                    ? "TestInicial__opciones--tresColumnas"
                                    : ""
                            } ${
                                indice === 2
                                    ? "TestInicial__opciones--dosColumnas TestInicial__opciones--compactas"
                                    : ""
                            } ${
                                indice === 3 || indice === 5
                                    ? "TestInicial__opciones--cuatroColumnas"
                                    : ""
                            } ${
                                indice === 4
                                    ? "TestInicial__opciones--dosColumnas"
                                    : ""
                            }`}>
                                {pregunta.opciones.map((opcion) => {
                                    const seleccionada = (
                                        respuestas[pregunta.Id_pregunta] || []
                                    ).includes(opcion.id_opcion)

                                    return (
                                        <li
                                            key={opcion.id_opcion}
                                            className="TestInicial__opcion"
                                            onClick={() => seleccionarOpcion(
                                                pregunta.Id_pregunta,
                                                opcion.id_opcion
                                            )}
                                        >
                                            <span className={`TestInicial__casilla ${
                                                seleccionada
                                                    ? "TestInicial__casilla--seleccionada"
                                                    : ""
                                            }`}>
                                                {seleccionada && "✓"}
                                            </span>

                                            {pregunta.Id_pregunta === 2 && (
                                                <span
                                                    className={`TestInicial__muestraColor ${
                                                        opcion.opcion === "Blanco"
                                                            ? "TestInicial__muestraColor--blanco"
                                                            : ""
                                                    }`}
                                                    style={{
                                                        backgroundColor: opcion.codigo_color
                                                    }}
                                                />
                                            )}

                                            {opcion.opcion}
                                        </li>
                                    )
                                })}
                            </ul>
                        </article>
                    ))}

                    <div className="TestInicial__accion">
                        <span className="TestInicial__botonContenedor">
                            <Boton
                                texto="Confirmar"
                                variante="principal"
                                type="button"
                                onClick={confirmarTest}
                            />
                        </span>
                    </div>

                    <div className="TestInicial__lineaContenedor TestInicial__lineaContenedor--derecho">
                        <LineaM lado="derecho" />
                    </div>

                </section>
            </div>
        </main>
    )
}