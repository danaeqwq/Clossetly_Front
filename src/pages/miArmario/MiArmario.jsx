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

const seccionActiva = "prendas";

export default function MiArmario() {
  return (
    <main className="MiArmario">
      <div className="MiArmario__barra">
        <Select className="MiArmario__tabs" opciones={opcionesArmario} seleccionada={seccionActiva} ariaLabel="Secciones de Mi armario" />
      </div>

      {seccionActiva === "publicaciones" && <PublicacionesArmario />}
      {seccionActiva === "prendas" && <PrendasArmario />}
      {seccionActiva === "outfits" && <OutfitsArmario />}
    </main>
  );
}
