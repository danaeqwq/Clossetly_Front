import "./miArmario.css";
import "../../styles/variables.css";
import Select from "../../componentes/select/Select";
import TarjetaPrenda from "../../componentes/tarjetaPrenda/TarjetaPrenda";
import TarjetaVenta from "../../componentes/tarjetaVenta/TarjetaVenta";
import TarjetaIntercambio from "../../componentes/tarjetaIntercambio/TarjetaIntercambio";
import TarjetaOutfit from "../../componentes/tarjetaOutfit/TarjetaOutfit";

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

const seccionActiva = "prendas";

export default function MiArmario() {
  return (
    <main className="MiArmario">
      <div className="MiArmario__barra">
        <Select className="MiArmario__tabs" opciones={opcionesArmario} seleccionada={seccionActiva} ariaLabel="Secciones de Mi armario" />
        <button className="MiArmario__crearPrenda" type="button">+ Agregar prendas</button>
      </div>

      {seccionActiva === "publicaciones" && (
        <section className="MiArmario__publicaciones" aria-label="Mis publicaciones">
          <div className="MiArmario__panelPublicaciones">
            <header className="MiArmario__encabezadoPublicaciones">
              <h2><span className="material-symbols-outlined" aria-hidden="true">sync</span>Intercambio</h2>
              <span>23 Publicaciones</span>
            </header>
            <div className="MiArmario__listaPublicaciones"><TarjetaIntercambio variante="armario" nombre="Abrigo Nocturne" /></div>
          </div>
          <div className="MiArmario__panelPublicaciones">
            <header className="MiArmario__encabezadoPublicaciones">
              <h2><span className="material-symbols-outlined" aria-hidden="true">shopping_basket</span>Venta</h2>
              <span>23 Publicaciones</span>
            </header>
            <div className="MiArmario__listaPublicaciones"><TarjetaVenta variante="armario" nombre="Abrigo Nocturne" /></div>
          </div>
        </section>
      )}

      {seccionActiva === "prendas" && (
        <>
          <section className="MiArmario__seccion MiArmario__seccion--abierta" aria-label="Remeras">
            <div className="MiArmario__seccionEncabezado" aria-expanded="true">
              <h2>Remeras</h2><span>23 Prendas</span>
              <span className="material-symbols-outlined" aria-hidden="true">keyboard_arrow_up</span>
            </div>
            <div className="MiArmario__seccionContenido">
              <div className="MiArmario__grilla">
                {Array.from({ length: 10 }, (_, indice) => <TarjetaPrenda key={indice} mostrarOpciones seleccionada={indice === 0} menuAbierto={indice === 0} />)}
              </div>
            </div>
          </section>
          <div className="MiArmario__otrasSecciones" aria-label="Otras secciones del armario">
            {seccionesCerradas.map((seccion) => (
              <section className="MiArmario__seccionCerrada" key={seccion.nombre}>
                <h2>{seccion.nombre}</h2><span>{seccion.cantidad}</span>
                <span className="material-symbols-outlined" aria-hidden="true">keyboard_arrow_down</span>
              </section>
            ))}
          </div>
        </>
      )}

      {seccionActiva === "outfits" && (
        <section className="MiArmario__outfits" aria-label="Mis outfits">
          {Array.from({ length: 8 }, (_, indice) => <TarjetaOutfit key={indice} />)}
        </section>
      )}
    </main>
  );
}
