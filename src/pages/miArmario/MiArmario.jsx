
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import "./miArmario.css";
import "../../styles/variables.css";
import Select from "../../componentes/select/Select";
import PublicacionesArmario from "./misPublicaciones/PublicacionesArmario";
import PrendasArmario from "./misPrendas/PrendasArmario";
import OutfitsArmario from "./misOutfits/OutfitsArmario";
import CrearOutfit from "./misPrendas/mi modales/crear oufit/CrearOutfit";
import Alert from "../../componentes/Alert/Alert";

const opcionesArmario = [
    { valor: "publicaciones", texto: "MIS PUBLICACIONES" },
    { valor: "prendas", texto: "MIS PRENDAS" },
    { valor: "outfits", texto: "MIS OUTFITS" },
];

export default function MiArmario() {
    const location = useLocation();
    const token = localStorage.getItem("token");

    const [seccionActiva, setSeccionActiva] = useState("publicaciones");
    const [abrirPropuestas, setAbrirPropuestas] = useState(false);

    const [publicacionesCreadas, setPublicacionesCreadas] = useState({
        venta: [],
        intercambio: [],
    });

    const [accionesPrendas, setAccionesPrendas] = useState(null);
    const [outfits, setOutfits] = useState([]);
    const [outfitEnEdicion, setOutfitEnEdicion] = useState(null);
    const [outfitCreado, setOutfitCreado] = useState(false);

    useEffect(() => {
        if (location.state?.abrirPropuestas) {
            setSeccionActiva("publicaciones");
            setAbrirPropuestas(true);
        }
    }, [location.state]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/outfits", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(({ data }) => {
            setOutfits(data.outfits || []);
        })
        .catch(error => {
            console.error("Error al obtener los outfits:", error);
        });
    }, []);

    const registrarPublicacion = prenda => {
        const tipo = prenda.tipoPublicacion;
        const nuevaPublicacion = {
            ...prenda,
            ...(tipo === "venta"
                ? {
                    stock: Number(prenda.stock),
                    precio: Number(prenda.precio),
                    solicitudes: [],
                }
                : {
                    tipo: "intercambio",
                    prenda: prenda.categoria,
                    estadoMinimoAceptado: prenda.estadoMinimo,
                    propuestas: [],
                }),
        };

        setPublicacionesCreadas(actuales => ({
            ...actuales,
            [tipo]: [...actuales[tipo], nuevaPublicacion],
        }));

        setSeccionActiva("publicaciones");
    };

    const registrarAccionesPrendas = acciones => {
    setAccionesPrendas(acciones);
};

    const obtenerDatosOutfit = datos => ({
        nombre: datos.nombre,
        descripcion: datos.descripcion,
        privacidad: datos.privacidad ? 1 : 0,
        temporada: datos.temporada,
        ocasion: datos.ocasion,
        genero: datos.genero,
        prendas: datos.prendas.map(prenda => Number(prenda.id)),
    });

    // CREAR OUTFIT
    const crearOutfit = datos => {
        const datosBackend = obtenerDatosOutfit(datos);

        axios.post(
            "http://localhost:3000/api/outfits",
            datosBackend,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then(({ data }) => {
            setOutfits(actuales => [
                ...actuales,
                {
                    ...datos,
                    id: data.id_outfit,
                },
            ]);
            accionesPrendas?.onCancelar?.();
            setOutfitCreado(true);
        })
        .catch(error => {
            console.error("Error al crear el outfit:", error);
        });
    };

    const editarOutfit = datos => {
        const datosBackend = obtenerDatosOutfit(datos);
        const id = outfitEnEdicion.id;
        axios.put(
            `http://localhost:3000/api/outfits/${id}`,
            datosBackend,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then(() => {
            setOutfits(actuales =>
                actuales.map(outfit =>
                    outfit.id === id
                        ? {
                            ...outfit,
                            ...datos,
                            id,
                        }
                        : outfit
                )
            );
            setOutfitEnEdicion(null);
        })
        .catch(error => {
            console.error("Error al modificar el outfit:", error);
        });
    };

    // ELIMINAR OUTFIT
    const eliminarOutfit = id => {
        axios.delete(
            `http://localhost:3000/api/outfits/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then(() => {
            setOutfits(actuales =>
                actuales.filter(outfit => outfit.id !== id)
            );
        })
        .catch(error => {
            console.error("Error al eliminar el outfit:", error);
        });
    };
    const actualizarPublicacion = (publicacion, tipo) => {
        setPublicacionesCreadas(actuales => ({
            ...actuales,
            [tipo]: actuales[tipo].map(actual =>
                actual.id === publicacion.id
                    ? { ...actual, ...publicacion }
                    : actual
            ),
        }));
    };

    return (
        <main className="MiArmario">
            <div className="MiArmario__barra">
                <Select
                    className="MiArmario__tabs"
                    opciones={opcionesArmario}
                    seleccionada={seccionActiva}
                    onChange={setSeccionActiva}
                    ariaLabel="Secciones de Mi armario"
                />

                <div
                    className="MiArmario__accionesPrendas"
                    hidden={seccionActiva !== "prendas"}
                >
                    {accionesPrendas?.modoSeleccionOutfit ? (
                        <div
                            className="MiArmario__barraSeleccionOutfit"
                            role="region"
                            aria-label="Selección de prendas para outfit"
                        >
                            <span>
                                {accionesPrendas.cantidad}{" "}
                                {accionesPrendas.cantidad === 1
                                    ? "prenda seleccionada"
                                    : "prendas seleccionadas"}
                            </span>

                            <button
                                className="MiArmario__crearOutfit"
                                type="button"
                                disabled={accionesPrendas.cantidad < 2}
                                onClick={accionesPrendas.onCrearOutfit}
                            >
                                Crear outfit
                            </button>

                            <button
                                className="MiArmario__cancelarOutfit"
                                type="button"
                                onClick={accionesPrendas.onCancelar}
                            >
                                Cancelar
                            </button>
                        </div>
                    ) : (
                        <button
                            className="MiArmario__crearPrenda"
                            type="button"
                            onClick={accionesPrendas?.onAgregarPrendas}
                        >
                            + Agregar prendas
                        </button>
                    )}
                </div>

            </div>

            {/* MIS PUBLICACIONES */}
            <div hidden={seccionActiva !== "publicaciones"}>
                <PublicacionesArmario
                    publicacionesCreadas={publicacionesCreadas}
                    onPublicacionActualizada={actualizarPublicacion}
                    abrirPropuestas={abrirPropuestas}
                    onPropuestasAbiertas={() => setAbrirPropuestas(false)}
                />
            </div>

            {/* MIS PRENDAS */}
            <div hidden={seccionActiva !== "prendas"}>
                <PrendasArmario
                    onPublicacionCreada={registrarPublicacion}
                    onAccionesChange={registrarAccionesPrendas}
                    onOutfitCreado={crearOutfit}
                />
            </div>

            {/* MIS OUTFITS */}
            {seccionActiva === "outfits" && (
                <OutfitsArmario
                    outfits={outfits}
                    onModificar={setOutfitEnEdicion}
                    onEliminar={eliminarOutfit}
                />
            )}

            {/* MODIFICAR OUTFIT */}
            {outfitEnEdicion && (
                <CrearOutfit
                    key={outfitEnEdicion.id}
                    prendas={outfitEnEdicion.prendas}
                    prendasDisponibles={accionesPrendas?.prendasDisponibles || []}
                    outfit={outfitEnEdicion}
                    onGuardar={editarOutfit}
                    onClose={() => setOutfitEnEdicion(null)}
                />
            )}

            {/* ALERTA DE OUTFIT CREADO */}
            {outfitCreado && (
                <Alert
                    titulo="¡Outfit creado!"
                    mensaje="Tu outfit se guardó correctamente."
                    textoBoton="Entendido"
                    onClick={() => setOutfitCreado(false)}
                />
            )}

        </main>
    );
}
