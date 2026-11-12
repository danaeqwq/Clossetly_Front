import "./ExpulsarUsuario.css";
import "../../../../../styles/global.css";
import "../../../../../styles/variables.css";
import Modal from "../../../../../componentes/modal/Modal";
import Boton from "../../../../../componentes/Boton/Boton";
import Avatar from "../../../../../assets/userfoto.jpg";
import Expulsar from "../../../../../assets/Expulsar.svg";

export default function ExpulsarUsuario() {
  return (
    <Modal
      titulo="Expulsar usuario"
      descripcion="La expulsión es permanente. El usuario perderá el acceso a Clossetly y no podrá volver a ingresar con esta cuenta."
    >
      <div className="ExpulsarUsuario__contenido">
        <section className="ExpulsarUsuario__perfil" aria-label="Usuario a expulsar">
          <img className="ExpulsarUsuario__avatar" src={Avatar} alt="Foto de perfil de User67" />
        </section>

        <section className="ExpulsarUsuario__confirmacion" aria-labelledby="ExpulsarUsuario__pregunta">
          <h3 id="ExpulsarUsuario__pregunta">¿Estás seguro de que deseas expulsar permanentemente a este a User67 de Clossetly?</h3>
          <p>Al expulsar a este usuario, su cuenta será eliminada permanentemente de Clossetly y no podrá volver a registrarse. Esta acción es irreversible. ¿Deseás continuar?</p>
        </section>

        <div className="ExpulsarUsuario__motivo">
          <strong>Motivo de la expulsión</strong>
          <p>Incumplimiento reiterado de las normas de la comunidad.</p>
        </div>

        <div className="ExpulsarUsuario__acciones">
          <Boton texto="Confirmar expulsión" variante="principal ExpulsarUsuario__confirmar" type="button" />
          <Boton texto="Cancelar" variante="secundario ExpulsarUsuario__cancelar" type="button" />
        </div>
      </div>
    </Modal>
  );
}
