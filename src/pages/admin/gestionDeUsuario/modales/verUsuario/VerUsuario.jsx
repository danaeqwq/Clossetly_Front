import "./VerUsuario.css";
import "../../../../../styles/global.css";
import "../../../../../styles/variables.css";
import Modal from "../../../../../componentes/modal/Modal";
import Boton from "../../../../../componentes/Boton/Boton";
import Avatar from "../../../../../assets/userfoto.jpg";
import Bloqueo from "../../../../../assets/Bloqueo.svg";

export default function VerUsuario() {
  return (
    <Modal
      titulo="Ver usuario"
      descripcion="A continuación la información personal, actividad e historial de denuncias y sanciones de este usuario para supervisar su cuenta y garantizar el cumplimiento de las normas de la comunidad."
    >
      <div className="VerUsuario__contenido">
        <section className="VerUsuario__perfil" aria-label="Información personal">
          <img className="VerUsuario__avatar" src={Avatar} alt="Foto de perfil de User67" />
          <dl className="VerUsuario__datos">
            <div><dt>Nombre de usuario:</dt><dd>User67</dd></div>
            <div><dt>Correo electrónico:</dt><dd>danaealcocer667</dd></div>
            <div><dt>Teléfono:</dt><dd>+54 9101 676767</dd></div>
            <div><dt>Fecha de registro:</dt><dd>14/06/2024</dd></div>
          </dl>
        </section>

        <section className="VerUsuario__historial" aria-labelledby="VerUsuario__tituloHistorial">
          <h3 id="VerUsuario__tituloHistorial">Historial de sanciones</h3>
          <p>Registro de bloqueos, expulsiones y denuncias del usuario.</p>

          <div className="VerUsuario__listaSanciones">
            <article className="VerUsuario__sancion">
              <span className="VerUsuario__iconoBloqueo">
                <img src={Bloqueo} alt="" />
              </span>
              <div className="VerUsuario__detalleSancion">
                <strong>Bloqueo temporal</strong>
                <span>Motivo: Lenguaje inapropiado en los comentarios.</span>
                <span>Duración: 7 días</span>
              </div>
              <time className="VerUsuario__fechaSancion">22/09/2016 - 29/09/2016</time>
              <Boton texto="Finalizado" variante="VerUsuario__finalizado" type="button" />
            </article>

            <article className="VerUsuario__sancion">
              <span className="VerUsuario__iconoBloqueo">
                <img src={Bloqueo} alt="" />
              </span>
              <div className="VerUsuario__detalleSancion">
                <strong>Bloqueo temporal</strong>
                <span>Motivo: Lenguaje inapropiado en los comentarios.</span>
                <span>Duración: 7 días</span>
              </div>
              <time className="VerUsuario__fechaSancion">22/09/2016 - 29/09/2016</time>
              <Boton texto="Finalizado" variante="VerUsuario__finalizado" type="button" />
            </article>
          </div>
        </section>

        <div className="VerUsuario__acciones">
          <Boton texto="Cerrar" variante="principal VerUsuario__cerrar" type="button" />
        </div>
      </div>
    </Modal>
  );
}
