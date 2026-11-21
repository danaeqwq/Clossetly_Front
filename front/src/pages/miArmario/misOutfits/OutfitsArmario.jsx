import { useState } from "react";
import Alert from "../../../componentes/Alert/Alert";
import TarjetaOutfit from "../../../componentes/tarjetaOutfit/TarjetaOutfit";
import "./OutfitsArmario.css";
import "../misPublicaciones/modales/eliminarPublicacion/EliminarPublicacion.css";

export default function OutfitsArmario({ outfits = [], onModificar, onEliminar }) {
  const [menuAbiertoId, setMenuAbiertoId] = useState(null);
  const [outfitAEliminar, setOutfitAEliminar] = useState(null);

  return (
    <>
      <section className="MiArmario__outfits" aria-label="Mis outfits">
        {outfits.map((outfit) => (
          <div className={`MiArmario__outfit${menuAbiertoId === outfit.id ? " MiArmario__outfit--menuAbierto" : ""}`} key={outfit.id}>
            <TarjetaOutfit outfit={outfit} />
            <button
              className="MiArmario__outfitMas"
              type="button"
              aria-label={`Más opciones para ${outfit.nombre || "outfit"}`}
              aria-expanded={menuAbiertoId === outfit.id}
              onClick={() => setMenuAbiertoId((actual) => actual === outfit.id ? null : outfit.id)}
            ><span aria-hidden="true">⋯</span></button>
            <div className="MiArmario__outfitMenu" role="menu" hidden={menuAbiertoId !== outfit.id}>
              <button type="button" role="menuitem" onClick={() => { onModificar?.(outfit); setMenuAbiertoId(null); }}>
                <span className="material-symbols-outlined" aria-hidden="true">edit</span>Modificar
              </button>
              <button className="MiArmario__outfitEliminar" type="button" role="menuitem" onClick={() => { setOutfitAEliminar(outfit); setMenuAbiertoId(null); }}>
                <span className="material-symbols-outlined" aria-hidden="true">delete_outline</span>Eliminar
              </button>
            </div>
          </div>
        ))}
      </section>
      {outfitAEliminar && (
        <div className="EliminarPublicacion">
          <Alert
            titulo={<><span className="material-symbols-outlined EliminarPublicacion__icono" aria-hidden="true">delete</span>Eliminar outfit</>}
            mensaje={`¿Estás segura de que querés eliminar «${outfitAEliminar.nombre || "este outfit"}»?`}
            textoBoton=""
          />
          <div className="EliminarPublicacion__acciones" aria-label="Confirmar eliminación">
            <button className="EliminarPublicacion__boton EliminarPublicacion__boton--venta" type="button" onClick={() => { onEliminar?.(outfitAEliminar.id); setOutfitAEliminar(null); }}>Eliminar</button>
            <button className="EliminarPublicacion__boton EliminarPublicacion__boton--cancelar" type="button" onClick={() => setOutfitAEliminar(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </>
  );
}
