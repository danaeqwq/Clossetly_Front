import "./PreguntaFrecuentes.css";
import TerminoPregunta from "../../componentes/TerminoPregunta/TerminoPregunta";
import mariposa from "../../assets/componentes/mariposa.svg";
import Logo from "../../assets/Logo.svg";
import estrella from "../../assets/star 1.svg"
import "../../styles/variables.css"
import "../../styles/global.css"

const preguntas = [
  {
    titulo: "¿Que significa cada estado de una prenda?",
    contenido:
      "Los estados te ayudan a organizar tus prendas y conocer en qué condición se encuentran dentro de tu armario.",
  },
  { titulo: "Pregunta frecuente", contenido: "Encontrá aquí la respuesta a esta pregunta." },
  { titulo: "Pregunta frecuente", contenido: "Encontrá aquí la respuesta a esta pregunta." },
  { titulo: "Pregunta frecuente", contenido: "Encontrá aquí la respuesta a esta pregunta." },
  { titulo: "Pregunta frecuente", contenido: "Encontrá aquí la respuesta a esta pregunta." },
  { titulo: "Pregunta frecuente", contenido: "Encontrá aquí la respuesta a esta pregunta." },
];

export default function PreguntaFrecuentes() {
  return (
    <main className="PreguntasFrecuentes">
      <div className="PreguntasFrecuentes__intro">
        <h1>¿Necesitas ayuda?</h1>
        <p>Encuentra respuestas de las preguntas más comunes.</p>
      </div>

      <div className="PreguntasFrecuentes__contenido">
        <section className="PreguntasFrecuentes__lista" aria-label="Preguntas frecuentes">
          {preguntas.map((pregunta, index) => (
            <TerminoPregunta key={`${pregunta.titulo}-${index}`} {...pregunta} />
          ))}
        </section>

        <aside className="PreguntasFrecuentes__tarjeta" aria-label="Ayuda con las preguntas">
          <div className="PreguntasFrecuentes__marca" aria-hidden="true">
            <img className="PreguntasFrecuentes__estrella" src={estrella} alt="" />
            <span className="circulo1" />
            <span className="circulo2" />
            <img className="PreguntasFrecuentes__logo" src={mariposa} alt="" />
          </div>
          <p>Haz click en la pregunta para ver sus respuestas</p>
          <div className="PreguntasFrecuentes__mariposa" aria-hidden="true">
            <img className="PreguntasFrecuentes__ilustracion" src={Logo} alt="" />
          </div>
        </aside>
      </div>
    </main>
  );
}
