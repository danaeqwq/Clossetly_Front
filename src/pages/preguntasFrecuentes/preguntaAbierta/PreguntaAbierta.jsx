import "./PreguntaAbierta.css";
import { useState } from "react";
import "../../../styles/variables.css";
import "../../../styles/global.css";
import TerminoPregunta from "../../../componentes/TerminoPregunta/TerminoPregunta";
import mariposa from "../../../assets/componentes/mariposa.svg";
import estrella from "../../../assets/Star 1.svg";
import LineaM from "../../../componentes/LineaM/LineaM";

const preguntas = [
    {
        titulo: "¿Qué significa cada estado de una prenda?",
        contenido: "Los estados describen la condición de la prenda: nueva con etiqueta, nueva sin etiqueta, como nueva, muy buen estado o buen estado. Revisá la descripción y las fotos para conocer sus detalles antes de comprar o intercambiar.",
        abierto: true,
    },
    {
        titulo: "¿Cómo funcionan los estados del pedido?",
        contenido: "El estado del pedido te permite seguir su avance desde la confirmación hasta la entrega. Consultá la sección de pedidos para ver las actualizaciones disponibles.",
    },
    {
        titulo: "¿Cómo publico una prenda?",
        contenido: "Desde tu armario podés cargar las fotos y completar los datos de la prenda, como talle, estado, categoría y descripción. Revisá la información antes de publicarla.",
    },
    {
        titulo: "¿Cómo puedo comprar una prenda?",
        contenido: "Elegí la prenda que te interesa y seguí los pasos que aparecen en su publicación para iniciar la compra. Podés consultar el avance desde tus pedidos.",
    },
    {
        titulo: "¿Cómo propongo un intercambio?",
        contenido: "En la publicación de una prenda disponible para intercambio, iniciá una propuesta y seleccioná una prenda de tu armario. La otra persona podrá revisar la propuesta.",
    },
    {
        titulo: "¿Dónde puedo editar mi perfil?",
        contenido: "Ingresá a Mi cuenta para actualizar tus datos personales, tu foto y tus preferencias.",
    },
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
    const [preguntaSeleccionada, setPreguntaSeleccionada] = useState(0);
    const preguntaActual = preguntas[preguntaSeleccionada];

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
                            abierto={preguntaSeleccionada === index}
                            mostrarContenido={false}
                            onToggle={() => setPreguntaSeleccionada(
                                preguntaSeleccionada === index ? null : index
                            )}
                        />
                    ))}
                </section>

                <aside className="PreguntaAbierta__tarjeta" aria-label="Respuesta de la pregunta seleccionada">
                    <div className="PreguntaAbierta__marca" aria-hidden="true">
                        <img className="PreguntaAbierta__estrella" src={estrella} alt="" />
                        <span className="PreguntaAbierta__punto" />
                        <span className="PreguntaAbierta__punto PreguntaAbierta__punto--grande" />
                        <img className="PreguntaAbierta__logo" src={mariposa} alt="" />
                    </div>
                    <h2 className="PreguntaAbierta__respuestaTitulo">
                        {preguntaActual?.titulo ?? "Elegí una pregunta"}
                    </h2>

                    <div className="PreguntaAbierta__separador" aria-hidden="true">
                        <LineaM lado="izquierdo" />
                        <span />
                        <LineaM lado="derecho" />
                    </div>

                    {preguntaSeleccionada === 0 ? (
                        <div className="PreguntaAbierta__estados">
                            {estados.map((estado) => (
                                <section className="PreguntaAbierta__estado" key={estado.titulo}>
                                    <h3>{estado.titulo}</h3>
                                    <p>{estado.descripcion}</p>
                                </section>
                            ))}
                        </div>
                    ) : preguntaActual ? (
                        <p className="PreguntaAbierta__respuesta">{preguntaActual.contenido}</p>
                    ) : (
                        <p className="PreguntaAbierta__respuesta">Seleccioná una pregunta de la lista para ver su respuesta.</p>
                    )}
                </aside>
            </div>
        </main>
    );
}
