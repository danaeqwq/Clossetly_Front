import { useState } from "react";
import "./miArmario.css";
import "../../styles/variables.css";
import Select from "../../componentes/select/Select";
import PublicacionesArmario from "./misPublicaciones/PublicacionesArmario";
import PrendasArmario from "./misPrendas/PrendasArmario";
import OutfitsArmario from "./misOutfits/OutfitsArmario";

const opcionesArmario = [
  { valor: "publicaciones", texto: "MIS PUBLICACIONES" },
  { valor: "prendas", texto: "MIS PRENDAS" },
  { valor: "outfits", texto: "MIS OUTFITS" },
];

export default function MiArmario() {
  const [seccionActiva, setSeccionActiva] = useState("publicaciones");
  const [publicacionesCreadas, setPublicacionesCreadas] = useState({ venta: [], intercambio: [] });

  const registrarPublicacion = (prenda) => {
    const id = `armario-${Date.now()}`;

    if (prenda.tipoPublicacion === "venta") {
      setPublicacionesCreadas((actuales) => ({
        ...actuales,
        venta: [...actuales.venta, {
          id,
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
          id,
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

  return (
    <main className="MiArmario">
      <Select opciones={opcionesArmario} seleccionada={seccionActiva} onChange={setSeccionActiva} ariaLabel="Secciones de Mi armario" />

      <div hidden={seccionActiva !== "publicaciones"}>
        <PublicacionesArmario publicacionesCreadas={publicacionesCreadas} />
      </div>
      <div hidden={seccionActiva !== "prendas"}>
        <PrendasArmario onPublicacionCreada={registrarPublicacion} />
      </div>
      {seccionActiva === "outfits" && <OutfitsArmario />}
    </main>
  );
}
