
import { useState, useEffect } from "react";
import "./Agregar.css";
import "../../../../styles/global.css";
import "../../../../styles/variables.css";
import Modal from "../../../../componentes/modal/Modal";
import Boton from "../../../../componentes/Boton/Boton";

export default function Agregar({
    estilosDisponibles = [],
    resultados = [],
    seleccionadas = [],
    onGuardar,
    onClose,
}) {
    const [seleccion, setSeleccion] = useState(seleccionadas);
    const [busqueda, setBusqueda] = useState("");
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        setSeleccion(seleccionadas);
    }, [seleccionadas]);

    const normalizar = texto =>
        (texto || "").trim().toLowerCase();

    const esResultado = estilo =>
        resultados.some(
            resultado =>
                normalizar(resultado.estilo) === normalizar(estilo)
        );

    const estaSeleccionado = estilo =>
        seleccion.some(
            seleccionado =>
                normalizar(seleccionado) === normalizar(estilo)
        );

    const alternarEstilo = estilo => {
        setSeleccion(actuales =>
            actuales.some(
                actual => normalizar(actual) === normalizar(estilo)
            )
                ? actuales.filter(
                    actual => normalizar(actual) !== normalizar(estilo)
                )
                : [...actuales, estilo]
        );
    };

    const guardarSeleccion = () => {
        setGuardando(true);

        Promise.resolve(onGuardar?.(seleccion))
            .then(() => {
                onClose?.();
            })
            .catch(error => {
                console.error("Error al guardar los estilos:", error);
            })
            .finally(() => {
                setGuardando(false);
            });
    };

    const estilosFiltrados = estilosDisponibles.filter(estilo =>
        normalizar(estilo.estilo).includes(normalizar(busqueda))
    );

    return (
        <Modal titulo="Mis estilos" onClose={onClose}>
            <div className="Agregar__contenido">
                <div className="Agregar__busqueda">
                    <input
                        type="text"
                        placeholder="Buscar estilo..."
                        value={busqueda}
                        onChange={e => setBusqueda(e.target.value)}
                    />

                    <span
                        className="material-symbols-outlined"
                        aria-hidden="true"
                    >
                        search
                    </span>
                </div>

                <div
                    className="Agregar__lista"
                    aria-label="Estilos disponibles"
                >
                    {estilosFiltrados.map(estilo => {
                        const resultado = esResultado(estilo.estilo);
                        const seleccionado = estaSeleccionado(estilo.estilo);

                        return (
                            <button
                                key={estilo.id_estilo}
                                type="button"
                                className={[
                                    "Agregar__estilo",
                                    resultado && "Agregar__estilo--resultado",
                                    seleccionado && "Agregar__estilo--seleccionado"
                                ].filter(Boolean).join(" ")}
                                onClick={() => alternarEstilo(estilo.estilo)}
                                aria-pressed={seleccionado}
                            >
                                {estilo.estilo}
                            </button>
                        );
                    })}

                    {estilosFiltrados.length === 0 && (
                        <span className="Agregar__sinResultados">
                            No se encontraron estilos.
                        </span>
                    )}
                </div>

                <div className="Agregar__acciones">
                    <Boton
                        texto={guardando ? "Guardando..." : "Guardar estilos"}
                        variante="principal"
                        type="button"
                        onClick={guardarSeleccion}
                        disabled={guardando}
                    />
                </div>
            </div>
        </Modal>
    );
}
