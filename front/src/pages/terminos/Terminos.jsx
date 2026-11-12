import "./Terminos.css"
import "../../styles/variables.css"
import TerminoPregunta from "../../componentes/TerminoPregunta/TerminoPregunta"

const textoProvisional = "Texto provisional pendiente de revisión oficial por parte de Clossetly. Esta sección debe completarse y aprobarse antes de publicar los Términos y Condiciones definitivos."

const terminosIzquierda = [
    {
        titulo: "Uso responsable de Clossetly",
        contenido: "Los usuarios se comprometen a utilizar Clossetly de manera responsable, respetando las normas de la plataforma y a los demás miembros de la comunidad. No se permitirá el uso de la aplicación para realizar actividades que perjudiquen, acosen o vulneren los derechos de otras personas.",
        abierto: true,
    },
    { titulo: "Registro y cuenta de usuario", contenido: textoProvisional },
    { titulo: "Responsabilidades de los usuarios", contenido: textoProvisional },
    { titulo: "Publicación y administración de prendas", contenido: textoProvisional },
    { titulo: "Privacidad y tratamiento de datos", contenido: textoProvisional },
    { titulo: "Modificaciones de estos términos", contenido: textoProvisional },
]

const terminosDerecha = [
    { titulo: "¿Qué significa cada estado de una prenda?", contenido: textoProvisional },
    { titulo: "¿Puedo editar o retirar una publicación?", contenido: textoProvisional },
    { titulo: "¿Quién puede ver mi armario?", contenido: textoProvisional },
    { titulo: "¿Cómo puedo contactar al equipo?", contenido: textoProvisional },
    { titulo: "Preguntas frecuentes", contenido: textoProvisional },
    { titulo: "Contacto", contenido: textoProvisional },
]

export default function Terminos() {
    return (
        <div className="Terminos">
            <main className="Terminos__main">
                <section className="Terminos__contenido" aria-labelledby="terminos-titulo">
                    <header className="Terminos__introduccion">
                        <h1 className="Terminos__titulo" id="terminos-titulo">Antes de comenzar</h1>
                        <p className="Terminos__subtitulo">
                            Te contamos todo lo que necesitas saber sobre el uso de Clossetly.
                        </p>
                    </header>

                    <div className="Terminos__columnas">
                        <div className="Terminos__columna">
                            {terminosIzquierda.map((termino) => (
                                <TerminoPregunta key={termino.titulo} {...termino} />
                            ))}
                        </div>
                        <div className="Terminos__columna">
                            {terminosDerecha.map((termino) => (
                                <TerminoPregunta key={termino.titulo} {...termino} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>

        </div>
    )
}
