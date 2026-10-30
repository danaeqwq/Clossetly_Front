import "./OutfitsArmario.css";
import TarjetaOutfit from "../../../componentes/tarjetaOutfit/TarjetaOutfit";

export default function OutfitsArmario() {
  return (
    <section className="MiArmario__outfits" aria-label="Mis outfits">
      {Array.from({ length: 8 }, (_, indice) => {
        const menuAbierto = indice === 0;

        return (
          <div
            className={`MiArmario__outfit${menuAbierto ? " MiArmario__outfit--menuAbierto" : ""}`}
            key={indice}
          >
            <TarjetaOutfit />
            <button
              className="MiArmario__outfitMas"
              type="button"
              aria-label="Más opciones del outfit"
              aria-expanded={menuAbierto}
            >
              <span aria-hidden="true">⋯</span>
            </button>
            <div className="MiArmario__outfitMenu" role="menu" hidden={!menuAbierto}>
              <button type="button" role="menuitem">
                <span className="material-symbols-outlined" aria-hidden="true">edit</span>
                Modificar
              </button>
              <button className="MiArmario__outfitEliminar" type="button" role="menuitem">
                <span className="material-symbols-outlined" aria-hidden="true">delete_outline</span>
                Eliminar
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}
