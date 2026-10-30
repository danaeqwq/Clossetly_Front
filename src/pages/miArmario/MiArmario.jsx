import "./miArmario.css";
import "../../styles/variables.css";
import Select from "../../componentes/select/Select";
import TarjetaPrenda from "../../componentes/tarjetaPrenda/TarjetaPrenda";

const opcionesArmario = [
  { valor: "publicaciones", texto: "MIS PUBLICACIONES" },
  { valor: "prendas", texto: "MIS PRENDAS" },
  { valor: "outfits", texto: "MIS OUTFITS" },
];

const seccionesCerradas = [
  { nombre: "Pantalones", cantidad: "5 Prendas" },
  { nombre: "Cortos", cantidad: "9 Prendas" },
  { nombre: "Camperas", cantidad: "10 Prendas" },
  { nombre: "Accesorios", cantidad: "15 Accesorios" },
  { nombre: "Zapatos", cantidad: "10 Prendas" },
];

export default function MiArmario() {
  return (
    <main className="MiArmario">
      <div className="MiArmario__barra">
        <Select
          className="MiArmario__tabs"
          opciones={opcionesArmario}
          seleccionada="prendas"
          ariaLabel="Secciones de Mi armario"
        />
        <div className="MiArmario__resumen">
          <span>1 prenda seleccionada</span>
          <button className="MiArmario__crearOutfit" type="button">+ Crear outfit</button>
        </div>
      </div>

      <section className="MiArmario__seccion MiArmario__seccion--abierta" aria-label="Remeras">
        <div className="MiArmario__seccionEncabezado" aria-expanded="true">
          <h2>Remeras</h2>
          <span>23 Prendas</span>
          <span className="material-symbols-outlined" aria-hidden="true">keyboard_arrow_up</span>
        </div>
        <div className="MiArmario__seccionContenido">
          <div className="MiArmario__grilla">
            {Array.from({ length: 10 }, (_, indice) => (
              <TarjetaPrenda
                key={indice}
                mostrarOpciones
                seleccionada={indice === 0}
                menuAbierto={indice === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="MiArmario__otrasSecciones" aria-label="Otras secciones del armario">
        {seccionesCerradas.map((seccion) => (
          <section className="MiArmario__seccionCerrada" key={seccion.nombre}>
            <h2>{seccion.nombre}</h2>
            <span>{seccion.cantidad}</span>
            <span className="material-symbols-outlined" aria-hidden="true">keyboard_arrow_down</span>
          </section>
        ))}
      </div>
    </main>
  );
}
