
import { useState, useEffect } from "react";
import "./AgregarVibras.css";
import "../../../../styles/global.css";
import "../../../../styles/variables.css";
import Modal from "../../../../componentes/modal/Modal";
import Boton from "../../../../componentes/Boton/Boton";

const vibrasDisponibles = [
    "Seguridad",
    "Dulzura",
    "Sensualidad",
    "Rebeldía",
    "Misterio",
    "Naturalidad",
    "Creatividad",
    "Comodidad",
    "Libertad",
    "Elegancia",
    "Originalidad",
    "Sofisticación",
];

export default function AgregarVibras({
    seleccionadas = [],
    onGuardar,
    onClose,
}) {
    const [seleccion, setSeleccion] = useState(seleccionadas);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        setSeleccion(seleccionadas);
    }, [seleccionadas]);

    const alternarVibra = vibra => {
        setSeleccion(actuales =>
            actuales.includes(vibra)
                ? actuales.filter(actual => actual !== vibra)
                : [...actuales, vibra]
        );
    };

    const guardarSeleccion = () => {
        setGuardando(true);

        Promise.resolve(onGuardar?.(seleccion))
            .then(() => {
                onClose?.();
            })
            .catch(error => {
                console.error("Error al guardar las vibras:", error);
            })
            .finally(() => {
                setGuardando(false);
            });
    };

    return (
        <Modal
            titulo="Agregar vibras que quiero transmitir"
            onClose={onClose}
        >
            <div className="AgregarVibras__contenido">
                <div
                    className="AgregarVibras__lista"
                    aria-label="Vibras disponibles"
                >
                    {vibrasDisponibles.map(vibra => {
                        const activa = seleccion.includes(vibra);

                        return (
                            <button
                                key={vibra}
                                type="button"
                                className={
                                    activa
                                        ? "AgregarVibras__vibra AgregarVibras__vibra--activa"
                                        : "AgregarVibras__vibra"
                                }
                                onClick={() => alternarVibra(vibra)}
                                aria-pressed={activa}
                            >
                                {vibra}
                            </button>
                        );
                    })}
                </div>

                <div className="AgregarVibras__acciones">
                    <Boton
                        texto={guardando ? "Guardando..." : "Agregar vibras"}
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
