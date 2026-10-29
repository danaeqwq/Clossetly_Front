import "./OutfitsArmario.css";
import TarjetaOutfit from "../../../componentes/tarjetaOutfit/TarjetaOutfit";

export default function OutfitsArmario() {
  return (
    <section className="MiArmario__outfits" aria-label="Mis outfits">
      {Array.from({ length: 8 }, (_, indice) => <TarjetaOutfit key={indice} />)}
    </section>
  );
}
