import "./PreguntaAbierta.css";
import "../../../styles/variables.css";
import "../../../styles/global.css";
import TerminoPregunta from "../../../componentes/TerminoPregunta/TerminoPregunta";
import mariposa from "../../../assets/componentes/mariposa.svg";
import estrella from "../../../assets/Star 1.svg";
import LineaM from "../../../componentes/LineaM/LineaM";

const preguntas = [
    { titulo: "¿Que significa cada estado de una prenda?", abierto: true },
    { titulo: "¿Cómo funcionan los estados del pedido?" },
    { titulo: "Pregunta frecuente" },
    { titulo: "Pregunta frecuente" },
    { titulo: "Pregunta frecuente" },
    { titulo: "Pregunta frecuente" },
];

const estados = [
    {
        titulo: "Nueva con etiqueta",
        descripcion: "Prenda sin uso que conserva su etiqueta original.",
    },
    {
        titulo: "Nueva sin etiqueta",
        descripcion: "Prenda que no fue usada, pero que ya no conserva su etiqueta original.",
    },
    {
        titulo: "Como nueva",
        descripcion:
            "Prenda usada muy pocas veces, sin signos visibles de desgaste y en excelentes condiciones.",
    },
    {
        titulo: "Muy buen estado",
        descripcion:
            "Prenda usada que está bien cuidada y puede presentar pequeñas señales de uso, sin daños importantes.",
    },
    {
        titulo: "Buen estado",
        descripcion:
            "Prenda que presenta signos de uso visibles, como desgaste o pequeñas imperfecciones, pero que sigue siendo funcional y apta para usar.",
    },
];

export default function PreguntaAbierta() {
    return (
        <main className="PreguntaAbierta">
            <header className="PreguntaAbierta__intro">
                <h1>¿Necesitas ayuda?</h1>
                <p>Encuentra respuestas de las preguntas más comunes.</p>
            </header>

            <div className="PreguntaAbierta__contenido">
                <section className="PreguntaAbierta__lista" aria-label="Preguntas frecuentes">
                    {preguntas.map((pregunta, index) => (
                        <TerminoPregunta
                            key={`${pregunta.titulo}-${index}`}
                            titulo={pregunta.titulo}
                            abierto={pregunta.abierto}
                        />
                    ))}
                </section>

                <aside className="PreguntaAbierta__tarjeta" aria-label="Estados de una prenda">
                    <div className="PreguntaAbierta__marca" aria-hidden="true">
                        <img className="PreguntaAbierta__estrella" src={estrella} alt="" />
                        <span className="PreguntaAbierta__punto" />
                        <span className="PreguntaAbierta__punto PreguntaAbierta__punto--grande" />
                        <img className="PreguntaAbierta__logo" src={mariposa} alt="" />
                    </div>
                    <p className="PreguntaAbierta__ayuda">
                        Haz click en la pregunta para ver sus respuestas
                    </p>

                    <div className="PreguntaAbierta__separador" aria-hidden="true">
                        <LineaM lado="izquierdo" />
                        <span />
                        <LineaM lado="derecho" />
                    </div>

                    <div className="PreguntaAbierta__estados">
                        {estados.map((estado) => (
                            <section className="PreguntaAbierta__estado" key={estado.titulo}>
                                <h2>{estado.titulo}</h2>
                                <p>{estado.descripcion}</p>
                            </section>
                        ))}
                    </div>
                </aside>
            </div>
        </main>
    );
}
