import Modal from "../../../componentes/modal/Modal";
import "./formularioCrearConsulta.css";

const colores = [
  { nombre: "Rojo", variable: "--color-rojo" },
  { nombre: "Naranja", variable: "--color-naranja" },
  { nombre: "Amarillo", variable: "--color-amarillo" },
  { nombre: "Verde", variable: "--color-verde" },
  { nombre: "Azul", variable: "--color-azul" },
  { nombre: "Morado", variable: "--color-morado" },
  { nombre: "Rosa", variable: "--color-rosa" },
  { nombre: "Negro", variable: "--color-negro" },
  { nombre: "Blanco", variable: "--color-blanco" },
];

export default function FormularioCrearConsulta() {
  return (
    <Modal
      titulo="Crear consulta"
      descripcion="Compartí tu look con la comunidad, agregá una foto y contanos qué consejo necesitás. ¡Entre todos te ayudamos a encontrar la mejor opción!"
    >
      <div className="CrearConsulta">
        <div className="CrearConsulta__presentacion">
          <div className="CrearConsulta__foto" aria-label="Agregar foto">
            <span className="material-symbols-outlined" aria-hidden="true">photo_camera</span>
            <span>Agregar foto</span>
          </div>
          <div className="CrearConsulta__colores">
            <h3>Elegí un color para la consulta</h3>
            <div className="CrearConsulta__paleta" aria-label="Paleta de colores">
              {colores.map((color, indice) => (
                <span
                  className={`CrearConsulta__muestra${indice === 6 ? " CrearConsulta__muestra--activa" : ""}`}
                  key={color.nombre}
                  style={{ "--muestra-color": `var(${color.variable})` }}
                  title={color.nombre}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="CrearConsulta__campo">
          <label htmlFor="consulta-titulo">Título de la consulta</label>
          <input id="consulta-titulo" type="text" placeholder="Ej: ¿Qué calzado va mejor con este look?" />
        </div>

        <div className="CrearConsulta__campo">
          <label htmlFor="consulta-descripcion">Descripción</label>
          <textarea id="consulta-descripcion" placeholder="Contá más específico sobre tu consulta" />
        </div>

        <div className="CrearConsulta__acciones">
          <button className="CrearConsulta__publicar" type="button">Publicar consulta</button>
          <button className="CrearConsulta__salir" type="button">
            Salir sin guardar
            <span className="material-symbols-outlined" aria-hidden="true">logout</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
