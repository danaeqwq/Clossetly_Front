import "./EditarEstilos.css";
import "../../../styles/global.css";
import "../../../styles/variables.css";
import Agregar from "./modal/Agregar";

const preferencias = [
  {
    id: "favoritas",
    icono: "favorite_border",
    titulo: "Mis prendas favoritas:",
    elementos: ["REMERAS", "ZAPATILLAS", "JEANS", "BUZOS"],
    agregar: true,
  },
  {
    id: "temporadas",
    icono: "calendar_today",
    titulo: "Mis temporadas:",
    elementos: ["OTOÑO", "INVIERNO", "VERANO", "PRIMAVERA"],
    seleccionados: ["OTOÑO", "INVIERNO"],
    agregar: true,
  },
  {
    id: "colores",
    icono: "palette",
    titulo: "Mis colores:",
    colores: ["vino", "malva", "azul", "rosa", "coral"],
    agregarColor: true,
  },
  {
    id: "transmitir",
    icono: "auto_awesome",
    titulo: "Lo que quiero transmitir:",
    elementos: ["SEGURIDAD", "REBELDIA", "CREATIVIDAD"],
    agregar: true,
  },
  {
    id: "ropa",
    icono: "checkroom",
    titulo: "Como me gusta la ropa:",
    elementos: ["COMODA", "URBANO", "OVERSIZED"],
    agregar: true,
  },
  {
    id: "estilos",
    icono: "styler",
    titulo: "Mis estilos:",
    elementos: ["GRUNGE", "STREETWEAR", "SOFT GRUNGE"],
    agregar: true,
  },
];

function Preferencia({ preferencia }) {
  return (
    <section className={`EditarEstilos__grupo EditarEstilos__grupo--${preferencia.id}`}>
      <div className="EditarEstilos__encabezadoGrupo">
        <h2>
          <span className="material-symbols-outlined" aria-hidden="true">{preferencia.icono}</span>
          {preferencia.titulo}
        </h2>
        {preferencia.agregar && (
          <button className="EditarEstilos__agregar" type="button">
            <span aria-hidden="true">＋</span> Agregar
          </button>
        )}
      </div>

      {preferencia.colores ? (
        <div className="EditarEstilos__paleta" aria-label="Colores preferidos">
          {preferencia.colores.map((color) => (
            <span key={color} className={`EditarEstilos__color EditarEstilos__color--${color}`} />
          ))}
          {preferencia.agregarColor && (
            <span className="EditarEstilos__agregarColor" aria-hidden="true">+</span>
          )}
        </div>
      ) : (
        <div className="EditarEstilos__etiquetas">
          {preferencia.elementos.map((elemento) => {
            const seleccionado = preferencia.seleccionados?.includes(elemento);
            return (
              <span
                key={elemento}
                className={seleccionado ? "EditarEstilos__etiqueta EditarEstilos__etiqueta--seleccionada" : "EditarEstilos__etiqueta"}
              >
                {!seleccionado && <span aria-hidden="true">×</span>}
                {elemento}
              </span>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default function EditarEstilos() {
  return (
    <main className="EditarEstilos">
      <section className="EditarEstilos__panel" aria-labelledby="EditarEstilos__titulo">
        <h1 id="EditarEstilos__titulo">Preferencias de estilos</h1>
        <div className="EditarEstilos__preferencias">
          {preferencias.map((preferencia) => (
            <Preferencia key={preferencia.id} preferencia={preferencia} />
          ))}
        </div>
      </section>
      <Agregar />
    </main>
  );
}
