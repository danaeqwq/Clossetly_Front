import { useState } from "react";

import "./Terminos.css";
import "../../styles/variables.css";
import "../../styles/global.css";
import TerminoPregunta from "../../componentes/TerminoPregunta/TerminoPregunta";

const terminosIzquierda = [
    {
        titulo: "Uso responsable de Clossetly",
        contenido: "Clossetly es una plataforma destinada a facilitar la organización de prendas personales y el intercambio o compra de ropa entre usuarios. Al utilizar la aplicación, los usuarios se comprometen a mantener un comportamiento respetuoso y responsable. No está permitido utilizar la plataforma para realizar actividades fraudulentas, engañosas, discriminatorias o que perjudiquen a otros miembros de la comunidad. Tampoco se permite publicar contenido ofensivo, inapropiado o que vulnere los derechos de terceros.",
    },
    {
        titulo: "Registro y cuenta de usuario",
        contenido: "Para utilizar las funcionalidades de Clossetly es necesario crear una cuenta personal e iniciar sesión. Durante el registro, el usuario debe proporcionar información verdadera, actualizada y completa. Cada cuenta es personal y no debe ser utilizada por otras personas sin autorización de su titular. El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso y de las actividades realizadas desde su cuenta. Si detecta un acceso no autorizado, deberá comunicarlo por los canales de contacto disponibles. No se permite crear cuentas con información falsa ni suplantar la identidad de otras personas.",
    },
    {
        titulo: "Responsabilidades de los usuarios",
        contenido: "Cada usuario es responsable de la información, imágenes y publicaciones que comparte en Clossetly. Se compromete a proporcionar descripciones claras y reales de las prendas, respetar los acuerdos realizados con otros usuarios y mantener una comunicación adecuada durante las operaciones de compra e intercambio. Los usuarios deben asegurarse de que las prendas ofrecidas sean de su propiedad o que cuenten con autorización para publicarlas. Clossetly funciona como una plataforma de conexión entre usuarios y no reemplaza la responsabilidad individual de quienes participan en las operaciones.",
    },
    {
        titulo: "Publicación y administración de prendas",
        contenido: "Los usuarios pueden incorporar prendas a su armario virtual y crear publicaciones destinadas a la compra o al intercambio. Cada publicación debe incluir información correcta y fotografías que representen fielmente la prenda ofrecida. El usuario puede modificar o eliminar sus publicaciones cuando lo considere necesario, siempre que no existan operaciones o propuestas pendientes que deban resolverse previamente. No se permite publicar prendas que no estén disponibles, utilizar imágenes engañosas ni ofrecer artículos cuya comercialización esté prohibida por la normativa aplicable. Clossetly se reserva el derecho de revisar y eliminar publicaciones que incumplan estas condiciones.",
    },
    {
        titulo: "Privacidad y tratamiento de datos",
        contenido: "Clossetly utiliza los datos proporcionados durante el registro y el uso de la plataforma para permitir el funcionamiento de las cuentas, el armario virtual, las publicaciones, las operaciones y las notificaciones. La información personal debe utilizarse únicamente para las finalidades relacionadas con el servicio. Los usuarios deben evitar compartir públicamente información privada, contraseñas o datos personales de otras personas. Las publicaciones pueden ser consultadas por otros usuarios de la plataforma, por lo que se recomienda no incorporar información personal innecesaria en sus descripciones o fotografías. El tratamiento de datos deberá realizarse conforme a la normativa de protección de datos personales aplicable.",
    },
    {
        titulo: "Modificaciones de estos términos",
        contenido: "Clossetly podrá actualizar estos Términos y Condiciones cuando se incorporen nuevas funcionalidades, se modifiquen las existentes o resulte necesario realizar aclaraciones sobre el uso de la plataforma. Las modificaciones serán comunicadas mediante los medios disponibles dentro de la aplicación. El usuario deberá consultar periódicamente esta sección para mantenerse informado sobre las condiciones vigentes. El uso continuado de la plataforma luego de la publicación de los cambios implica que el usuario conoce las condiciones actualizadas.",
    },
];

const terminosDerecha = [
    {
        titulo: "¿Qué significa cada estado de una prenda?",
        contenido: "Los estados permiten identificar la situación actual de una prenda o de una operación dentro de Clossetly. Una prenda disponible puede formar parte de una nueva operación. Cuando existe una propuesta de intercambio o una operación de compra en proceso, su situación puede cambiar para indicar que está siendo gestionada. Una operación confirmada indica que los usuarios avanzaron con el acuerdo correspondiente. Una operación completada representa una operación que llegó a su finalización. Los estados mostrados permiten conocer el seguimiento registrado dentro de la plataforma.",
    },
    {
        titulo: "¿Puedo editar o retirar una publicación?",
        contenido: "Sí. Desde la sección Mis Publicaciones, dentro de tu Armario Virtual, podés acceder a las publicaciones que realizaste y utilizar las opciones disponibles para modificarlas o eliminarlas. Antes de retirar una publicación, verificá que no tenga propuestas u operaciones pendientes. Si una publicación está relacionada con una operación en curso, puede ser necesario resolver esa situación antes de realizar modificaciones o eliminarla.",
    },
    {
        titulo: "¿Quién puede ver mi armario?",
        contenido: "Tu armario virtual es el espacio donde podés organizar y administrar tus prendas, publicaciones y outfits. Las prendas que todavía no fueron publicadas forman parte de tu organización personal. Cuando decidís crear una publicación para la Boutique, la información y las imágenes correspondientes quedan disponibles para que otros usuarios puedan consultar la oferta. Antes de publicar una prenda, revisá que las fotografías y descripciones no incluyan información personal que no quieras compartir.",
    },
    {
        titulo: "¿Cómo funciona una compra?",
        contenido: "En la Boutique podés consultar las publicaciones disponibles para comprar y conocer sus características, imágenes y precio. Cuando encontrás una prenda que te interesa, podés iniciar el proceso de compra mediante las opciones disponibles en la publicación. La operación queda vinculada al comprador, al vendedor y a la información correspondiente a la compra. Los usuarios deben comunicarse y acordar las condiciones necesarias para concretar la operación. Es importante verificar todos los detalles de la prenda y las condiciones acordadas antes de confirmar.",
    },
    {
        titulo: "¿Cómo funciona un intercambio?",
        contenido: "En la Boutique podés encontrar publicaciones disponibles para intercambio. Si te interesa una prenda, podés realizar una propuesta seleccionando una prenda de tu propio armario para ofrecer a cambio. El usuario que realizó la publicación original recibirá la propuesta y podrá revisarla. Desde su Armario Virtual podrá aceptar o rechazar el intercambio. Si la propuesta es aceptada, ambos usuarios deberán continuar con los acuerdos necesarios para concretar el intercambio. La propuesta no se considera completada únicamente por haber sido aceptada.",
    },
    {
        titulo: "¿Qué son las notificaciones y cómo contacto al equipo?",
        contenido: "Las notificaciones permiten mantenerte informado sobre acontecimientos relacionados con tu cuenta y tu actividad en Clossetly. Podés recibir avisos sobre propuestas de intercambio, cambios en el estado de tus operaciones y otras novedades de la plataforma. Desde Mi Cuenta podés activar o desactivar las notificaciones según tus preferencias. Si necesitás asistencia con tu cuenta, tenés dudas sobre una operación o querés realizar una consulta, podés comunicarte con el equipo responsable mediante los canales oficiales de contacto que se encuentren habilitados.",
    },
];

export default function Terminos() {
    const [terminoAbierto, setTerminoAbierto] = useState(null);

    const manejarApertura = (indice) => {
        if (terminoAbierto === indice) {
            setTerminoAbierto(null);
        } else {
            setTerminoAbierto(indice);
        }
    };

    return (
        <div className="Terminos">
            <main className="Terminos__main">
                <section
                    className="Terminos__contenido"
                    aria-labelledby="terminos-titulo"
                >
                    <header className="Terminos__introduccion">
                        <h1
                            className="Terminos__titulo"
                            id="terminos-titulo"
                        >
                            Antes de comenzar
                        </h1>

                        <p className="Terminos__subtitulo">
                            Te contamos todo lo que necesitás saber sobre el uso de Clossetly.
                        </p>
                    </header>

                    <div className="Terminos__columnas">
                        <div className="Terminos__columna">
                            {terminosIzquierda.map((termino, index) => (
                                <TerminoPregunta
                                    key={termino.titulo}
                                    titulo={termino.titulo}
                                    contenido={termino.contenido}
                                    abierto={terminoAbierto === index}
                                    onClick={() => manejarApertura(index)}
                                />
                            ))}
                        </div>

                        <div className="Terminos__columna">
                            {terminosDerecha.map((termino, index) => (
                                <TerminoPregunta
                                    key={termino.titulo}
                                    titulo={termino.titulo}
                                    contenido={termino.contenido}
                                    abierto={terminoAbierto === index + terminosIzquierda.length}
                                    onClick={() => manejarApertura(index + terminosIzquierda.length)}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}