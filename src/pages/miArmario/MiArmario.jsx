import { useCallback, useState } from "react";
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

  const guardarOutfit = (datos) => {
    if (outfitEnEdicion) {
      setOutfits((actuales) => actuales.map((outfit) => outfit.id === outfitEnEdicion.id
        ? { ...outfitEnEdicion, ...datos, id: outfitEnEdicion.id }
        : outfit));
      setOutfitEnEdicion(null);
      return;
    }
    setOutfits((actuales) => [...actuales, { ...datos, id: `outfit-${Date.now()}` }]);
    accionesPrendas?.onCancelar?.();
  };

  const iniciarEdicionOutfit = (outfit) => {
    setOutfitEnEdicion(outfit);
    setSeccionActiva("outfits");
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
          onEliminar={(id) => setOutfits((actuales) => actuales.filter((outfit) => outfit.id !== id))}
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
