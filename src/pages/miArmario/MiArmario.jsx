import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./miArmario.css";
import "../../styles/variables.css";
import Select from "../../componentes/select/Select";
import PublicacionesArmario from "./misPublicaciones/PublicacionesArmario";
import PrendasArmario from "./misPrendas/PrendasArmario";
import OutfitsArmario from "./misOutfits/OutfitsArmario";
import CrearOutfit from "./misPrendas/mi modales/crear oufit/CrearOutfit";

const opcionesArmario = [
  { valor: "publicaciones", texto: "MIS PUBLICACIONES" },
  { valor: "prendas", texto: "MIS PRENDAS" },
  { valor: "outfits", texto: "MIS OUTFITS" },
];

const clavePublicacion = (publicacion, tipo) => publicacion.claveArmario || `${tipo}-${publicacion.id}`;

export default function MiArmario() {
  const [seccionActiva, setSeccionActiva] = useState("publicaciones");
  const [publicacionesCreadas, setPublicacionesCreadas] = useState({ venta: [], intercambio: [] });
  const [prendasConvertidas, setPrendasConvertidas] = useState([]);
  const [accionesPrendas, setAccionesPrendas] = useState(null);
  const [outfits, setOutfits] = useState([]);
  const [outfitEnEdicion, setOutfitEnEdicion] = useState(null);

  useEffect(() => {
    const obtenerOutfits = async () => {
      const token = localStorage.getItem("token");

      try {
        const respuesta = await axios.get(
          "http://localhost:3000/api/outfits",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOutfits(respuesta.data.outfits || []);

      } catch (error) {
        console.error(
          "Error al obtener los outfits:",
          error.response?.data || error
        );
      }
    };

    obtenerOutfits();
  }, []);

  const registrarPublicacion = (prenda, idSolicitado) => {
    const listaDestino = publicacionesCreadas[prenda.tipoPublicacion] || [];
    const id = idSolicitado != null && !listaDestino.some((publicacion) => publicacion.id === idSolicitado)
      ? idSolicitado
      : `armario-${Date.now()}`;

    if (prenda.tipoPublicacion === "venta") {
      setPublicacionesCreadas((actuales) => ({
        ...actuales,
        venta: [...actuales.venta, {
          ...prenda,
          id,
          claveArmario: `${prenda.tipoPublicacion}-${id}-${Date.now()}`,
          nombre: prenda.nombre,
          imagen: prenda.imagen,
          stock: Number(prenda.stock),
          precio: Number(prenda.precio),
          descripcion: prenda.descripcion,
          privacidad: prenda.privacidad,
          categoria: prenda.categoria,
          solicitudes: [],
        }],
      }));
    } else if (prenda.tipoPublicacion === "intercambio") {
      setPublicacionesCreadas((actuales) => ({
        ...actuales,
        intercambio: [...actuales.intercambio, {
          ...prenda,
          id,
          claveArmario: `${prenda.tipoPublicacion}-${id}-${Date.now()}`,
          tipo: "intercambio",
          nombre: prenda.nombre,
          imagen: prenda.imagen,
          talle: prenda.talle,
          precio: Number(prenda.precio),
          stock: Number(prenda.stock),
          descripcion: prenda.descripcion,
          privacidad: prenda.privacidad,
          temporada: prenda.temporada,
          prenda: prenda.categoria,
          estilos: prenda.estilos,
          estado: prenda.estado,
          genero: prenda.genero,
          tiposAceptados: prenda.tiposAceptados,
          estadoMinimoAceptado: prenda.estadoMinimo,
          colores: prenda.colores,
          propuestas: [],
        }],
      }));
    }

    setSeccionActiva("publicaciones");
  };

  const convertirPublicacion = (publicacion, tipoOrigen, tipoDestino, claveOrigen) => {
    setPublicacionesCreadas((actuales) => {
      const destino = actuales[tipoDestino] || [];
      const convertida = { ...publicacion, tipoPublicacion: tipoDestino, claveArmario: publicacion.claveArmario || `${tipoDestino}-${publicacion.id}-${Date.now()}` };
      if (tipoDestino === "intercambio") convertida.tipo = "intercambio";
      return {
        ...actuales,
        [tipoOrigen]: actuales[tipoOrigen].filter((existente) => clavePublicacion(existente, tipoOrigen) !== claveOrigen),
        [tipoDestino]: [...destino, convertida],
      };
    });
  };

  const convertirPublicacionAPrenda = (publicacion, tipoOrigen, claveOrigen) => {
    setPublicacionesCreadas((actuales) => ({
      ...actuales,
      [tipoOrigen]: actuales[tipoOrigen].filter((existente) => clavePublicacion(existente, tipoOrigen) !== claveOrigen),
    }));
    setPrendasConvertidas((actuales) => [...actuales.filter((prenda) => prenda.claveArmario !== publicacion.claveArmario), {
      ...publicacion,
      claveArmario: publicacion.claveArmario || `publicacion-${tipoOrigen}-${publicacion.id}`,
      tipoPublicacion: "prenda",
    }]);
    setSeccionActiva("prendas");
  };

  const registrarAccionesPrendas = useCallback((acciones) => {
    setAccionesPrendas(acciones);
  }, []);

  const guardarOutfit = async (datos) => {
    const token = localStorage.getItem("token");

    try {
      const datosBackend = {
        nombre: datos.nombre,
        descripcion: datos.descripcion,
        privacidad: datos.privacidad ? 1 : 0,
        temporada: datos.temporada,
        ocasion: datos.ocasion,
        genero: datos.genero,
        prendas: datos.prendas.map((prenda) => Number(prenda.id)),
      };

      // SI ESTAMOS MODIFICANDO UN OUTFIT
      if (outfitEnEdicion) {
        await axios.put(
          `http://localhost:3000/api/outfits/${outfitEnEdicion.id}`,
          datosBackend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Actualizar el outfit existente en la lista
        setOutfits((actuales) =>
          actuales.map((outfit) =>
            outfit.id === outfitEnEdicion.id
              ? {
                ...outfit,
                ...datos,
                id: outfitEnEdicion.id,
              }
              : outfit
          )
        );

        setOutfitEnEdicion(null);

        console.log("Outfit modificado correctamente");

      } else {
        // SI ESTAMOS CREANDO UN OUTFIT
        const respuesta = await axios.post(
          "http://localhost:3000/api/outfits",
          datosBackend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const outfitGuardado = {
          ...datos,
          id: respuesta.data.id_outfit,
        };

        setOutfits((actuales) => [...actuales, outfitGuardado]);

        accionesPrendas?.onCancelar?.();

        console.log("Outfit creado correctamente");
      }

    } catch (error) {
      console.error(
        "Error al guardar el outfit:",
        error.response?.data || error
      );
    }
  };

  const iniciarEdicionOutfit = (outfit) => {
    setOutfitEnEdicion(outfit);
    setSeccionActiva("outfits");
  };

  const eliminarOutfit = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `http://localhost:3000/api/outfits/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Eliminar de la lista solamente si el backend respondió correctamente
      setOutfits((actuales) =>
        actuales.filter((outfit) => String(outfit.id) !== String(id))
      );

      console.log("Outfit eliminado correctamente");

    } catch (error) {
      console.error(
        "Error al eliminar el outfit:",
        error.response?.data || error
      );
    }
  };

  const actualizarPublicacion = (publicacion, tipo) => {
    setPublicacionesCreadas((actuales) => ({
      ...actuales,
      [tipo]: actuales[tipo].map((actual) => (
        clavePublicacion(actual, tipo) === clavePublicacion(publicacion, tipo) ? { ...actual, ...publicacion } : actual
      )),
    }));
  };

  return (
    <main className="MiArmario">
      <div className="MiArmario__barra">
        <Select className="MiArmario__tabs" opciones={opcionesArmario} seleccionada={seccionActiva} onChange={setSeccionActiva} ariaLabel="Secciones de Mi armario" />
        <div className="MiArmario__accionesPrendas" hidden={seccionActiva !== "prendas"}>
          {accionesPrendas?.modoSeleccionOutfit ? (
            <div className="MiArmario__barraSeleccionOutfit" role="region" aria-label="Selección de prendas para outfit">
              <span>{accionesPrendas.cantidad} {accionesPrendas.cantidad === 1 ? "prenda seleccionada" : "prendas seleccionadas"}</span>
              <button className="MiArmario__crearOutfit" type="button" disabled={accionesPrendas.cantidad < 2} onClick={accionesPrendas.onCrearOutfit}>Crear outfit</button>
              <button className="MiArmario__cancelarOutfit" type="button" onClick={accionesPrendas.onCancelar}>Cancelar</button>
            </div>
          ) : (
            <button className="MiArmario__crearPrenda" type="button" onClick={accionesPrendas?.onAgregarPrendas}>+ Agregar prendas</button>
          )}
        </div>
      </div>

      <div hidden={seccionActiva !== "publicaciones"}>
        <PublicacionesArmario
          publicacionesCreadas={publicacionesCreadas}
          onPublicacionActualizada={actualizarPublicacion}
          onPublicacionConvertida={convertirPublicacion}
          onPublicacionConvertidaAPrenda={convertirPublicacionAPrenda}
        />
      </div>
      <div hidden={seccionActiva !== "prendas"}>
        <PrendasArmario
          onPublicacionCreada={registrarPublicacion}
          prendasConvertidas={prendasConvertidas}
          onAccionesChange={registrarAccionesPrendas}
          onOutfitCreado={guardarOutfit}
        />
      </div>
      {seccionActiva === "outfits" && (
        <OutfitsArmario
          outfits={outfits}
          onModificar={iniciarEdicionOutfit}
          onEliminar={eliminarOutfit}
        />
      )}
      {outfitEnEdicion && (
        <CrearOutfit
          key={outfitEnEdicion.id}
          prendas={outfitEnEdicion.prendas}
          prendasDisponibles={accionesPrendas?.prendasDisponibles || []}
          outfit={outfitEnEdicion}
          onGuardar={guardarOutfit}
          onClose={() => setOutfitEnEdicion(null)}
        />
      )}
    </main>
  );
}
