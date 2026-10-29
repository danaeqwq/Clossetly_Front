import Modal from "../../../../componentes/modal/Modal";
import "./crearOutfit.css";

const prendasSeleccionadas = [
  {
    nombre: "Campera mostaza",
    imagen: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&w=240&q=85",
  },
  {
    nombre: "Jean azul",
    imagen: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=240&q=85",
  },
];

export default function CrearOutfit() {
  return (
    <Modal
      titulo="Crear Outfit"
      descripcion="Combiná tus prendas y creá tu look."
      confirmar={{ texto: "Guardar  →" }}
      cancelar={{ texto: "Salir sin guardar", icono: "logout" }}
    >
      <div className="CrearOutfit">
        <div className="CrearOutfit__composicion" aria-label="Vista previa del outfit">
          <div className="CrearOutfit__seleccionadas" aria-label="Prendas seleccionadas">
            {prendasSeleccionadas.map((prenda) => (
              <img key={prenda.nombre} src={prenda.imagen} alt={prenda.nombre} />
            ))}
          </div>
          <img
            className="CrearOutfit__vistaPrevia"
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=85"
            alt="Vista previa de un outfit con vestido rojo"
          />
        </div>

        <div className="CrearOutfit__formulario">
          <div className="CrearOutfit__campo">
            <label htmlFor="crear-outfit-nombre">Nombre</label>
            <input id="crear-outfit-nombre" readOnly value="" placeholder="Ej: outfit para salir" />
            <span className="CrearOutfit__contador">0/12</span>
          </div>

          <div className="CrearOutfit__campo">
            <label htmlFor="crear-outfit-descripcion">Descripción</label>
            <input id="crear-outfit-descripcion" readOnly value="" placeholder="Contá algo sobre el outfit..." />
          </div>

          <div className="CrearOutfit__privacidad">
            <span>Privacidad</span>
            <span className="CrearOutfit__publica">Pública</span>
            <span className="CrearOutfit__switch" aria-hidden="true"><span /></span>
          </div>

          <div className="CrearOutfit__etiquetas">
            <div className="CrearOutfit__etiqueta"><span>Temporada</span><b>PRIMAVERA</b><i className="material-symbols-outlined">keyboard_arrow_down</i></div>
            <div className="CrearOutfit__etiqueta"><span>Ocasión</span><b>FORMAL</b><i className="material-symbols-outlined">keyboard_arrow_down</i></div>
            <div className="CrearOutfit__etiqueta CrearOutfit__etiqueta--genero"><span>Género</span><b>UNISEX</b><i className="material-symbols-outlined">keyboard_arrow_down</i></div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
