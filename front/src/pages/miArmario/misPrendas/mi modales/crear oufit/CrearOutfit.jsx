import { useState } from "react";
import Modal from "../../../../../componentes/modal/Modal";
import "./crearOutfit.css";

const temporadas = ["PRIMAVERA", "VERANO", "OTOÑO", "INVIERNO"];
const ocasiones = ["CASUAL", "FORMAL", "FIESTA", "DEPORTE"];
const generos = ["UNISEX", "MUJER", "HOMBRE"];

const clavePrenda = (prenda) => prenda.claveArmario || prenda.id;
const prendasSinDuplicados = (lista = []) => (
  [...new Map(lista.map((prenda) => [clavePrenda(prenda), prenda])).values()]
);

export default function CrearOutfit({ prendas = [], prendasDisponibles = prendas, outfit, onGuardar, onClose }) {
  const [nombre, setNombre] = useState(outfit?.nombre || "");
  const [descripcion, setDescripcion] = useState(outfit?.descripcion || "");
  const [privacidad, setPrivacidad] = useState(outfit?.privacidad ?? true);
  const [temporada, setTemporada] = useState(outfit?.temporada || "PRIMAVERA");
  const [ocasion, setOcasion] = useState(outfit?.ocasion || "FORMAL");
  const [genero, setGenero] = useState(outfit?.genero || "UNISEX");
  const [prendasOutfit, setPrendasOutfit] = useState(() => (
    prendasSinDuplicados(outfit?.prendas ?? prendas)
  ));
  const [prendaPrincipalId, setPrendaPrincipalId] = useState(() => {
    const iniciales = prendasSinDuplicados(outfit?.prendas ?? prendas);
    return iniciales[0] ? clavePrenda(iniciales[0]) : null;
  });
  const prendaPrincipal = prendasOutfit.find((prenda) => clavePrenda(prenda) === prendaPrincipalId) || prendasOutfit[0];
  const miniaturas = prendasOutfit.filter((prenda) => prenda !== prendaPrincipal);

  const guardar = () => onGuardar?.({ nombre, descripcion, privacidad, temporada, ocasion, genero, fotos: outfit?.fotos || [], prendas: prendasOutfit });
  return (
    <Modal
      titulo={outfit ? "Modificar Outfit" : "Crear Outfit"}
      descripcion="Combiná tus prendas y creá tu look."
      confirmar={{ texto: "Guardar  →", onClick: guardar }}
      cancelar={{ texto: "Salir sin guardar", icono: "logout", onClick: onClose }}
      onClose={onClose}
    >
      <div className="CrearOutfit">
        <div className="CrearOutfit__composicion" aria-label="Vista previa del outfit">
          <div className="CrearOutfit__seleccionadas" aria-label="Prendas seleccionadas">
            {prendaPrincipal && (
              <div className="CrearOutfit__prendaPrincipal">
                <img src={prendaPrincipal.imagen} alt={prendaPrincipal.alt || prendaPrincipal.nombre || "Prenda seleccionada"} />
              </div>
            )}
            {miniaturas.length > 0 && (
              <div className="CrearOutfit__miniaturas" aria-label="Elegir prenda para vista previa">
                {miniaturas.map((prenda) => (
                  <button
                    className="CrearOutfit__miniatura"
                    type="button"
                    key={clavePrenda(prenda) ?? prenda.nombre}
                    onClick={() => setPrendaPrincipalId(clavePrenda(prenda))}
                    aria-label="Ver prenda seleccionada"
                    aria-pressed={clavePrenda(prenda) === clavePrenda(prendaPrincipal)}
                  >
                    <img src={prenda.imagen} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="CrearOutfit__formulario">
          {outfit && (
            <div className="CrearOutfit__seleccionPrendas" aria-label="Editar prendas del outfit">
              {prendasDisponibles.map((prenda) => {
                const seleccionada = prendasOutfit.some((actual) => clavePrenda(actual) === clavePrenda(prenda));
                return (
                  <label key={prenda.id}>
                    <input type="checkbox" checked={seleccionada} onChange={() => setPrendasOutfit((actuales) => (
                      seleccionada ? actuales.filter((actual) => clavePrenda(actual) !== clavePrenda(prenda)) : [...actuales, prenda]
                    ))} />
                    {prenda.nombre}
                  </label>
                );
              })}
            </div>
          )}
          <div className="CrearOutfit__campo">
            <label htmlFor="crear-outfit-nombre">Nombre</label>
            <input id="crear-outfit-nombre" value={nombre} maxLength={40} onChange={(evento) => setNombre(evento.target.value)} placeholder="Ej: outfit para salir" />
            <span className="CrearOutfit__contador">{nombre.length}/40</span>
          </div>

          <div className="CrearOutfit__campo">
            <label htmlFor="crear-outfit-descripcion">Descripción</label>
            <input id="crear-outfit-descripcion" value={descripcion} onChange={(evento) => setDescripcion(evento.target.value)} placeholder="Contá algo sobre el outfit..." />
          </div>

          <div className="CrearOutfit__privacidad">
            <span>Privacidad</span>
            <span className="CrearOutfit__publica">{privacidad ? "Pública" : "Privada"}</span>
            <button
              className={`CrearOutfit__switch${privacidad ? " CrearOutfit__switch--activa" : ""}`}
              type="button"
              aria-label="Cambiar privacidad"
              aria-pressed={privacidad}
              onClick={() => setPrivacidad((actual) => !actual)}
            ><span /></button>
          </div>

          <div className="CrearOutfit__etiquetas">
            {[{ etiqueta: "Temporada", valor: temporada, cambiar: setTemporada, opciones: temporadas }, { etiqueta: "Ocasión", valor: ocasion, cambiar: setOcasion, opciones: ocasiones }, { etiqueta: "Género", valor: genero, cambiar: setGenero, opciones: generos }].map(({ etiqueta, valor, cambiar, opciones }) => (
              <label className={`CrearOutfit__etiqueta${etiqueta === "Género" ? " CrearOutfit__etiqueta--genero" : ""}`} key={etiqueta}>
                <span>{etiqueta}</span>
                <select value={valor} onChange={(evento) => cambiar(evento.target.value)} aria-label={etiqueta}>
                  {opciones.map((opcion) => <option key={opcion} value={opcion}>{opcion}</option>)}
                </select>
                <b aria-hidden="true">{valor}</b>
                <i className="material-symbols-outlined" aria-hidden="true">keyboard_arrow_down</i>
              </label>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
